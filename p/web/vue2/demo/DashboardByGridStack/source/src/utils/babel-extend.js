import {
    getDataType,
    getGUID
} from './common.js';

/**
 * 转换处理字符串形式的ES6 Module 
 *      该方法只处理默认导出 
 * @param {String} strJSCode 
 * @param {Object} transformOption 
 * @returns {any} 
 */
export const strES6DefaultModuleInterpreter = function (strJSCode, transformOption) {
    if (!(Babel && getDataType(Babel.transform) === "function")) {
        // https://babeljs.io/docs/en/next/babel-standalone.html
        // https://unpkg.com/@babel/standalone/babel.min.js
        throw new Error("该方法依赖，@babel/standalone");
    }
    try {
        var output = Babel.transform(strJSCode, Object.assign({}, {
            presets: ["es2015"]
        }, transformOption)).code;
        // https://github.com/amio/require-cjs-string
        var _fn = new Function("module", "exports", output);
        var _module = {
            exports: {}
        };
        _fn(_module, _module.exports);
        return _module.exports.default;
    } catch (error) {
        alert("异常：" + JSON.stringify(error));
    }
}