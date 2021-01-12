(self["webpackChunkvue2x_main_project"] = self["webpackChunkvue2x_main_project"] || []).push([["common/js/commons"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-4[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-4[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 *  【介绍】
 *      单级悬浮菜单。
 *      未实现的功能：
 *          1、支持不同的类型（例如分割线）
 *          2、支持图标
 *          3、支持滚动条/移动
 *  【参考】
 *      1、整体参考 http://demo.jb51.net/js/2017/jQuery_sbyjdjcd/
 *      2、本组件中的获取docment的高度和宽度参考$(document).height()和$(document).width()
 *  【注意点】
 *      1、getBoundingClientRect getClientRects clientWidth offsetWidth scrollWidth 这几个概念的不同
 *          1.1、https://www.cnblogs.com/TAO-JL/p/9575430.html
 *          1.2、https://blog.csdn.net/shmjiao/article/details/89018687
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SingleStageFloatMenu",
  props: {
    showItems: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    eventname: {
      type: String,
      "default": "item-click"
    },
    pos: {
      type: Object,
      "default": function _default() {
        return {
          margin: 10,
          pageX: 10,
          pageY: 10
        };
      }
    },
    priority: {
      type: Array,
      "default": function _default() {
        return ["RightBottom", "RightTop", "LeftTop", "LeftBottom"];
      }
    }
  },
  data: function data() {
    return {
      extendStyle: null
    };
  },
  methods: {
    itemClickFn: function itemClickFn(item, event) {
      this.$emit(this.eventname, item, event);
    },
    calculatePos: function calculatePos() {
      var _this = this;

      var winWidth = Math.max(document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"], document.documentElement["clientWidth"]);
      var winHeight = Math.max(document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"], document.documentElement["clientHeight"]);
      var menuWidth = this.$el.offsetWidth,
          securityMenuWidth = menuWidth + 2 * this.pos.margin;
      var menuHeight = this.$el.offsetHeight,
          securityMenuHeight = menuHeight + 2 * this.pos.margin;
      var posInitConfig = {
        RightBottom: {
          area: {
            width: winWidth - this.pos.pageX,
            height: winHeight - this.pos.pageY
          },
          getPos1: function getPos1() {
            return {
              left: _this.pos.pageX + _this.pos.margin + "px",
              top: _this.pos.pageY + _this.pos.margin + "px"
            };
          },
          getPos2: function getPos2() {
            return {
              left: _this.pos.pageX + _this.pos.margin + "px",
              top: winHeight - securityMenuHeight + "px"
            };
          }
        },
        RightTop: {
          area: {
            width: winWidth - this.pos.pageX,
            height: this.pos.pageY
          },
          getPos1: function getPos1() {
            return {
              left: _this.pos.pageX + _this.pos.margin + "px",
              top: _this.pos.pageY - menuHeight - _this.pos.margin + "px"
            };
          },
          getPos2: function getPos2() {
            return {
              left: _this.pos.pageX + _this.pos.margin + "px",
              top: _this.pos.margin + "px"
            };
          }
        },
        LeftTop: {
          area: {
            width: this.pos.pageX,
            height: this.pos.pageY
          },
          getPos1: function getPos1() {
            return {
              left: _this.pos.pageX - menuWidth - _this.pos.margin + "px",
              top: _this.pos.pageY - menuHeight - _this.pos.margin + "px"
            };
          },
          getPos2: function getPos2() {
            return {
              left: _this.pos.pageX - menuWidth - _this.pos.margin + "px",
              top: _this.pos.margin + "px"
            };
          }
        },
        LeftBottom: {
          area: {
            width: this.pos.pageX,
            height: winHeight - this.pos.pageY
          },
          getPos1: function getPos1() {
            return {
              left: _this.pos.pageX - menuWidth - _this.pos.margin + "px",
              top: _this.pos.pageY + _this.pos.margin + "px"
            };
          },
          getPos2: function getPos2() {
            return {
              left: _this.pos.pageX - menuWidth - _this.pos.margin + "px",
              top: winHeight - securityMenuHeight + "px"
            };
          }
        }
      };
      var retPosObj = null; //

      for (var index = 0; index < this.priority.length; index++) {
        var tempPosition = this.priority[index];

        if (posInitConfig[tempPosition] && posInitConfig[tempPosition].area.width > securityMenuWidth && posInitConfig[tempPosition].area.height > securityMenuHeight) {
          retPosObj = posInitConfig[tempPosition].getPos1();
          break;
        }
      }

      if (retPosObj === null) {
        if (winHeight > securityMenuHeight) {
          for (var _index = 0; _index < this.priority.length; _index++) {
            var _tempPosition = this.priority[_index];

            if (posInitConfig[_tempPosition] && 2 * posInitConfig[_tempPosition].area.height > winHeight) {
              retPosObj = posInitConfig[_tempPosition].getPos2();
              break;
            }
          }
        }
      }

      return retPosObj;
    }
  },
  mounted: function mounted() {
    this.extendStyle = this.calculatePos();
  }
});

/***/ }),

/***/ "./src/component/common/float-menu/single-stage/index.js":
/*!***************************************************************!*\
  !*** ./src/component/common/float-menu/single-stage/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _src_main_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/main.vue */ "./src/component/common/float-menu/single-stage/src/main.vue");
// 参考element-ui的使用方式


_src_main_vue__WEBPACK_IMPORTED_MODULE_0__.default.install = function (Vue) {
  Vue.component(_src_main_vue__WEBPACK_IMPORTED_MODULE_0__.default.name, _src_main_vue__WEBPACK_IMPORTED_MODULE_0__.default);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_main_vue__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/component/common/float-menu/single-stage/src/main.vue":
/*!*******************************************************************!*\
  !*** ./src/component/common/float-menu/single-stage/src/main.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.vue?vue&type=template&id=357a7404& */ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404&");
/* harmony import */ var _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.vue?vue&type=script&lang=js& */ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js&");
/* harmony import */ var _main_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.vue?vue&type=style&index=0&lang=less& */ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__.default)(
  _main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__.render,
  _main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/component/common/float-menu/single-stage/src/main.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_4_0_rules_0_use_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-4[0].rules[0].use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./main.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-4[0].rules[0].use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_4_0_rules_0_use_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less&":
/*!*****************************************************************************************************!*\
  !*** ./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../../node_modules/css-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/less-loader/dist/cjs.js!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./main.vue?vue&type=style&index=0&lang=less& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=style&index=0&lang=less&");


/***/ }),

/***/ "./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404&":
/*!**************************************************************************************************!*\
  !*** ./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__.render,
/* harmony export */   "staticRenderFns": () => /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_main_vue_vue_type_template_id_357a7404___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./main.vue?vue&type=template&id=357a7404& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/component/common/float-menu/single-stage/src/main.vue?vue&type=template&id=357a7404& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => /* binding */ render,
/* harmony export */   "staticRenderFns": () => /* binding */ staticRenderFns
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "single-stage-float-menu", style: _vm.extendStyle },
    _vm._l(_vm.showItems, function(item, index) {
      return _c("li", { key: index }, [
        item.type === "divider"
          ? _c("div", [_vm._v("我是分割线")])
          : item.type === "item"
          ? _c(
              "div",
              {
                on: {
                  click: function($event) {
                    return _vm.itemClickFn(item, $event)
                  }
                }
              },
              [_vm._v(_vm._s(item.text))]
            )
          : _vm._e()
      ])
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ normalizeComponent
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

}]);
//# sourceMappingURL=commons.js.map