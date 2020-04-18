db.getCollection('ConfigData').aggregate([{
    $match: {
        $or: [{
            FormId: 'CarInfo',
            Level1: null,
            Level2: null,
            Level3: null,
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: null,
            Level3: null,
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: "koala",
            Level3: null,
        }, {
            FormId: 'CarInfo',
            Level1: "pineapple",
            Level2: "koala",
            Level3: "cucumber",
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
        latestRecord: {
            $first: "$$ROOT"
        }
    }
}, {
    $sort: {
        _id: -1
    }
}, {
    $replaceRoot: {
        newRoot: "$latestRecord"
    }
}, {
    $limit: 1
}]);