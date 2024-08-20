app.ctrl.register("ddz_module1_page1_controller", function ($scope, $stateParams) {
    $scope.title = "我是模块一门下的【页面一】";
    const { page1Id, contextInfo, moduleName, dataTime } = $stateParams;
    $scope.routeParamsObj = { page1Id, contextInfo, moduleName, dataTime };
});
