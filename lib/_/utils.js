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
export const getDataType = function (obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[object\s(\w+)\]$/, "$1")
        .toLowerCase();
}

/**
 * 获取一个GUID
 * 例子：getGUID();=>'AEFC9ABC-1396-494B-AB96-C35CA3C9F92F'
 * @returns {string} 返回一个GUID
 */
export const getGUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    });
}

/**
 * 获取函数形参的名称
 * 收集来源：angular.js(1.8.2) annotate函数
 * 例子：
 * function fn1( a1 , b2 , p3 ){}
 * getFunctionArgNames(fn1); => ['a1', 'b2', 'p3']
 * @param {Function} fn 目标函数
 * @returns {Array} 返回一个字符串数组
 */
export const getFunctionArgNames = function (fn) {
    const FN_ARG_SPLIT = /,/,
        FN_ARG = /^\s*(_?)(\S+?)\1\s*$/,
        FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m,
        STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    let fnText = fn.toString().replace(STRIP_COMMENTS, '');
    let argDecl = fnText.match(FN_ARGS);
    let retArgNames = [];
    [].forEach.call(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
        arg.replace(FN_ARG, function (all, underscore, name) {
            retArgNames.push(name);
        });
    });
    return retArgNames;
}

/**
 * 洗牌算法（数组内元素的顺序随机打乱）
 * 收集来源：http://caibaojian.com/work-js.html
 * http://caibaojian.com/11-js-codes.html
 * 例子：const arr1=[0,1,2,3,4,5]; shuffle(arr1); 结果为：[4, 0, 1, 5, 2, 3]
 * @param {Array} arr   目标数组
 */
export const shuffle = function (arr) {
    arr.sort(() => Math.random() - 0.5);
}

/**
 * 根据数组索引交换位置
 * 例子：const arr1=[0,1,2,3,4,5]; arrayExtend_ChangePosByIndex(arr1,1,4); 结果为：[0, 2, 3, 4, 1, 5]
 * @param {Array} arr    目标数组
 * @param {Number} from  原始位置
 * @param {Number} to    目标位置
 */
export const arrayExtend_ChangePosByIndex = function (arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
}

/**
 * 格式化日期
 * 例子： dateExtend_Format(new Date(),"yyyy-MM-dd hh:mm:ss SSS")
 * @param {Date} targetDate 
 * @param {String} format 
 * @returns {string} 返回格式化之后字符串
 */
export const dateExtend_Format = function (targetDate, format) {
    if (getDataType(targetDate) !== "date")
        throw new Error("参数异常：targetDate必须是Date类型");
    if (!(getDataType(format) === "string" && format.length))
        throw new Error("参数异常：format必须是String类型并且不能为空");
    let year0 = targetDate.getFullYear(),
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
            12: "十二",
        },
        week0 = numToCnObj[day0];

    function handleMillisecond(matchLength) {
        let retStr = millisecond0.toString().padStart(3, "0");
        if (matchLength > 3) {
            retStr = retStr.padEnd(matchLength, "0");
        } else {
            retStr = retStr.substr(0, matchLength);
        }
        return retStr;
    }
    let o = {
        "y+": function (matchLength) {
            // y和yyy都返回1999
            let retStr = year0.toString();
            if (matchLength === 2) {
                retStr = retStr.substr(-2, 2);
            } else if (matchLength > 4) {
                retStr = retStr.padStart(matchLength, "0");
            }
            return retStr;
        },
        "M+": function (matchLength) {
            let retStr = momth0.toString();
            switch (matchLength) {
                case 1: {
                    break;
                }
                case 2: {
                    retStr = retStr.padStart(2, "0");
                    break;
                }
                case 3: {
                    retStr = retStr + "月";
                    break;
                }
                default: {
                    retStr = numToCnObj[retStr] + "月";
                    break;
                }
            }
            return retStr;
        },
        "d+": function (matchLength) {
            let retStr = date0.toString();
            switch (matchLength) {
                case 1: {
                    break;
                }
                case 2: {
                    retStr = retStr.padStart(2, "0");
                    break;
                }
                case 3: {
                    retStr = "周" + week0;
                    break;
                }
                default: {
                    retStr = "星期" + week0;
                    break;
                }
            }
            return retStr;
        },
        "h+": function (matchLength) {
            let retStr = hour0 > 12 ? (hour0 - 12).toString() : hour0.toString();
            if (matchLength > 1) {
                retStr = retStr.padStart(2, "0");
            }
            return retStr;
        },
        "H+": function (matchLength) {
            let retStr = hour0.toString();
            if (matchLength > 1) {
                retStr = retStr.padStart(2, "0");
            }
            return retStr;
        },
        "m+": function (matchLength) {
            let retStr = minute0.toString();
            if (matchLength > 1) {
                retStr = retStr.padStart(2, "0");
            }
            return retStr;
        },
        "s+": function (matchLength) {
            let retStr = second0.toString();
            if (matchLength > 1) {
                retStr = retStr.padStart(2, "0");
            }
            return retStr;
        },
        "S+": handleMillisecond,
        "f+": handleMillisecond,
        "t+": function (matchLength) {
            let retStr = hour0 > 12 ? "下午" : "上午";
            if (matchLength === 1) {
                retStr = retStr.substr(0, matchLength);
            }
            return retStr;
        },
        "q+": function (matchLength) {
            return `第${quarter0.toString()}季度`;
        },
        "w+": function (matchLength) {
            return `星期${week0.toString()}`
        },
    }
    for (let k in o) {
        const arrayMatch = [...format.matchAll(new RegExp("(" + k + ")", "g"))];
        if (Array.isArray(arrayMatch) && arrayMatch.length) {
            arrayMatch.forEach((item) => {
                format = format.replace(item[0], o[k](item[0].length));
            });
        }
    }
    return format;
}

