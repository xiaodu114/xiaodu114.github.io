app.ctrl.register("ddz_module1_controller", function ($scope, $state) {
    const module1Path = "/demo/angular1/ui-router-demo/module/module1/pages/";
    const navItems = [
        { code: "page1", name: "页面1", url: "", templateUrl: module1Path + "page1.html", asyncJS: [module1Path + "page1.js"] },
        { code: "page2", name: "页面2", url: "", templateUrl: module1Path + "page2.html", asyncJS: [module1Path + "page2.js"] },
        { code: "page3", name: "页面3", url: "", templateUrl: module1Path + "page3.html", asyncJS: [module1Path + "page3.js"] }
    ];
    const curRouteName = $state.current.name;

    // 注册路由
    navItems.forEach(function (menu) {
        let routeName = menu.code;
        if (curRouteName != "") {
            routeName = curRouteName + "." + routeName;
        }

        if (!$state.get(routeName)) {
            const routeConfig = {
                url: "/" + menu.code,
                templateUrl: menu.templateUrl,
                cache: false,
                resolve: {
                    load: app.loadJS(menu.asyncJS)
                }
            };
            switch (menu.code) {
                case "page1": {
                    routeConfig.url = "/" + menu.code + "/:page1Id";
                    routeConfig.params = {
                        moduleName: null,
                        dataTime: null,
                        contextInfo: null
                    };
                    break;
                }
                case "page2": {
                    routeConfig.url = "/" + menu.code + "/:page2Id";
                    break;
                }
                case "page3": {
                    routeConfig.params = {
                        page3Id: null,
                        moduleName: null,
                        dataTime: null,
                        contextInfo: null
                    };
                    break;
                }
            }
            app.router.register(routeName, routeConfig);
        }
    });

    const navManager = {
        activeItem: null,
        items: navItems.map((item) => {
            return {
                code: item.code,
                name: item.name
            };
        }),
        itemClick(item) {
            if (navManager.activeItem === item) return;
            navManager.activeItem = item;
            let paramsObj = {
                moduleName: item.name,
                dataTime: new Date(),
                contextInfo: {
                    moduleName: item.name,
                    dataTime: new Date()
                }
            };
            const pageId = Math.random().toString().slice(2);
            switch (item.code) {
                case "page1": {
                    paramsObj.page1Id = pageId;
                    break;
                }
                case "page2": {
                    paramsObj = {
                        page2Id: pageId
                    };
                    break;
                }
                case "page3": {
                    paramsObj.page3Id = pageId;
                    break;
                }
            }
            $state.go(curRouteName + "." + item.code, paramsObj);
        }
    };

    $scope.title = "我是模块一";
    $scope.module1NavView = navManager;
});
