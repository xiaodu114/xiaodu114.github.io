function mountComponent(vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
        // @ts-expect-error invalid type
        vm.$options.render = createEmptyVNode;
        {
            /* istanbul ignore if */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== "#") || vm.$options.el || el) {
                warn$2("You are using the runtime-only build of Vue where the template " + "compiler is not available. Either pre-compile the templates into " + "render functions, or use the compiler-included build.", vm);
            } else {
                warn$2("Failed to mount component: template or render function not defined.", vm);
            }
        }
    }
    callHook$1(vm, "beforeMount");
    var updateComponent;
    /* istanbul ignore if */
    if (config.performance && mark) {
        updateComponent = function () {
            var name = vm._name;
            var id = vm._uid;
            var startTag = "vue-perf-start:".concat(id);
            var endTag = "vue-perf-end:".concat(id);
            mark(startTag);
            var vnode = vm._render();
            mark(endTag);
            measure("vue ".concat(name, " render"), startTag, endTag);
            mark(startTag);
            vm._update(vnode, hydrating);
            mark(endTag);
            measure("vue ".concat(name, " patch"), startTag, endTag);
        };
    } else {
        updateComponent = function () {
            vm._update(vm._render(), hydrating);
        };
    }
    var watcherOptions = {
        before: function () {
            if (vm._isMounted && !vm._isDestroyed) {
                callHook$1(vm, "beforeUpdate");
            }
        }
    };
    {
        watcherOptions.onTrack = function (e) {
            return callHook$1(vm, "renderTracked", [e]);
        };
        watcherOptions.onTrigger = function (e) {
            return callHook$1(vm, "renderTriggered", [e]);
        };
    }
    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
    hydrating = false;
    // flush buffer for flush: "pre" watchers queued in setup()
    var preWatchers = vm._preWatchers;
    if (preWatchers) {
        for (var i = 0; i < preWatchers.length; i++) {
            preWatchers[i].run();
        }
    }
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
        vm._isMounted = true;
        callHook$1(vm, "mounted");
    }
    return vm;
}
