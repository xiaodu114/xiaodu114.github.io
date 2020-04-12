//https://xbuba.com/questions/36824601
db.getCollection('IRM_ModelConfig').aggregate([{
        $match: {
            $or: [{
                    ModelId: '334256284381220864',
                    AppCode: null,
                    BusinessModuleId: null,
                    OrganizationId: null,
                    SceneCode: null
                },
                {
                    ModelId: '334256284381220864',
                    AppCode: "OperationControlCooperation",
                    BusinessModuleId: "0e69aae9-8587-11e8-8d4d-00155d0a1925",
                    OrganizationId: null,
                    SceneCode: null
                },
                {
                    ModelId: '334256284381220864',
                    AppCode: "OperationControlCooperation",
                    BusinessModuleId: "0e69aae9-8587-11e8-8d4d-00155d0a1925",
                    OrganizationId: "53305584107157536",
                    SceneCode: null
                },
                {
                    ModelId: '334256284381220864',
                    AppCode: "OperationControlCooperation",
                    BusinessModuleId: "0e69aae9-8587-11e8-8d4d-00155d0a1925",
                    OrganizationId: "53305584107157536",
                    SceneCode: "1"
                }
            ]
        },
    },
    {
        $group: {
            _id: {
                ModelId: "$ModelId",
                AppCode: "$AppCode",
                BusinessModuleId: "$BusinessModuleId",
                OrganizationId: "$OrganizationId",
                SceneCode: "$SceneCode"
            },
            latestRecord: {
                $first: "$$ROOT"
            }
        }
    },
    {
        $sort: {
            _id: -1
        }
    },
    {
        $replaceRoot: {
            newRoot: "$latestRecord"
        }
    },
    {
        $group: {
            _id: {
                ModelId: "$ModelId"
            },
            items: {
                $addToSet: "$$ROOT"
            }
        }
    },
    {
        $project: {
            _id: 0,
            ModelId: '$_id.ModelId',
            latestConfig: {
                $arrayElemAt: ["$items", 0]
            }
        }
    }
])