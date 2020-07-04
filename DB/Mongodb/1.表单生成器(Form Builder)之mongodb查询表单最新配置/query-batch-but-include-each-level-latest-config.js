db.getCollection('ConfigData').aggregate([{
    $match: {
        $or: [{
            FormId: 'CarInfo',
            Level1: null,
            Level2: null,
            Level3: null
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: null,
            Level3: null,
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: "koala",
            Level3: null
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: "koala",
            Level3: "cucumber"
        }, {
            FormId: 'DispatchRecord',
            Level1: null,
            Level2: null,
            Level3: null
        }, {
            FormId: 'DispatchRecord',
            Level1: "apple",
            Level2: null,
            Level3: null
        }, {
            FormId: 'DispatchRecord',
            Level1: "apple",
            Level2: "sheep",
            Level3: null
        }, {
            FormId: 'DispatchRecord',
            Level1: "apple",
            Level2: "sheep",
            Level3: "cabbage"
        }]
    },
}, {
    $sort: {
        CreateDate: -1
    }
}, {
    $group: {
        _id: {
            FormId: "$FormId",
            Level1: "$Level1",
            Level2: "$Level2",
            Level3: "$Level3",
        },
        // 成产过程中需要将“items”删掉，这里看一下是不是最新的
        items: {
            $push: "$$ROOT"
        },
        latestRecord: {
            $first: "$$ROOT"
        }
    }
}, {
    $sort: {
        _id: -1
    }
}, {
    $addFields: {
        TempAllLevelJoin: {
            $concat: [{
                $ifNull: ["$_id.FormId", ""]
            }, '-', {
                $ifNull: ["$_id.Level1", ""]
            }, '-', {
                $ifNull: ["$_id.Level2", ""]
            }, '-', {
                $ifNull: ["$_id.Level3", ""]
            }]
        }
    }
}, {
    $project: {
        _id: 0
    }
}]);