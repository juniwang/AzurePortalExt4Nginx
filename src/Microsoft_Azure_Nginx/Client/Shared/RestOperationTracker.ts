"use strict"

// (Mostly) From Redis extension
import Network = require("Shared/Network");

import Notifications = MsPortalFx.Hubs.Notifications;
import ClientNotificaiton = Notifications.ClientNotification;
import NotificationStatus = Notifications.NotificationStatus;
import parseResourceId = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor;

let log = Logger("RestOperationTracker");

export interface NotificationStrings {
    startTitle?: string;
    startDescription?: string;
    inProgressTitle?: string;
    inProgressDescription?: string;
    successTitle?: string;
    successDescription?: string;
    failureTitle: string;
    failureDescription: string;
}

export abstract class MultiShardOperation<TInput, TResponse, TResult> {
    private notification: ClientNotificaiton;
    protected strings: NotificationStrings;
    private responses = ko.observableArray<TResponse>([]);
    private deferred = Q.defer<TResult>();
    readonly header = "[OperationName: {0}]".format(this.nameof());

    constructor(protected id: string, private blade: string, private multiInput: TInput[], private agg: (allOutputs: TResponse[]) => TResult, private baseEndpoint: string) { }

    protected abstract nameof(): string;
    protected abstract getStrings(): NotificationStrings;
    protected abstract makeRequest(input: TInput): NetPromise<TResponse>;

    public run(): MsPortalFx.Base.PromiseV<TResult> {
        this.setUpNotification();
        if (this.notifyOn(NotificationStatus.InProgress))
            this.publishNotification();
        let failed = false;
        let done = 0;
        let started = 0;
        let handleResponse = (response: NetPromise<TResponse>, index?: number) =>
            ko.ignoreDependencies(() =>
                response.then(
                    success => {
                        if (index !== undefined) ++started;
                        let lrInfo = new LongRunningInfo(this.baseEndpoint);
                        LongRunningInfo.updateForResponse(lrInfo, success.jqXHR);
                        if (lrInfo.ongoing()) {
                            if (!failed && started == this.multiInput.length)
                                this.onAccepted(success.content, success.textStatus, success.jqXHR);
                            handleResponse(this.pollTillDone(lrInfo, response));
                        } else {
                            this.responses.push(success.content);
                            if (++done == this.multiInput.length)
                                this.onSuccess(success.content, success.textStatus, success.jqXHR);
                            else if (!failed)
                                this.onProgress(success.content, success.textStatus, success.jqXHR);
                        }
                    },
                    (failure: NetError<Untyped>) => {
                        if (!failed) {
                            failed = true;
                            this.onFailure(failure.jqXHR, failure.textStatus, failure.errorThrown);
                        }
                    }
                ));
        this.multiInput.map(input => this.makeRequest(input)).forEach((response, i) => handleResponse(response, i));
        return this.deferred.promise;
    }

    private setUpNotification() {
        // In case our long running operations don't set the in progress strings
        const strings = this.getStrings();
        strings.inProgressTitle = strings.inProgressTitle || strings.startTitle || "";
        strings.inProgressDescription = strings.inProgressDescription || strings.startDescription || "";
        this.strings = strings;

        const parsed = parseResourceId(this.id);

        this.notification = new ClientNotificaiton({
            status: NotificationStatus.InProgress,
            title: this.strings.startTitle,
            description: this.strings.startDescription && this.strings.startDescription.format({name: parsed.resource}),
            uri: "#resource" + this.id + "/" + this.blade,
            percentComplete: 0,
        });
    }

    protected onAccepted(result: Untyped, textStatus: string, jqXHR: JQueryXHR<Untyped>) {
        this.ifAccepted(jqXHR);
        this.updateNotification(result, textStatus, jqXHR, NotificationStatus.InProgress, this.strings.inProgressTitle, this.strings.inProgressDescription);
    }

    protected onSuccess(result: Untyped, textStatus: string, jqXHR: JQueryXHR<TResponse>) {
        this.ifProgress(jqXHR);
        this.ifSuccessful(jqXHR);
        this.ifDone(jqXHR);
        this.notification.percentComplete = 100;
        log.telemetry(this.header, "Success", jqXHR.getAllResponseHeaders());
        this.updateNotification(result, textStatus, jqXHR, NotificationStatus.Information, this.strings.successTitle, this.strings.successDescription);
        this.deferred.resolve(this.agg(this.responses.peek()));
    }

    protected onFailure(jqXHR: JQueryXHR<Untyped>, textStatus: string, error: Untyped) {
        this.ifFailed(jqXHR);
        this.ifDone(jqXHR);
        this.notification.percentComplete = 100;
        log.telemetry(this.header, "Failure", jqXHR.getAllResponseHeaders());
        this.updateNotification(error, textStatus, jqXHR, NotificationStatus.Error, this.strings.failureTitle, this.strings.failureDescription);
        this.deferred.reject(jqXHR);
    }

