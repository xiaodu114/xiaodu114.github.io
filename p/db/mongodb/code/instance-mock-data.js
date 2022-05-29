//    0、获取一个GUID
// let guidFirstValue = Date.now();
// function getGUID () {
// return (guidFirstValue++).toString();
// }
function getGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16).toUpperCase();
    }).replace(/-/g, '');
}
//    1、获取指定范围内的一个随机整数
function getInRangeInteger(num1, num2) {
    num1 = Number.isInteger(num1) ? num1 : 0;
    num2 = Number.isInteger(num2) ? num2 : 0;
    if (num1 > num2)
        [num1, num2] = [num2, num1];
    return Math.round(Math.random() * (num2 - num1)) + num1;
}
//    2、获取指定范围随机时间，依赖方法 getInRangeInteger
function date_GetInRangeDate(date1, date2) {
    let v1 = new Date(date1).valueOf(),
        v2 = new Date(date2).valueOf();
    if (isNaN(v1) && isNaN(v2)) {
        v1 = 0;
        v2 = new Date().valueOf();
    } else {
        if (isNaN(v1))
            v1 = 0;
        if (isNaN(v2))
            v2 = 0;
    }
    return new Date(getInRangeInteger(Math.abs(v1 - v2)) + Math.min(v1, v2));
}
//    3、获取一个随机汉字
function getAZhLetter() {
    return String.fromCharCode(getInRangeInteger(parseInt("4E00", 16), parseInt("9FA5", 16)));
}
//    4、获取一个随机英文字母
function getAEnLetter(type) {
    let num1 = 97,
        num2 = 122;
    switch (type) {
        case "lower": {
            break;
        }
        case "upper": {
            num1 = 65;
            num2 = 90;
            break;
        }
        default: {
            if ((Math.random() - 0.5) > 0) {
                num1 = 65;
                num2 = 90;
            }
        }
    }
    return String.fromCharCode(getInRangeInteger(num1, num2));
}
//    5、获取指定长度的字符串（汉字、英文字母组成）
function getCustomLenStr(len) {
    len = isNaN(Number(len)) ? 1 : Math.abs(Math.ceil(Number(len)));
    let retStr = "";
    for (let i = 0; i < len; i++) {
        retStr += (Math.random() - 0.5) > 0 ? getAZhLetter() : getAEnLetter();
    }
    return retStr;
}
//    6、获取随机车牌照
let getRandomLicensePlate = (function f(excludeArr) {
    if (!Array.isArray(excludeArr))
        excludeArr = [];
    //    生成一个随机车联牌照
    let strProvinceShorter = "京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川黔滇藏陕甘青宁新港澳台";
    let strNumberLetter = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tempRetLicensePlate = strProvinceShorter[getInRangeInteger(strProvinceShorter.length - 1)];
    for (let i = 0; i < 6; i++) {
        tempRetLicensePlate += strNumberLetter[getInRangeInteger(strNumberLetter.length - 1)];
    }
    //    判断这个车联牌照是否存在
    if (excludeArr.indexOf(tempRetLicensePlate) >= 0) {
        tempRetLicensePlate = f(excludeArr);
    } else {
        excludeArr.push(tempRetLicensePlate);
    }
    return tempRetLicensePlate;
});

//**********************************************************************************************************************************************************************************

let mongo = new Mongo('127.0.0.1:27017');
//mongo.getDB('admin').auth('用户名', '密码');
let db = mongo.getDB('Test001');

//    每页数量（控制单次插入到数据库的数量）
let pageSize = 10000;
//    创建用户集合
let GV_CreateUserIds = ["user10000", "user10001", "user10002", "user10003", "user10004", "user10005", "user10006", "user10007", "user10008", "user10009"];
//    插入数据方法
function realBatchInsertData(trs) {
    try {
        db.instance.insertMany(trs);
    } catch (e) {
        print(e);
    }
};

function getInstanceOtherAttrs(moduleId, moduleVersion) {
    let tempCreateUserIdIndex = Math.floor(Math.random() * GV_CreateUserIds.length),
        tempCreateDate = date_GetInRangeDate("2022-01-01", "2022-05-24");
    return {
        CreateUserId: GV_CreateUserIds[tempCreateUserIdIndex],
        CreateUserName: GV_CreateUserIds[tempCreateUserIdIndex],
        CreateDate: tempCreateDate,
        LastOperateDate: tempCreateDate,
        ModuleId: moduleId,
        ModuleVersion: moduleVersion
    };
};

