//  编译模板之后得到的渲染函数中有很多 _ 开头的方法，这里应该是对应的方法

function installRenderHelpers(target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
}

//  有下面这两种情况，调用上面的方法
installRenderHelpers(FunctionalRenderContext.prototype);
installRenderHelpers(Vue.prototype);
