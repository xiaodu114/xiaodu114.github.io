//    获取指定范围的随机数
var getRangeRandomNumber = function (num1, num2) {
    num1 = Number.isInteger(num1) ? num1 : 0;
    num2 = Number.isInteger(num2) ? num2 : 0;
    var minNum = Math.min(num1, num2),
        maxNum = Math.max(num1, num2);
    return Math.round(Math.random() * (maxNum - minNum)) + minNum;
};

//    获取指定范围随机时间，依赖方法 getRangeRandomNumber、dateExtendFormat
var getRangeRandomDate = function (date1, date2, format) {
    var date1ValueOf = new Date(date1).valueOf(),
        date2ValueOf = new Date(date2).valueOf();
    if (isNaN(date1ValueOf) && isNaN(date2ValueOf)) {
        date1ValueOf = 0;
        date2ValueOf = new Date().valueOf();
    } else {
        if (isNaN(date1ValueOf))
            date1ValueOf = 0;
        if (isNaN(date2ValueOf))
            date2ValueOf = 0;
    }
    var retDate = new Date(getRangeRandomNumber(Math.abs(date1ValueOf - date2ValueOf)) + Math.min(date1ValueOf, date2ValueOf));
    return retDate;
};

var getCreateDateForConfig = function () {
    return getRangeRandomDate("2020-01-01", "2020-04-12");
};

var getRandomLevel1 = function () {
    var level1Items = ["banana", "apple", "strawberry", "pineapple"];
    return level1Items[getRangeRandomNumber(0, level1Items.length - 1)]
};

var getRandomLevel2 = function () {
    var level2Items = ["dog", "cat", "koala", "sheep", "cow"];
    return level2Items[getRangeRandomNumber(0, level2Items.length - 1)]
};

var getRandomLevel3 = function () {
    var level3Items = ["eggplant", "cucumber", "carrot", "cabbage", "spinach"];
    return level3Items[getRangeRandomNumber(0, level3Items.length - 1)]
};

//	车辆信息—数据
var getCarInfoConfigData = function () {
    var tempAllNullData = [];
    for (var i = 0; i < 3; i++) {
        tempAllNullData.push({
            "FormConfig": "车辆信息表单：……",
            "FormId": "CarInfo",
            "Level1": null,
            "Level2": null,
            "Level3": null,
            "CreateDate": getCreateDateForConfig()
        });
    }

    var tempLevel1Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel1 = getRandomLevel1();
        tempAllNullData.forEach(item => {
            tempLevel1Data.push(Object.assign({}, item, {
                Level1: tmepCarInfoLevel1,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel2Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel2 = getRandomLevel2();
        tempLevel1Data.forEach(item => {
            tempLevel2Data.push(Object.assign({}, item, {
                Level2: tmepCarInfoLevel2,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel3Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel3 = getRandomLevel3();
        tempLevel2Data.forEach(item => {
            tempLevel3Data.push(Object.assign({}, item, {
                Level3: tmepCarInfoLevel3,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }
    var tempCarInfoConfigArr = [].concat(tempAllNullData, tempLevel1Data, tempLevel2Data, tempLevel3Data);
    return tempCarInfoConfigArr;
};
db.getCollection('ConfigData').insertMany(getCarInfoConfigData());

//	出车记录—数据
var getDispatchConfigData = function () {
    var tempAllNullData = [];
    for (var i = 0; i < 3; i++) {
        tempAllNullData.push({
            "FormConfig": "出车记录表单：……",
            "FormId": "DispatchRecord",
            "Level1": null,
            "Level2": null,
            "Level3": null,
            "CreateDate": getCreateDateForConfig()
        });
    }

    var tempLevel1Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel1 = getRandomLevel1();
        tempAllNullData.forEach(item => {
            tempLevel1Data.push(Object.assign({}, item, {
                Level1: tmepCarInfoLevel1,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel2Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel2 = getRandomLevel2();
        tempLevel1Data.forEach(item => {
            tempLevel2Data.push(Object.assign({}, item, {
                Level2: tmepCarInfoLevel2,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel3Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel3 = getRandomLevel3();
        tempLevel2Data.forEach(item => {
            tempLevel3Data.push(Object.assign({}, item, {
                Level3: tmepCarInfoLevel3,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }
    return [].concat(tempAllNullData, tempLevel1Data, tempLevel2Data, tempLevel3Data);
};
db.getCollection('ConfigData').insertMany(getDispatchConfigData());

// 维修记录-书
var getMaintenanceConfigData = function () {
    var tempAllNullData = [];
    for (var i = 0; i < 3; i++) {
        tempAllNullData.push({
            "FormConfig": "车辆维修表单：……",
            "FormId": "MaintenanceRecord",
            "Level1": null,
            "Level2": null,
            "Level3": null,
            "CreateDate": getCreateDateForConfig()
        });
    }

    var tempLevel1Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel1 = getRandomLevel1();
        tempAllNullData.forEach(item => {
            tempLevel1Data.push(Object.assign({}, item, {
                Level1: tmepCarInfoLevel1,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel2Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel2 = getRandomLevel2();
        tempLevel1Data.forEach(item => {
            tempLevel2Data.push(Object.assign({}, item, {
                Level2: tmepCarInfoLevel2,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }

    var tempLevel3Data = [];
    for (var i = 0; i < 3; i++) {
        var tmepCarInfoLevel3 = getRandomLevel3();
        tempLevel2Data.forEach(item => {
            tempLevel3Data.push(Object.assign({}, item, {
                Level3: tmepCarInfoLevel3,
                CreateDate: getCreateDateForConfig()
            }));
        });
    }
    return [].concat(tempAllNullData, tempLevel1Data, tempLevel2Data, tempLevel3Data);
};
db.getCollection('ConfigData').insertMany(getMaintenanceConfigData());