db.getCollection('ConfigData').aggregate([{
    $match: {
        $or: [{
            FormId: 'CarInfo',
            Level1: null,
            Level2: null,
            Level3: null,
        }, {
            FormId: 'DispatchRecord',
            Level1: null,
            Level2: null,
            Level3: null
        }]
    }
}, {
    $group: {
        _id: {
            FormId: "$FormId"
        },
        items: {
            $push: "$$ROOT"
        }
    }
}, {
    "$project": {
        "_id": 0,
        "FormId": "$_id.FormId",
        "Config": {
            "$arrayElemAt": [
                "$items", {
                    "$indexOfArray": [
                        "$items.CreateDate", {
                            "$max": "$items.CreateDate"
                        }
                    ]
                }
            ]
        }
    }
}, {
    $sort: {
        FormId: 1
    }
}]);