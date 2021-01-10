(self["webpackChunkwebpacklearning"] = self["webpackChunkwebpacklearning"] || []).push([["common/js/commons"],{

/***/ "./src/common/js/utils.js":
/*!********************************!*\
  !*** ./src/common/js/utils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataType": () => /* binding */ getDataType,
/* harmony export */   "getGUID": () => /* binding */ getGUID,
/* harmony export */   "shuffle": () => /* binding */ shuffle,
/* harmony export */   "arrayExtend_ChangePosByIndex": () => /* binding */ arrayExtend_ChangePosByIndex,
/* harmony export */   "dateExtend_Format": () => /* binding */ dateExtend_Format
/* harmony export */ });
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/for-each */ "./node_modules/@babel/runtime-corejs3/core-js/instance/for-each.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs3/core-js/array/is-array.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_match_all__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/match-all */ "./node_modules/@babel/runtime-corejs3/core-js/instance/match-all.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_match_all__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_match_all__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs3/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_pad_end__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/pad-end */ "./node_modules/@babel/runtime-corejs3/core-js/instance/pad-end.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_pad_end__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_pad_end__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/pad-start */ "./node_modules/@babel/runtime-corejs3/core-js/instance/pad-start.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_splice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/splice */ "./node_modules/@babel/runtime-corejs3/core-js/instance/splice.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_splice__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_splice__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/instance/sort */ "./node_modules/@babel/runtime-corejs3/core-js/instance/sort.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_instance_sort__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_instance_sort__WEBPACK_IMPORTED_MODULE_7__);









/*! utils.js  业务无关通用方法 */

/**
 * 获取数据的类型
 * 例子：
 * getDataType(null);=>"null"
 * getDataType(undefined);=>"undefined"
 * getDataType({});=>"object"
 * getDataType(function(){});=>"function"
 * @param {any} obj 目标数据
 * @returns {string} 返回目标数据类型的小写形式
 */
var getDataType = function getDataType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object\s(\w+)\]$/, "$1").toLowerCase();
};
/**
 * 获取一个GUID
 * 例子：getGUID();=>'AEFC9ABC-1396-494B-AB96-C35CA3C9F92F'
 * @returns {string} 返回一个GUID
 */

var getGUID = function getGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16).toUpperCase();
  });
};
/**
 * 洗牌算法（数组内元素的顺序随机打乱）
 * 收集来源：http://caibaojian.com/work-js.html
 * http://caibaojian.com/11-js-codes.html
 * 例子：const arr1=[0,1,2,3,4,5]; shuffle(arr1); 结果为：[4, 0, 1, 5, 2, 3]
 * @param {Array} arr   目标数组
 */

var shuffle = function shuffle(arr) {
  _babel_runtime_corejs3_core_js_instance_sort__WEBPACK_IMPORTED_MODULE_7___default()(arr).call(arr, function () {
    return Math.random() - 0.5;
  });
};
/**
 * 根据数组索引交换位置
 * 例子：const arr1=[0,1,2,3,4,5]; arrayExtend_ChangePosByIndex(arr1,1,4); 结果为：[0, 2, 3, 4, 1, 5]
 * @param {Array} arr    目标数组
 * @param {Number} from  原始位置
 * @param {Number} to    目标位置
 */

var arrayExtend_ChangePosByIndex = function arrayExtend_ChangePosByIndex(arr, from, to) {
  _babel_runtime_corejs3_core_js_instance_splice__WEBPACK_IMPORTED_MODULE_6___default()(arr).call(arr, to, 0, _babel_runtime_corejs3_core_js_instance_splice__WEBPACK_IMPORTED_MODULE_6___default()(arr).call(arr, from, 1)[0]);
};
/**
 * 格式化日期
 * 例子： dateExtend_Format(new Date(),"yyyy-MM-dd hh:mm:ss SSS")
 * @param {Date} targetDate 
 * @param {String} format 
 * @returns {string} 返回格式化之后字符串
 */

