var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Shared/Network"], function (require, exports, Network) {
    "use strict";
    var Notifications = MsPortalFx.Hubs.Notifications;
    var ClientNotificaiton = Notifications.ClientNotification;
    var NotificationStatus = Notifications.NotificationStatus;
    var parseResourceId = MsPortalFx.ViewModels.Services.ResourceTypes.parseResourceDescriptor;
    var log = Logger("RestOperationTracker");
    var MultiShardOperation = (function () {
        function MultiShardOperation(id, blade, multiInput, agg, baseEndpoint) {
            this.id = id;
            this.blade = blade;
            this.multiInput = multiInput;
            this.agg = agg;
            this.baseEndpoint = baseEndpoint;
            this.responses = ko.observableArray([]);
            this.deferred = Q.defer();
            this.header = "[OperationName: {0}]".format(this.nameof());
        }
        MultiShardOperation.prototype.run = function () {
            var _this = this;
            this.setUpNotification();
            if (this.notifyOn(NotificationStatus.InProgress))
                this.publishNotification();
            var failed = false;
            var done = 0;
            var started = 0;
            var handleResponse = function (response, index) {
                return ko.ignoreDependencies(function () {
                    return response.then(function (success) {
                        if (index !== undefined)
                            ++started;
                        var lrInfo = new LongRunningInfo(_this.baseEndpoint);
                        LongRunningInfo.updateForResponse(lrInfo, success.jqXHR);
                        if (lrInfo.ongoing()) {
                            if (!failed && started == _this.multiInput.length)
                                _this.onAccepted(success.content, success.textStatus, success.jqXHR);
                            handleResponse(_this.pollTillDone(lrInfo, response));
                        }
                        else {
                            _this.responses.push(success.content);
                            if (++done == _this.multiInput.length)
                                _this.onSuccess(success.content, success.textStatus, success.jqXHR);
                            else if (!failed)
                                _this.onProgress(success.content, success.textStatus, success.jqXHR);
                        }
                    }, function (failure) {
                        if (!failed) {
                            failed = true;
                            _this.onFailure(failure.jqXHR, failure.textStatus, failure.errorThrown);
                        }
                    });
                });
            };
            this.multiInput.map(function (input) { return _this.makeRequest(input); }).forEach(function (response, i) { return handleResponse(response, i); });
            return this.deferred.promise;
        };
        MultiShardOperation.prototype.setUpNotification = function () {
            var strings = this.getStrings();
            strings.inProgressTitle = strings.inProgressTitle || strings.startTitle || "";
            strings.inProgressDescription = strings.inProgressDescription || strings.startDescription || "";
            this.strings = strings;
            var parsed = parseResourceId(this.id);
            this.notification = new ClientNotificaiton({
                status: NotificationStatus.InProgress,
                title: this.strings.startTitle,
                description: this.strings.startDescription && this.strings.startDescription.format({ name: parsed.resource }),
                uri: "#resource" + this.id + "/" + this.blade,
                percentComplete: 0,
            });
        };
        MultiShardOperation.prototype.onAccepted = function (result, textStatus, jqXHR) {
            this.ifAccepted(jqXHR);
            this.updateNotification(result, textStatus, jqXHR, NotificationStatus.InProgress, this.strings.inProgressTitle, this.strings.inProgressDescription);
        };
        MultiShardOperation.prototype.onSuccess = function (result, textStatus, jqXHR) {
            this.ifProgress(jqXHR);
            this.ifSuccessful(jqXHR);
            this.ifDone(jqXHR);
            this.notification.percentComplete = 100;
            log.telemetry(this.header, "Success", jqXHR.getAllResponseHeaders());
            this.updateNotification(result, textStatus, jqXHR, NotificationStatus.Information, this.strings.successTitle, this.strings.successDescription);
            this.deferred.resolve(this.agg(this.responses.peek()));
        };
        MultiShardOperation.prototype.onFailure = function (jqXHR, textStatus, error) {
            this.ifFailed(jqXHR);
            this.ifDone(jqXHR);
            this.notification.percentComplete = 100;
            log.telemetry(this.header, "Failure", jqXHR.getAllResponseHeaders());
            this.updateNotification(error, textStatus, jqXHR, NotificationStatus.Error, this.strings.failureTitle, this.strings.failureDescription);
            this.deferred.reject(jqXHR);
        };
        MultiShardOperation.prototype.onProgress = function (result, textStatus, jqXHR) {
            this.ifProgress(jqXHR);
            this.notification.percentComplete += (100.0 / this.multiInput.length);
            this.updateNotification(result, textStatus, jqXHR, NotificationStatus.InProgress, this.strings.inProgressTitle, this.strings.inProgressDescription);
        };
        MultiShardOperation.prototype.ifProgress = function (jqXHR) { };
        MultiShardOperation.prototype.ifSuccessful = function (jqXHR) { };
        MultiShardOperation.prototype.ifFailed = function (jqXHR) { };
        MultiShardOperation.prototype.ifAccepted = function (jqXHR) { };
        MultiShardOperation.prototype.ifDone = function (jqXHR) { };
        MultiShardOperation.prototype.pollTillDone = function (info, lastPromise) {
            var _this = this;
            var startBy = Date.now() + info.waitFor;
            return lastPromise.then(function (response) {
                LongRunningInfo.updateForResponse(info, response.jqXHR);
                return !info.ongoing() ? response
                    : Q.delay(Math.max(1, startBy - Date.now())).then(function () { return _this.pollTillDone(info, Network.getExpectEmptyResponse(info.location)); });
            });
        };
        MultiShardOperation.prototype.notifyOn = function (status, jqXHR) { return true; };
        MultiShardOperation.prototype.updateNotification = function (updateResult, textStatus, jqXHR, newStatus, newTitle, newDescription) {
            var shouldPublish = false;
            if (newStatus != undefined) {
                shouldPublish = shouldPublish || (this.notification.status != newStatus);
                this.notification.status = newStatus;
            }
            if (newTitle)
                this.notification.title = newTitle;
            if (newDescription) {
                var responseJson = jqXHR && jqXHR.responseText && JSON.parse(jqXHR.responseText);
                var error = responseJson && responseJson.error && responseJson.error.message;
                var parsed = parseResourceId(this.id);
                var fmtArgs = {
                    name: parsed.resource,
                    status: textStatus,
                    error: error || updateResult,
                };
                var formattedDescription = newDescription.format(fmtArgs);
                shouldPublish = shouldPublish || (this.notification.description != formattedDescription);
                this.notification.description = formattedDescription;
            }
            var correlationId = jqXHR && jqXHR.getResponseHeader("x-ms-correlation-request-id");
            if (correlationId && !this.notification.correlationIds.some(function (cid) { return cid == correlationId; }))
                this.notification.correlationIds.push(correlationId);
            if (shouldPublish && this.notifyOn(this.notification.status, jqXHR))
                this.publishNotification();
        };
        MultiShardOperation.prototype.publishNotification = function () {
            var originalTitle = this.notification.title;
            var originalDescription = this.notification.description;
            if (!originalTitle || !originalDescription) {
                log.telemetry(this.header, "no title/description", this.notification.status, originalTitle, originalDescription);
            }
            this.notification.title = originalTitle || ".";
            this.notification.description = originalDescription || ".";
            this.notification.publish();
            this.notification.title = originalTitle;
            this.notification.description = originalDescription;
        };
        return MultiShardOperation;
    }());
    exports.MultiShardOperation = MultiShardOperation;
    var LongRunningInfo = (function () {
        function LongRunningInfo(baseEndpoint) {
            this.baseEndpoint = baseEndpoint;
            this.waitFor = 0;
        }
        Object.defineProperty(LongRunningInfo.prototype, "minWaitFor", {
            get: function () { return 10000; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongRunningInfo.prototype, "maxWaitFor", {
            get: function () { return 600000; },
            enumerable: true,
            configurable: true
        });
        LongRunningInfo.updateForResponse = function (self, jqXHR) {
            if (!jqXHR)
                throw "Expected jqXHR to be defined";
            self.status = jqXHR.status;
            if (self.status == 202) {
                var locationHeader = jqXHR.getResponseHeader("Location");
                self.location = (locationHeader && ((MsPortalFx.startsWith(locationHeader, "/") ? self.baseEndpoint : "") + locationHeader)) || self.location;
                if (!self.location)
                    throw "Need a location header";
            }
            else {
                self.location = undefined;
            }
            var retryHeader = jqXHR.getResponseHeader("Retry-After");
            var retryAfter = !retryHeader ? (self.waitFor || 0) / 1000 : parseFloat(retryHeader);
            self.waitFor = Math.min(Math.max(self.minWaitFor, Math.ceil(retryAfter * 1000)), self.maxWaitFor);
        };
        LongRunningInfo.prototype.ongoing = function () {
            return this.status == 202;
        };
        return LongRunningInfo;
    }());
    var SingleRequestSingleResponse = (function (_super) {
        __extends(SingleRequestSingleResponse, _super);
        function SingleRequestSingleResponse(id, blade, input, baseEndpoint) {
            return _super.call(this, id, blade, [input], function (x) { return x.first(); }, baseEndpoint) || this;
        }
        return SingleRequestSingleResponse;
    }(MultiShardOperation));
    exports.SingleRequestSingleResponse = SingleRequestSingleResponse;
});
