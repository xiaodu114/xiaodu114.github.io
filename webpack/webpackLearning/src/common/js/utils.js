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