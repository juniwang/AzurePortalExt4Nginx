define(["require", "exports", "Shared/Network"], function (require, exports, Network) {
    "use strict";
    var ARMRest;
    (function (ARMRest) {
        var registeredSubscriptionsPerProvider = {};
        function checkNameAvailability(subscriptionId, provider, type, apiVersion, name) {
            var body = {
                name: name,
                type: "{0}/{1}".format(provider, type),
            };
            var bodyString = JSON.stringify(body);
            var deferred = Q.defer();
            var p1 = Network.postResource("/providers/Microsoft.Resources/checkresourcename", "2015-01-01", "application/json", bodyString);
            var p2 = Network.postResource("/subscriptions/{0}/providers/{1}/checkNameAvailability".format(subscriptionId, provider), apiVersion, "application/json", bodyString);
            p1.then(function (success) {
                if (!MsPortalFx.localeCompareIgnoreCase(success.content.status, "allowed")) {
                    p2.then(function (success2) { return (success2.content.nameAvailable ? deferred.resolve : deferred.reject)(success2.content.message); }, function (failure) { return deferred.reject(failure.jqXHR.responseJSON); });
                }
                else {
                    deferred.reject(success.content.error && success.content.error.message);
                }
            }, function (failure) { return deferred.reject(failure.jqXHR.responseJSON); });
            return deferred.promise;
        }
        ARMRest.checkNameAvailability = checkNameAvailability;
        function registerProvider(subscriptionId, providerName) {
            var providerMap = registeredSubscriptionsPerProvider[providerName];
            if (!providerMap)
                providerMap = registeredSubscriptionsPerProvider[providerName] = {};
            var subscriptionPromise = providerMap[subscriptionId];
            if (!subscriptionPromise) {
                var deferred_1 = Q.defer();
                subscriptionPromise = providerMap[subscriptionId] = deferred_1.promise;
                Network.postResource("/subscriptions/{0}/providers/{1}/register".format(subscriptionId, providerName), "2016-09-01").then(function (success) { return deferred_1.resolve(success.content); }, function (failure) {
                    if (failure.jqXHR.status !== 403 && failure.jqXHR.status !== 404) {
                        providerMap[subscriptionId] = undefined;
                    }
                    deferred_1.reject(failure);
                });
            }
            return subscriptionPromise;
        }
        ARMRest.registerProvider = registerProvider;
    })(ARMRest || (ARMRest = {}));
    return ARMRest;
});
