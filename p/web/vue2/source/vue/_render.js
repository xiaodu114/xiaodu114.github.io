Vue.prototype._render = function () {
    var vm = this;
    var _a = vm.$options,
        render = _a.render,
        _parentVnode = _a._parentVnode;
    if (_parentVnode && vm._isMounted) {
        vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
        if (vm._slotsProxy) {
            syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
        }
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var prevInst = currentInstance;
    var prevRenderInst = currentRenderingInstance;
    var vnode;
    try {
        setCurrentInstance(vm);
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if (vm.$options.renderError) {
            try {
                vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
            } catch (e) {
                handleError(e, vm, "renderError");
                vnode = vm._vnode;
            }
        } else {
            vnode = vm._vnode;
        }
    } finally {
        currentRenderingInstance = prevRenderInst;
        setCurrentInstance(prevInst);
    }
    // if the returned array contains only a single node, allow it
    if (isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
        if (isArray(vnode)) {
            warn$2("Multiple root nodes returned from render function. Render function " + "should return a single root node.", vm);
        }
        vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode;
};
