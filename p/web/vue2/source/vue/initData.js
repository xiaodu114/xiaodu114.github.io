function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    if (!isPlainObject(data)) {
        data = {};
        warn$2("data functions should return an object:\n" + "https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function", vm);
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        {
            if (methods && hasOwn(methods, key)) {
                warn$2('Method "'.concat(key, '" has already been defined as a data property.'), vm);
            }
        }
        if (props && hasOwn(props, key)) {
            warn$2('The data property "'.concat(key, '" is already declared as a prop. ') + "Use prop default value instead.", vm);
        } else if (!isReserved(key)) {
            proxy(vm, "_data", key);
        }
    }
    // observe data
    var ob = observe(data);
    ob && ob.vmCount++;
}
