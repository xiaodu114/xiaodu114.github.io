app.controller('MainController', function($scope) {
    // 列表配置 
    var tempTableConfig = {
        data: [],
        header: {
            style: {
                "height": "48px",
                "min-height": "48px"
            },
            class: ""
        },
        body: {
            style: "",
            class: "",
            trStyle: {
                "height": "48px",
                "min-height": "48px"
            },
            trClass: ""
        },
        columns: []
    };
    //  列动态配置
    $scope.columnsConfigManager = {
        columnsConfig: [],
        columnWidthTypeOption: [{
            text: "auto"
        }, {
            text: "%"
        }, {
            text: "px"
        }],
        addColumnTypeModel: {
            columnType: null,
            columnTypeValue: "",
            columnShowName: "",
            columnShowIndex: ""
        },
        addColumnConfig: function() {
            var tempColsConfig = angular.copy(this.columnsConfig);
            tempColsConfig.push(angular.copy(this.addColumnTypeModel));
            this.columnsConfig = tempColsConfig;
            this.addColumnTypeModel = {
                columnType: this.columnWidthTypeOption[0],
                columnTypeValue: "",
                columnShowName: "",
                columnShowIndex: ""
            }
        },
        deleteColumnConfig: function(tr, index) {
            var tempColsConfig = angular.copy(this.columnsConfig);
            tempColsConfig.splice(index, 1);
            this.columnsConfig = tempColsConfig;
        }
    };
    $scope.columnsConfigManager.addColumnTypeModel.columnType = $scope.columnsConfigManager.columnWidthTypeOption[
        0];
    $scope.$watch('columnsConfigManager.columnsConfig', function(newValue, oldValue) {
        tempTableConfig.columns = [];
        [].map.call(newValue, function(colConfigItem) {
            var tempCol = {
                    thText: colConfigItem.columnShowName,
                    tdIndex: colConfigItem.columnShowIndex,
                    isTitleColumn: false
                },
                tempColType = colConfigItem.columnType.text;
            switch (tempColType) {
                case "auto":
                    {
                        tempCol["thStyle"] = tempCol["tdStyle"] = {
                            "min-width": "150px"
                        };
                        break;
                    }
                case "px":
                    {
                        tempCol["thStyle"] = tempCol["tdStyle"] = {
                            "width": colConfigItem.columnTypeValue + tempColType,
                            "flex": "none",
                            "min-width": colConfigItem.columnTypeValue + tempColType
                        };
                        break;
                    }
                case "%":
                    {
                        tempCol["thStyle"] = tempCol["tdStyle"] = {
                            "width": colConfigItem.columnTypeValue + tempColType,
                            "flex": "none",
                            "min-width": "150px"
                        };
                        break;
                    }
            }
            tempTableConfig.columns.push(tempCol);
        });
        tempTableConfig.columns.unshift({
            thText: "序号",
            tdTpl: 'DDZTableListXuhaolie.html',
            thStyle: {
                "text-align": "center",
                "width": "60px",
                "flex": "none",
                "min-width": "60px"
            },
            tdStyle: {
                "text-align": "center",
                "width": "60px",
                "flex": "none",
                "min-width": "60px"
            }
        });
        $scope.tableConfig = tempTableConfig;
    });
    //  预览管理
    $scope.previewManager = {
        isShowPreview: false,
        openPreview: function() {
            var tempTrs = [];
            for (let index = 0; index < 20; index++) {
                var tempTr = {};
                [].map.call($scope.columnsConfigManager.columnsConfig, function(
                    colConfigObjItem) {
                    tempTr[colConfigObjItem.columnShowIndex] =
                        `${index+1}-${colConfigObjItem.columnShowName}`;
                });
                tempTrs.push(tempTr);
            }
            tempTableConfig.data = tempTrs;
            this.isShowPreview = true;
        },
        cancelPreview: function() {
            this.isShowPreview = false;
        }
    };
});