/**
 * 防抖和节流
 * 例子： 
 *      防抖：throttleOrDebounce(function () { }, 2000, { type: 'debounce' });
 *      节流-立即执行：throttleOrDebounce(function () { }, 2000);
 *      节流-不立即执行：throttleOrDebounce(function () { }, 2000, { immediate: false });
 * @param {Function} fn 目标方法
 * @param {Number} timeInterval 时间段
 * @param {Object} option
 * @returns {Function} 返回方法
 */
export const throttleOrDebounce = function (fn, timeInterval, option) {
    if (getDataType(fn) !== "function")
        throw new Error("参数异常：fn必须是函数");
    if (getDataType(timeInterval) !== "number")
        timeInterval = 1000;
    const types = ["throttle", "debounce"];
    if (getDataType(option) !== "object")
        option = {
            type: types[0], // throttle | debounce
            immediate: true // 只有当 type==="throttle" 时,该配置有效
        };
    let setTimeoutId = null,
        lastDataTime = null;
    return function () {
        let args = arguments;
        switch (option.type) {
            case types[1]: {
                /**
                 * 防抖(debounce)
                 * 实现：在给定的时间段之后调用目标函数。如果在未超过给定的时间段内再次触发，则从新计时（也就是说之前的等待浪费了）。
                 * 理解：如果你在给定的时间段内一直触发（就行缝纫机一样），那么前面的触发都是在浪费力气，只有最后一次是有效的（最后一次点击开始计时，经过给的时间段，触发目标函数）
                 */
                clearTimeout(setTimeoutId);
                setTimeoutId = setTimeout(() => {
                    fn.apply(this, args);
                }, timeInterval);
            }
            case types[0]:
            default: {
                /**
                 * 节流(throttle)——支持是否立即触发
                 * 实现：在给定的时间段之内只会调用目标函数一次。如果在未超过给定的时间段内再次触发，则直接返回。
                 * 理解：如果你在给定的时间段内一直触发（就行缝纫机一样），那么我也不像防抖(debounce)一样绝情，到了时间（给定的时间段）就会触发一次目标函数。也就是降频。
                 */
                if (option.immediate) {
                    if (lastDataTime !== null && Date.now() - lastDataTime < timeInterval) return;
                    lastDataTime = Date.now();
                    fn.apply(this, args);
                } else {
                    if (setTimeoutId) return;
                    setTimeoutId = setTimeout(() => {
                        fn.apply(this, args);
                        setTimeoutId = null;
                    }, timeInterval);
                }
                break;
            }
        }
    };
}