app.ctrl.register("ddz_module1_page2_controller", function ($scope, $stateParams) {
    $scope.title = "我是模块一门下的【页面二】";
    const { page2Id } = $stateParams;
    $scope.routeParamsObj = { page2Id };
});