    protected onProgress(result: Untyped, textStatus: string, jqXHR: JQueryXHR<TResponse>) {
        this.ifProgress(jqXHR);
        this.notification.percentComplete += (100.0 / this.multiInput.length);
        this.updateNotification(result, textStatus, jqXHR, NotificationStatus.InProgress, this.strings.inProgressTitle, this.strings.inProgressDescription);
    }

    // some hooks, not used right now
    protected ifProgress(jqXHR: JQueryXHR<TResponse>) { }
    protected ifSuccessful(jqXHR: JQueryXHR<TResponse>) { }
    protected ifFailed(jqXHR: JQueryXHR<Untyped>) { }
    protected ifAccepted(jqXHR: JQueryXHR<Untyped>) { }
    protected ifDone(jqXHR: JQueryXHR<Untyped>) { }

    protected pollTillDone(info: LongRunningInfo, lastPromise: NetPromise<TResponse>): NetPromise<TResponse> {
        let startBy = Date.now() + info.waitFor;
        return lastPromise.then(
            response => {
                LongRunningInfo.updateForResponse(info, response.jqXHR);
                return !info.ongoing() ? response
                    : Q.delay(Math.max(1, startBy - Date.now())).then(() => this.pollTillDone(info, Network.getExpectEmptyResponse(info.location)));
            });
    }

    protected notifyOn(status: NotificationStatus, jqXHR?: JQueryXHR<Untyped>) { return true; }

    protected updateNotification(updateResult: Untyped, textStatus: string, jqXHR: JQueryXHR<Untyped>, newStatus: NotificationStatus, newTitle: string, newDescription: string) {
        let shouldPublish = false;
        if (newStatus != undefined) {
            shouldPublish = shouldPublish || (this.notification.status != newStatus);
            this.notification.status = newStatus;
        }
        if (newTitle) this.notification.title = newTitle;
        if (newDescription) {
            let responseJson = jqXHR && jqXHR.responseText && JSON.parse(jqXHR.responseText);
            let error = responseJson && responseJson.error && responseJson.error.message;

            let parsed = parseResourceId(this.id);

            let fmtArgs = {
                name: parsed.resource,
                status: textStatus,
                error: error || updateResult,
            };

            let formattedDescription = newDescription.format(fmtArgs);
            shouldPublish = shouldPublish || (this.notification.description != formattedDescription);
            this.notification.description = formattedDescription;
        }

        let correlationId = jqXHR && jqXHR.getResponseHeader("x-ms-correlation-request-id");
        if (correlationId && !this.notification.correlationIds.some(cid => cid == correlationId)) this.notification.correlationIds.push(correlationId);

        if (shouldPublish && this.notifyOn(this.notification.status, jqXHR)) this.publishNotification();
    }

    private publishNotification() {
        const originalTitle = this.notification.title;
        const originalDescription = this.notification.description;

        if (!originalTitle || !originalDescription) {
            log.telemetry(this.header, "no title/description", this.notification.status, originalTitle, originalDescription);
        }

        this.notification.title = originalTitle || ".";
        this.notification.description = originalDescription || ".";
        this.notification.publish();
        this.notification.title = originalTitle;
        this.notification.description = originalDescription;
    }
}

class LongRunningInfo {
    public location: string;
    public status: number;
    public waitFor: number = 0;

    constructor(private baseEndpoint: string) { }

    get minWaitFor() { return 10000  } // 10 seconds
    get maxWaitFor() { return 600000 } // 10 minutes

    public static updateForResponse(self: LongRunningInfo, jqXHR: JQueryXHR<Untyped>) {
        if (!jqXHR) throw "Expected jqXHR to be defined";
        self.status = jqXHR.status;
        if (self.status == 202) {
            let locationHeader = jqXHR.getResponseHeader("Location");
            // if for some reason we can't get a location header from the request then try reusing the last one..
            self.location = (locationHeader && ((MsPortalFx.startsWith(locationHeader, "/") ? self.baseEndpoint : "") + locationHeader)) || self.location;
            if (!self.location) throw "Need a location header";
        } else {
            self.location = undefined;
        }
        let retryHeader = jqXHR.getResponseHeader("Retry-After");
        let retryAfter = !retryHeader ? (self.waitFor || 0) / 1000 : parseFloat(retryHeader);
        self.waitFor = Math.min(Math.max(self.minWaitFor, Math.ceil(retryAfter * 1000)), self.maxWaitFor); // Retry-After is in seconds, not ms
    }

    public ongoing() {
        return this.status == 202;
    }
}

export abstract class SingleRequestSingleResponse<TInput, TOutput> extends MultiShardOperation<TInput, TOutput, TOutput> {
    constructor(id: string, blade: string, input: TInput, baseEndpoint: string) {
        super(id, blade, [input], x => x.first(), baseEndpoint);
    }
}