app.ctrl.register("ddz_module1_page3_controller", function ($scope, $stateParams) {
    $scope.title = "我是模块一门下的【页面三】";
    const { page3Id, contextInfo, moduleName, dataTime } = $stateParams;
    $scope.routeParamsObj = { page3Id, contextInfo, moduleName, dataTime };
});