var dateExtend_Format = function dateExtend_Format(targetDate, format) {
  if (getDataType(targetDate) !== "date") throw new Error("参数异常：targetDate必须是Date类型");
  if (!(getDataType(format) === "string" && format.length)) throw new Error("参数异常：format必须是String类型并且不能为空");
  var year0 = targetDate.getFullYear(),
      momth0 = targetDate.getMonth() + 1,
      date0 = targetDate.getDate(),
      day0 = targetDate.getDay(),
      hour0 = targetDate.getHours(),
      minute0 = targetDate.getMinutes(),
      second0 = targetDate.getSeconds(),
      millisecond0 = targetDate.getMilliseconds(),
      quarter0 = Math.floor((momth0 + 2) / 3),
      numToCnObj = {
    0: "日",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    11: "十一",
    12: "十二"
  },
      week0 = numToCnObj[day0];

  function handleMillisecond(matchLength) {
    var _context;

    var retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(_context = millisecond0.toString()).call(_context, 3, "0");

    if (matchLength > 3) {
      retStr = _babel_runtime_corejs3_core_js_instance_pad_end__WEBPACK_IMPORTED_MODULE_4___default()(retStr).call(retStr, matchLength, "0");
    } else {
      retStr = retStr.substr(0, matchLength);
    }

    return retStr;
  }

  var o = {
    "y+": function y(matchLength) {
      // y和yyy都返回1999
      var retStr = year0.toString();

      if (matchLength === 2) {
        retStr = retStr.substr(-2, 2);
      } else if (matchLength > 4) {
        retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, matchLength, "0");
      }

      return retStr;
    },
    "M+": function M(matchLength) {
      var retStr = momth0.toString();

      switch (matchLength) {
        case 1:
          {
            break;
          }

        case 2:
          {
            retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
            break;
          }

        case 3:
          {
            retStr = retStr + "月";
            break;
          }

        default:
          {
            retStr = numToCnObj[retStr] + "月";
            break;
          }
      }

      return retStr;
    },
    "d+": function d(matchLength) {
      var retStr = date0.toString();

      switch (matchLength) {
        case 1:
          {
            break;
          }

        case 2:
          {
            retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
            break;
          }

        case 3:
          {
            retStr = "周" + week0;
            break;
          }

        default:
          {
            retStr = "星期" + week0;
            break;
          }
      }

      return retStr;
    },
    "h+": function h(matchLength) {
      var retStr = hour0 > 12 ? (hour0 - 12).toString() : hour0.toString();

      if (matchLength > 1) {
        retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
      }

      return retStr;
    },
    "H+": function H(matchLength) {
      var retStr = hour0.toString();

      if (matchLength > 1) {
        retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
      }

      return retStr;
    },
    "m+": function m(matchLength) {
      var retStr = minute0.toString();

      if (matchLength > 1) {
        retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
      }

      return retStr;
    },
    "s+": function s(matchLength) {
      var retStr = second0.toString();

      if (matchLength > 1) {
        retStr = _babel_runtime_corejs3_core_js_instance_pad_start__WEBPACK_IMPORTED_MODULE_5___default()(retStr).call(retStr, 2, "0");
      }

      return retStr;
    },
    "S+": handleMillisecond,
    "f+": handleMillisecond,
    "t+": function t(matchLength) {
      var retStr = hour0 > 12 ? "下午" : "上午";

      if (matchLength === 1) {
        retStr = retStr.substr(0, matchLength);
      }

      return retStr;
    },
    "q+": function q(matchLength) {
      return "\u7B2C".concat(quarter0.toString(), "\u5B63\u5EA6");
    },
    "w+": function w(matchLength) {
      return "\u661F\u671F".concat(week0.toString());
    }
  };

  var _loop = function _loop(k) {
    var arrayMatch = (0,_babel_runtime_corejs3_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__.default)(_babel_runtime_corejs3_core_js_instance_match_all__WEBPACK_IMPORTED_MODULE_2___default()(format).call(format, new RegExp("(" + k + ")", "g")));

    if (_babel_runtime_corejs3_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_1___default()(arrayMatch) && arrayMatch.length) {
      _babel_runtime_corejs3_core_js_instance_for_each__WEBPACK_IMPORTED_MODULE_0___default()(arrayMatch).call(arrayMatch, function (item) {
        format = format.replace(item[0], o[k](item[0].length));
      });
    }
  };

  for (var k in o) {
    _loop(k);
  }

  return format;
};

/***/ }),

/***/ "./src/common/css/common.less":
/*!************************************!*\
  !*** ./src/common/css/common.less ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=commons.js.map