//    车辆花费表插入数据配置
let GV_CarWastageInitConfig = {
    moduleId: "507048044944692000",
    moduleVersion: "507048044944692001",
    moduleName: "车辆花费表",
    //    carWastageMin~carWastageMax 这两个数之间生成一个随机数，作为每辆车的花费记录（数据库条数）
    carWastageMin: 50,
    carWastageMax: 100,
    pageIndex: 0,
    wastageType: [{
        text: "违章",
        detailed: ["信号灯", "压线", "单双号", "规定方向行驶", "避让特殊车辆", "避让行人", "时间道路禁行"]
    }, {
        text: "洗车",
        detailed: ["全套", "外围"]
    }, {
        text: "修车",
        detailed: ["轮胎", "前玻璃", "后玻璃", "坐垫", "前大灯", "后大灯", "车窗", "发动机", "电瓶", "变速箱"]
    }, {
        text: "加油",
        detailed: ["92", "93", "95", "97"]
    }, {
        text: "保险",
        detailed: ["太平洋", "平安", "人保", "泰康"]
    }, {
        text: "肇事",
        detailed: ["伤人", "护栏", "撞车", "间接事故", "其他"]
    }
    ]
};

//    车辆营收表插入数据配置
let GV_CarRevenueInitConfig = {
    moduleId: "507048044944693000",
    moduleVersion: "507048044944693001",
    moduleName: "车辆营收表",
    //    carRevenueMin~carRevenueMax 这两个数之间生成一个随机数，作为每辆车的营收记录（数据库条数）
    carRevenueMin: 100,
    carRevenueMax: 200,
    pageIndex: 0,
    revenueTypes: [{
        text: "租赁",
        detailed: ["一天", "一周", "一月", "一年"]
    }, {
        text: "载客",
        detailed: ["线下", "滴滴", "Uber", "快的", "其他"]
    }, {
        text: "送货",
        detailed: ["手机", "笔记本", "照相机", "微波炉", "电磁率", "其他"]
    }, {
        text: "其他",
        detailed: ["婚车", "其他"]
    }
    ]
};

