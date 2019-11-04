/**
 * Create a mock promise
 *
 * @param value
 * @param error
 * @returns {Promise}
 */
function createPromise(value, error) {
    return {
        then: function (callback) {
            if (value !== null && value !== undefined) {
                var result = callback(value);

                if (result && result.then && typeof result.then === 'function') {
                    return result;
                }

                if (result !== null && result !== undefined) {
                    value = result;
                }
            }

            return this;
        },
        catch: function (callback) {
            if (error !== null && error !== undefined) {
                var result = callback(error);

                if (result && result.then && typeof result.then === 'function') {
                    return result;
                }

                if (result) {
                    value = result;
                    error = null;
                }
            }

            return this;
        },
        finally: function (callback) {
            callback();

            return this;
        }
    };
}
/**
 * Create a mock promise that is instantly resolved
 *
 * @param value
 * @returns {Promise}
 */
function resolvedPromise(value) {
    return createPromise(value);
}

/**
 * Create a mock promise that is instantly rejected
 *
 * @param error
 * @returns {Promise}
 */
function rejectedPromise(error) {
    return createPromise(null, error);
}

/**
 * Execute same test function multiple times with different data
 */
function using(name, values, func) {
    for (var i = 0, count = values.length; i < count; i++) {
        if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
            values[i] = [values[i]];
        }
        values[i].push(i); // add current index to args (so it can be used in error messages)
        func.apply(this, values[i]);
        //jasmine.getEnv().currentSpec.description += ' (with "' + name + '" using ' + values[i].join(', ') + ')';
    }
}

function componentInject(moduleName, providers) {
    var moduleInstace = angular.module(moduleName, []);
    angular.forEach(providers, function(value, name) {
        moduleInstace.provider(name, function() {
            this.$get = function() {
                return value;
            };
        })
    });

    beforeEach(module(moduleName));
}
