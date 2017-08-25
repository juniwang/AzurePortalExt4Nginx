"use strict"

import * as Network from "Shared/Network";

module ARMRest {
    const registeredSubscriptionsPerProvider: StringMap<StringMap<Promise>> = {};

    export function checkNameAvailability(subscriptionId: string, provider: string, type: string, apiVersion: string, name: string) {
        const body: DataModels.Azure.NameCheck = {
            name: name,
            type: "{0}/{1}".format(provider, type),
        };
        const bodyString = JSON.stringify(body);

        const deferred = Q.defer<string>();

        const p1 = Network.postResource<{ status: string, error?: { message: string } }>("/providers/Microsoft.Resources/checkresourcename", "2015-01-01", "application/json", bodyString);
        const p2 = Network.postResource<{ nameAvailable: boolean, message?: string }>("/subscriptions/{0}/providers/{1}/checkNameAvailability".format(subscriptionId, provider), apiVersion, "application/json", bodyString);

        p1.then(
            success => {
                if (!MsPortalFx.localeCompareIgnoreCase(success.content.status, "allowed")) {
                    p2.then(
                        success2 => (success2.content.nameAvailable ? deferred.resolve : deferred.reject)(success2.content.message),
                        (failure: NetError<Untyped>) => deferred.reject(failure.jqXHR.responseJSON));
                } else {
                    deferred.reject(success.content.error && success.content.error.message)
                }
            },
            (failure: NetError<Untyped>) => deferred.reject(failure.jqXHR.responseJSON));

        return deferred.promise;
    }

    export function registerProvider(subscriptionId: string, providerName: string) {
        let providerMap = registeredSubscriptionsPerProvider[providerName];

        if (!providerMap) providerMap = registeredSubscriptionsPerProvider[providerName] = {};

        let subscriptionPromise = providerMap[subscriptionId];

        if (!subscriptionPromise) {
            let deferred = Q.defer();
            subscriptionPromise = providerMap[subscriptionId] = deferred.promise;

            Network.postResource("/subscriptions/{0}/providers/{1}/register".format(subscriptionId, providerName), "2016-09-01").then(
                success => deferred.resolve(success.content),
                (failure: NetError<Untyped>) => {
                    if (failure.jqXHR.status !== 403 && failure.jqXHR.status !== 404) {
                        providerMap[subscriptionId] = undefined;
                    }
                    deferred.reject(failure);
                });
        }

        return subscriptionPromise;
    }
}

export = ARMRest;