//    车辆信息表插入数据配置
let GV_CarInfoInitConfig = {
    moduleId: "507048044944691000",
    moduleVersion: "507048044944691001",
    moduleName: "车辆信息表",
    //    carModuleMin~carModuleMax 这两个数之间生成一个随机数，作为生成每个车型的数量（数据库条数）
    carModuleMin: 10,
    carModuleMax: 20,
    carTypes: [{
        brandName: "红旗",
        modules: [{
            name: "HS7",
            min: 349800,
            max: 459800
        }, {
            name: "HS5",
            min: 183800,
            max: 249800
        }, {
            name: "H7",
            min: 252800,
            max: 317800
        }, {
            name: "H5",
            min: 146800,
            max: 190800
        }, {
            name: "HE-HS3",
            min: 225800,
            max: 317800
        }
        ]
    }, {
        brandName: "比亚迪",
        modules: [{
            name: "元",
            min: 65900,
            max: 99900
        }, {
            name: "宋",
            min: 79800,
            max: 119800
        }, {
            name: "宋Pro",
            min: 89800,
            max: 119800
        }, {
            name: "唐",
            min: 129900,
            max: 169900
        }, {
            name: "比亚迪F3",
            min: 43900,
            max: 65900
        }, {
            name: "速锐",
            min: 59900,
            max: 69900
        }, {
            name: "秦Pro",
            min: 79800,
            max: 115900
        }, {
            name: "宋MAX",
            min: 79900,
            max: 129900
        }, {
            name: "元EV",
            min: 89900,
            max: 139900
        }, {
            name: "比亚迪S2",
            min: 89800,
            max: 109800
        }, {
            name: "宋DM",
            min: 176900,
            max: 206900
        }, {
            name: "宋Pro DM",
            min: 169800,
            max: 259900
        }, {
            name: "宋EV",
            min: 189900,
            max: 219900
        }, {
            name: "宋Pro EV",
            min: 179800,
            max: 259900
        }, {
            name: "唐DM",
            min: 229900,
            max: 329900
        }, {
            name: "唐EV",
            min: 259900,
            max: 409900
        }, {
            name: "比亚迪e1",
            min: 59900,
            max: 79900
        }, {
            name: "比亚迪e2",
            min: 89800,
            max: 119800
        }, {
            name: "比亚迪e3",
            min: 103800,
            max: 139800
        }, {
            name: "秦DM",
            min: 132900,
            max: 209900
        }, {
            name: "秦Pro DM",
            min: 136900,
            max: 206900
        }, {
            name: "秦EV",
            min: 149900,
            max: 169900
        }, {
            name: "秦Pro EV",
            min: 149900,
            max: 299900
        }, {
            name: "宋MAX DM",
            min: 149900,
            max: 196900
        }, {
            name: "宋MAX EV",
            min: 179800,
            max: 199800
        }
        ]
    }, {
        brandName: "奇瑞",
        modules: [{
            name: "瑞虎3",
            min: 59900,
            max: 79900
        }, {
            name: "瑞虎3x",
            min: 49900,
            max: 62900
        }, {
            name: "瑞虎5x",
            min: 59900,
            max: 89900
        }, {
            name: "瑞虎7",
            min: 85900,
            max: 150900
        }, {
            name: "瑞虎8",
            min: 88800,
            max: 155900
        }, {
            name: "艾瑞泽5",
            min: 49900,
            max: 84900
        }, {
            name: "艾瑞泽GX",
            min: 74900,
            max: 113900
        }, {
            name: "瑞虎3xe",
            min: 175800,
            max: 189800
        }, {
            name: "瑞虎e",
            min: 109900,
            max: 143900
        }, {
            name: "奇瑞eQ1",
            min: 59800,
            max: 75800
        }, {
            name: "艾瑞泽e",
            min: 126800,
            max: 143800
        }, {
            name: "艾瑞泽5e",
            min: 192300,
            max: 212300
        }
        ]
    }, {
        brandName: "吉利",
        modules: [{
            name: "远景X1",
            min: 39900,
            max: 57900
        }, {
            name: "远景X3",
            min: 45900,
            max: 68900
        }, {
            name: "缤越",
            min: 78800,
            max: 129800
        }, {
            name: "远景S1",
            min: 59900,
            max: 94900
        }, {
            name: "远景X6",
            min: 68900,
            max: 105900
        }, {
            name: "帝豪GS",
            min: 77800,
            max: 116800
        }, {
            name: "博越",
            min: 88800,
            max: 161800
        }, {
            name: "星越",
            min: 135800,
            max: 195800
        }, {
            name: "金刚",
            min: 47900,
            max: 65900
        }, {
            name: "远景",
            min: 47900,
            max: 73900
        }, {
            name: "帝豪",
            min: 68900,
            max: 98800
        }, {
            name: "帝豪GL",
            min: 78800,
            max: 121800
        }, {
            name: "缤瑞",
            min: 75800,
            max: 110800
        }, {
            name: "博瑞",
            min: 136800,
            max: 179800
        }, {
            name: "嘉际",
            min: 99800,
            max: 148800
        }, {
            name: "缤越PHEV",
            min: 149800,
            max: 169800
        }, {
            name: "帝豪GSe",
            min: 119800,
            max: 159800
        }, {
            name: "星越PHEV",
            min: 188800,
            max: 216800
        }, {
            name: "帝豪EV",
            min: 135800,
            max: 238300
        }, {
            name: "帝豪PHEV",
            min: 165800,
            max: 185800
        }, {
            name: "帝豪GL PHEV",
            min: 152800,
            max: 164800
        }, {
            name: "博瑞PHEV",
            min: 176800,
            max: 209800
        }, {
            name: "嘉际PHEV",
            min: 169800,
            max: 192800
        }
        ]
    }, {
        brandName: "长安",
        modules: [{
            name: "长安CS15",
            min: 55900,
            max: 80900
        }, {
            name: "长安CS35",
            min: 63900,
            max: 87900
        }, {
            name: "长安CS35 PLUS",
            min: 69900,
            max: 109900
        }, {
            name: "长安CS55",
            min: 82900,
            max: 133900
        }, {
            name: "长安CS75",
            min: 79800,
            max: 174800
        }, {
            name: "长安CS75 PLUS",
            min: 106900,
            max: 154900
        }, {
            name: "长安CS85 COUPE",
            min: 119900,
            max: 169900
        }, {
            name: "长安CS95",
            min: 165900,
            max: 213900
        }, {
            name: "奔奔",
            min: 40900,
            max: 56900
        }, {
            name: "悦翔",
            min: 49900,
            max: 67900
        }, {
            name: "逸动DT",
            min: 52900,
            max: 80900
        }, {
            name: "逸动XT",
            min: 77900,
            max: 111900
        }, {
            name: "逸动",
            min: 69900,
            max: 103900
        }, {
            name: "睿骋CC",
            min: 84900,
            max: 135900
        }, {
            name: "锐程CC",
            min: 94900,
            max: 128900
        }, {
            name: "睿骋",
            min: 120800,
            max: 150800
        }, {
            name: "凌轩",
            min: 67900,
            max: 110900
        }, {
            name: "长安CS15 EV",
            min: 89800,
            max: 98800
        }, {
            name: "长安CS75 PHEV",
            min: 175800,
            max: 206800
        }, {
            name: "奔奔EV",
            min: 49800,
            max: 81800
        }, {
            name: "逸动ET",
            min: 132900,
            max: 142900
        }, {
            name: "逸动PHEV",
            min: 160900,
            max: 169900
        }, {
            name: "逸动EV",
            min: 129900,
            max: 139900
        },
        ]
    }, {
        brandName: "长安欧尚",
        modules: [{
            name: "长安欧尚科赛3",
            min: 59900,
            max: 76900
        }, {
            name: "长安欧尚科赛5",
            min: 69900,
            max: 82900
        }, {
            name: "长安欧尚X70A",
            min: 49900,
            max: 859500
        }, {
            name: "长安欧尚CX70",
            min: 59900,
            max: 109900
        }, {
            name: "长安欧尚科赛",
            min: 86800,
            max: 152800
        }, {
            name: "欧尚S",
            min: 39900,
            max: 55900
        }, {
            name: "欧尚长行",
            min: 68900,
            max: 82900
        }, {
            name: "长安欧尚A600",
            min: 49900,
            max: 84900
        }, {
            name: "长安欧尚A800",
            min: 62900,
            max: 100900
        }, {
            name: "长安欧尚科尚",
            min: 79800,
            max: 160800
        }, {
            name: "长安之星9",
            min: 47800,
            max: 48800
        }, {
            name: "长安星卡",
            min: 32900,
            max: 47900
        }, {
            name: "尼欧Ⅱ",
            min: 88800,
            max: 100800
        }, {
            name: "欧力威EV",
            min: 105800,
            max: 105800
        }, {
            name: "欧诺S EV",
            min: 175800,
            max: 175800
        }, {
            name: "欧尚长行EV",
            min: 169800,
            max: 169800
        }, {
            name: "欧尚EV",
            min: 169800,
            max: 169800
        }, {
            name: "欧尚A600 EV",
            min: 149800,
            max: 149800
        }, {
            name: "长安之星9 EV",
            min: 152800,
            max: 156000
        }, {
            name: "长安星卡EV",
            min: 123800,
            max: 125800
        },
        ]
    }, {
        brandName: "长安轻型车",
        modules: [{
            name: "睿行S50",
            min: 48900,
            max: 77900
        }, {
            name: "睿行S50T",
            min: 61900,
            max: 78900
        }, {
            name: "睿行M60",
            min: 51900,
            max: 59900
        }, {
            name: "睿行M70",
            min: 60500,
            max: 74000
        }, {
            name: "睿行M80",
            min: 58500,
            max: 72000
        }, {
            name: "睿行M90",
            min: 68500,
            max: 92500
        }, {
            name: "神骐F30",
            min: 47600,
            max: 63800
        }, {
            name: "神骐T10",
            min: 39900,
            max: 50900
        }, {
            name: "神骐T20",
            min: 33900,
            max: 59700
        }, {
            name: "凯程F70",
            min: 92800,
            max: 139800
        }, {
            name: "长安星卡L系列",
            min: 39900,
            max: 47900
        }, {
            name: "长安星卡C系列",
            min: 30900,
            max: 33600
        }, {
            name: "睿行ES30",
            min: 66800,
            max: 69800
        }, {
            name: "睿行EM60",
            min: 122800,
            max: 122800
        }, {
            name: "睿行EM80",
            min: 96800,
            max: 120000
        }
        ]
    }, {
        brandName: "长安跨越",
        modules: [{
            name: "长安跨越V3",
            min: 33500,
            max: 34300
        }, {
            name: "跨越王X1",
            min: 39600,
            max: 51800
        }, {
            name: "跨越王X3",
            min: 45700,
            max: 58400
        }, {
            name: "长安跨越王X5",
            min: 47400,
            max: 65600
        }, {
            name: "长安新豹2",
            min: 40700,
            max: 58600
        }, {
            name: "新豹3",
            min: 46200,
            max: 59900
        }, {
            name: "新豹T3",
            min: 41300,
            max: 51800
        }, {
            name: "长安新豹MINI",
            min: 32100,
            max: 50500
        }, {
            name: "跨越者D5",
            min: 59300,
            max: 67700
        }, {
            name: "长安跨越新能源V3 EV",
            min: 79200,
            max: 79200
        }, {
            name: "长安跨越新能源V5 EV",
            min: 93800,
            max: 93800
        }
        ]
    }, {
        brandName: "力帆",
        modules: [{
            name: "迈威",
            min: 56800,
            max: 73800
        }, {
            name: "力帆X80",
            min: 109900,
            max: 149900
        }, {
            name: "力帆820",
            min: 76800,
            max: 119800
        }, {
            name: "轩朗",
            min: 69800,
            max: 106800
        }, {
            name: "乐途",
            min: 35800,
            max: 59800
        }, {
            name: "力帆650EV",
            min: 168900,
            max: 175800
        }, {
            name: "力帆820EV",
            min: 256800,
            max: 279800
        }
        ]
    }, {
        brandName: "长城",
        modules: [{
            name: "风骏5",
            min: 68800,
            max: 112800
        }, {
            name: "风骏6",
            min: 86800,
            max: 117800
        }, {
            name: "风骏7",
            min: 86800,
            max: 138800
        }, {
            name: "炮",
            min: 97800,
            max: 159800
        }, {
            name: "长城C30 EV",
            min: 150000,
            max: 154000
        }
        ]
    }, {
        brandName: "哈弗",
        modules: [{
            name: "哈弗H2",
            min: 74900,
            max: 95900
        }, {
            name: "哈弗H2s",
            min: 70000,
            max: 85000
        }, {
            name: "哈弗H4",
            min: 73900,
            max: 115000
        }, {
            name: "哈弗F5",
            min: 100000,
            max: 130000
        }, {
            name: "哈弗H5",
            min: 107800,
            max: 136800
        }, {
            name: "哈弗M6",
            min: 66000,
            max: 82000
        }, {
            name: "哈弗H6",
            min: 102000,
            max: 136000
        }, {
            name: "哈弗H6 Coupe",
            min: 79900,
            max: 119000
        }, {
            name: "哈弗H7",
            min: 142000,
            max: 180000
        }, {
            name: "哈弗F7",
            min: 109000,
            max: 153700
        }, {
            name: "哈弗F7x",
            min: 119900,
            max: 154900
        }, {
            name: "哈弗H9",
            min: 209800,
            max: 272800
        },
        ]
    }, {
        brandName: "江铃",
        modules: [{
            name: "宝典",
            min: 78800,
            max: 105300
        }, {
            name: "凯锐800",
            min: 120800,
            max: 129100
        }, {
            name: "凯运强劲版",
            min: 99500,
            max: 117400
        }, {
            name: "凯运升级版",
            min: 94800,
            max: 106800
        }, {
            name: "顺达宽体",
            min: 90800,
            max: 100000
        }, {
            name: "顺达窄体",
            min: 84000,
            max: 89000
        }, {
            name: "特顺",
            min: 101300,
            max: 142700
        }, {
            name: "域虎3",
            min: 89800,
            max: 122200
        }, {
            name: "域虎5",
            min: 96800,
            max: 136300
        }, {
            name: "域虎7",
            min: 119800,
            max: 176300
        }, {
            name: "江铃E100B",
            min: 73800,
            max: 73800
        }, {
            name: "江铃E160",
            min: 95800,
            max: 98800
        }, {
            name: "江铃E200L",
            min: 87800,
            max: 90800
        }, {
            name: "江铃E200N",
            min: 90800,
            max: 93800
        }, {
            name: "易至EV3",
            min: 66800,
            max: 83800
        }, {
            name: "易至EX5",
            min: 89800,
            max: 122800
        }, {
            name: "特顺EV",
            min: 206000,
            max: 206000
        }, {
            name: "骐铃T5",
            min: 65800,
            max: 86800
        }, {
            name: "骐铃T7",
            min: 72800,
            max: 113800
        }, {
            name: "骐铃T100",
            min: 53800,
            max: 71800
        }, {
            name: "D-MAX房车",
            min: 283000,
            max: 396000
        }, {
            name: "考斯特房车",
            min: 318000,
            max: 380000
        }, {
            name: "旅居房车",
            min: 536000,
            max: 596000
        }, {
            name: "罗莎房车租赁款",
            min: 268000,
            max: 288000
        }, {
            name: "骐铃T7皮卡房车",
            min: 258000,
            max: 299800
        }, {
            name: "全顺商旅房车",
            min: 468000,
            max: 518000
        }, {
            name: "全顺T型房车",
            min: 408000,
            max: 448000
        }, {
            name: "商旅房车",
            min: 438000,
            max: 488000
        }, {
            name: "商旅房车经典款",
            min: 388000,
            max: 428000
        }, {
            name: "途睿欧商务车",
            min: 298000,
            max: 398000
        }
        ]
    },
    ]
};

