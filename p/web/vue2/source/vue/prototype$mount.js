Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating);
};

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (el, hydrating) {
    el = el && query(el);
    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        warn$2("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
        return this;
    }
    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
        var template = options.template;
        if (template) {
            if (typeof template === "string") {
                if (template.charAt(0) === "#") {
                    template = idToTemplate(template);
                    /* istanbul ignore if */
                    if (!template) {
                        warn$2("Template element not found or is empty: ".concat(options.template), this);
                    }
                }
            } else if (template.nodeType) {
                template = template.innerHTML;
            } else {
                {
                    warn$2("invalid template option:" + template, this);
                }
                return this;
            }
        } else if (el) {
            // @ts-expect-error
            template = getOuterHTML(el);
        }
        if (template) {
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark("compile");
            }
            var _a = compileToFunctions(
                    template,
                    {
                        outputSourceRange: true,
                        shouldDecodeNewlines: shouldDecodeNewlines,
                        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                        delimiters: options.delimiters,
                        comments: options.comments
                    },
                    this
                ),
                render = _a.render,
                staticRenderFns = _a.staticRenderFns;
            options.render = render;
            options.staticRenderFns = staticRenderFns;
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark("compile end");
                measure("vue ".concat(this._name, " compile"), "compile", "compile end");
            }
        }
    }
    return mount.call(this, el, hydrating);
};
