var initProxy;
{
    var allowedGlobals_1 = makeMap(
        "Infinity,undefined,NaN,isFinite,isNaN," + "parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent," + "Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt," + "require" // for Webpack/Browserify
    );
    var warnNonPresent_1 = function (target, key) {
        warn$2('Property or method "'.concat(key, '" is not defined on the instance but ') + "referenced during render. Make sure that this property is reactive, " + "either in the data option, or for class-based components, by " + "initializing the property. " + "See: https://v2.vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.", target);
    };
    var warnReservedPrefix_1 = function (target, key) {
        warn$2('Property "'.concat(key, '" must be accessed with "$data.').concat(key, '" because ') + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + "prevent conflicts with Vue internals. " + "See: https://v2.vuejs.org/v2/api/#data", target);
    };
    var hasProxy_1 = typeof Proxy !== "undefined" && isNative(Proxy);
    if (hasProxy_1) {
        var isBuiltInModifier_1 = makeMap("stop,prevent,self,ctrl,shift,alt,meta,exact");
        config.keyCodes = new Proxy(config.keyCodes, {
            set: function (target, key, value) {
                if (isBuiltInModifier_1(key)) {
                    warn$2("Avoid overwriting built-in modifier in config.keyCodes: .".concat(key));
                    return false;
                } else {
                    target[key] = value;
                    return true;
                }
            }
        });
    }
    var hasHandler_1 = {
        has: function (target, key) {
            var has = key in target;
            var isAllowed = allowedGlobals_1(key) || (typeof key === "string" && key.charAt(0) === "_" && !(key in target.$data));
            if (!has && !isAllowed) {
                if (key in target.$data) warnReservedPrefix_1(target, key);
                else warnNonPresent_1(target, key);
            }
            return has || !isAllowed;
        }
    };
    var getHandler_1 = {
        get: function (target, key) {
            if (typeof key === "string" && !(key in target)) {
                if (key in target.$data) warnReservedPrefix_1(target, key);
                else warnNonPresent_1(target, key);
            }
            return target[key];
        }
    };
    initProxy = function initProxy(vm) {
        if (hasProxy_1) {
            // determine which proxy handler to use
            var options = vm.$options;
            var handlers = options.render && options.render._withStripped ? getHandler_1 : hasHandler_1;
            vm._renderProxy = new Proxy(vm, handlers);
        } else {
            vm._renderProxy = vm;
        }
    };
}