let carTypeModulesCount = 0;
GV_CarInfoInitConfig.carTypes.forEach((carType) => {
    carTypeModulesCount += carType.modules.length;
});
print("🚗🚗🚗共有不同品牌型号的汽车" + carTypeModulesCount + "种🚗🚗🚗");

print("🚗🚗🚗伪造数据，计时开始🚗🚗🚗");
let insertTotalDataCount = 0, startTimeForCarInfo = new Date();
let GV_TempCarLicensePlates = [];
GV_CarInfoInitConfig.carTypes.forEach((carType) => {
    if (Array.isArray(carType.modules) && carType.modules.length) {
        carType.modules.forEach((module) => {
            for (let i = 0; i < getInRangeInteger(GV_CarInfoInitConfig.carModuleMin, GV_CarInfoInitConfig.carModuleMax); i++) {
                //    这里会生成一条车辆信息记录（一辆真正的车，有车牌号）
                let tempCarInfoPlate = getRandomLicensePlate(GV_TempCarLicensePlates),
                    tempCarInfoBuyDate = date_GetInRangeDate("2016-01-01", "2021-12-01", "yyyy-MM-dd HH:mm:ss");
                let trForCarInfo = Object.assign({
                    _id: getGUID(),
                    FormData: [{
                        key: "1572493551001",
                        value: carType.brandName
                    }, {
                        key: "1572493551002",
                        value: module.name
                    }, {
                        key: "1572493551003",
                        value: tempCarInfoPlate
                    }, {
                        key: "1572493551004",
                        value: tempCarInfoBuyDate
                    }, {
                        key: "1572493551005",
                        value: getInRangeInteger(module.min, module.max)
                    }, {
                        key: "1572493551006",
                        value: getCustomLenStr(getInRangeInteger(20))
                    }
                    ]
                }, getInstanceOtherAttrs(GV_CarInfoInitConfig.moduleId, GV_CarInfoInitConfig.moduleVersion));

                let currentNewTrs = [trForCarInfo];
                //    这里根据上面的车辆信息生成随机数量的车辆花费记录
                let currentCarWastageCount = getInRangeInteger(GV_CarWastageInitConfig.carWastageMin, GV_CarWastageInitConfig.carWastageMax);
                for (let j = 0; j < currentCarWastageCount; j++) {
                    let tempUserIdIndexWastageType = getInRangeInteger(GV_CreateUserIds.length - 1);
                    let tempWastageTypeIndex = getInRangeInteger(GV_CarWastageInitConfig.wastageType.length - 1);
                    let tempWastageTypeDetailIndex = getInRangeInteger(GV_CarWastageInitConfig.wastageType[tempWastageTypeIndex].detailed.length - 1);

                    currentNewTrs.push(Object.assign({
                        _id: getGUID(),
                        FormData: [{
                            key: "1572493552001",
                            value: {
                                id: trForCarInfo._id,
                                name: tempCarInfoPlate,
                                value: ""
                            }
                        }, {
                            key: "1572493552002",
                            value: [{
                                id: GV_CreateUserIds[tempUserIdIndexWastageType],
                                name: GV_CreateUserIds[tempUserIdIndexWastageType],
                                face: ""
                            }
                            ]
                        }, {
                            key: "1572493552003",
                            value: date_GetInRangeDate(tempCarInfoBuyDate, "2021-12-31", "yyyy-MM-dd HH:mm:ss")
                        }, {
                            key: "1572493552004",
                            value: GV_CarWastageInitConfig.wastageType[tempWastageTypeIndex].text
                        }, {
                            key: "1572493552005",
                            value: getInRangeInteger(20, 10000)
                        }, {
                            key: "1572493552006",
                            value: GV_CarWastageInitConfig.wastageType[tempWastageTypeIndex].detailed[tempWastageTypeDetailIndex]
                        }
                        ]
                    }, getInstanceOtherAttrs(GV_CarWastageInitConfig.moduleId, GV_CarWastageInitConfig.moduleVersion)));
                }

                //    这里根据上面的车辆信息生成随机数量的车辆营收记录
                let currentCarRevenueCount = getInRangeInteger(GV_CarRevenueInitConfig.carRevenueMin, GV_CarRevenueInitConfig.carRevenueMax);
                for (let k = 0; k < currentCarRevenueCount; k++) {
                    let tempUserIdIndexRevenue = getInRangeInteger(GV_CreateUserIds.length - 1);
                    let tempRevenueIndex = getInRangeInteger(GV_CarRevenueInitConfig.revenueTypes.length - 1);
                    let tempRevenueDetailIndex = getInRangeInteger(GV_CarRevenueInitConfig.revenueTypes[tempRevenueIndex].detailed.length - 1);

                    currentNewTrs.push(Object.assign({
                        _id: getGUID(),
                        FormData: [{
                            key: "1572493553001",
                            value: {
                                id: trForCarInfo._id,
                                name: tempCarInfoPlate,
                                value: ""
                            }
                        }, {
                            key: "1572493553002",
                            value: [{
                                id: GV_CreateUserIds[tempUserIdIndexRevenue],
                                name: GV_CreateUserIds[tempUserIdIndexRevenue],
                                face: ""
                            }
                            ]
                        }, {
                            key: "1572493553003",
                            value: date_GetInRangeDate(tempCarInfoBuyDate, "2021-12-31", "yyyy-MM-dd HH:mm:ss")
                        }, {
                            key: "1572493553004",
                            value: GV_CarRevenueInitConfig.revenueTypes[tempRevenueIndex].text
                        }, {
                            key: "1572493553005",
                            value: getInRangeInteger(20, 10000)
                        }, {
                            key: "1572493553006",
                            value: getInRangeInteger(50, 3000)
                        }, {
                            key: "1572493553007",
                            value: GV_CarRevenueInitConfig.revenueTypes[tempRevenueIndex].detailed[tempRevenueDetailIndex]
                        },
                        ]
                    }, getInstanceOtherAttrs(GV_CarRevenueInitConfig.moduleId, GV_CarRevenueInitConfig.moduleVersion)));
                }

                print("开始插入 车辆：" + carType.brandName + "->" + module.name + "->" + tempCarInfoPlate + " 本身和与之关联的" + GV_CarWastageInitConfig.moduleName + "、" + GV_CarRevenueInitConfig.moduleName + "的记录");
                let pageNum = Math.ceil(currentNewTrs.length / pageSize);
                for (let m = 1; m <= pageNum; m++) {
                    let currentPageTrs = currentNewTrs.slice((m - 1) * pageSize, m * pageSize);
                    print("            第" + m + "页，共" + currentPageTrs.length + "条");
                    realBatchInsertData(currentPageTrs);
                }
                insertTotalDataCount += currentNewTrs.length;
                print("结束插入 车辆：" + carType.brandName + "->" + module.name + "->" + tempCarInfoPlate + "->" + currentNewTrs.length + "条，累计：" + insertTotalDataCount + "条");
            }
        });
    }
});
GV_TempCarLicensePlates.length = 0;
GV_CarInfoInitConfig = null;
GV_CarWastageInitConfig = null;
GV_CarRevenueInitConfig = null;
print("🚗🚗🚗伪造数据，计时结束🚗🚗🚗 总共插入：" + insertTotalDataCount + "条数据。" + "耗时：" + (new Date() - startTimeForCarInfo) / 1000 + "s");