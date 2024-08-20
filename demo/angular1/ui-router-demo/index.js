function loadJSByScript(url) {
    return new Promise((resolve, reject) => {
        const ele = document.createElement("script");
        ele.src = url;
        ele.onload = resolve;
        ele.onerror = reject;
        document.head.appendChild(ele);
    });
}

const app = angular.module("myApp", ["ui.router"]);

app.loadJS = (url) => {
    return function ($q) {
        const def = $q.defer();
        loadJSByScript(url)
            .then(() => {
                def.resolve(true);
            })
            .catch(() => {
                def.reject(false);
            });
        return def.promise;
    };
};

app.config(function ($injector, $controllerProvider, $stateProvider, $locationProvider) {
    app.ctrl = {
        register: $controllerProvider.register
    };
    app.router = {
        register: $stateProvider.state
    };
    $locationProvider.html5Mode(false);
});

app.controller("DDZAngular1DemoPage_Controller", function ($scope, $state) {
    const modulePath = "/demo/angular1/ui-router-demo/module/";
    //页面顶部导航菜单
    const moduleItems = [
        { code: "module1", name: "模块1", url: "", templateUrl: modulePath + "module1/index.html", asyncJS: [modulePath + "module1/index.js"] },
        { code: "module2", name: "模块2", url: "", templateUrl: modulePath + "module2/index.html", asyncJS: [modulePath + "module2/index.js"] },
        { code: "module3", name: "模块3", url: "", templateUrl: modulePath + "module3/index.html", asyncJS: [modulePath + "module3/index.js"] }
    ];
    // 注册路由
    moduleItems.forEach(function (menu) {
        if (!$state.get(menu.code)) {
            app.router.register(menu.code, {
                url: "/" + menu.code,
                templateUrl: menu.templateUrl,
                resolve: {
                    load: app.loadJS(menu.asyncJS)
                }
            });
        }
    });

    const headManager = {
        title: "我和 UI-Router 有个约会",
        links: [
            {
                href: "https://angularjs.org/",
                text: "AngularJS"
            },
            {
                href: "https://ui-router.github.io/",
                text: "UI-Router"
            },
            {
                href: "https://cdn.bytedance.com/",
                text: "字节跳动CDN"
            }
        ]
    };

    const navManager = {
        activeItem: null,
        items: moduleItems.map((item) => {
            return {
                code: item.code,
                name: item.name
            };
        }),
        itemClick(item) {
            if (navManager.activeItem === item) return;
            navManager.activeItem = item;
            $state.go(item.code);
        }
    };

    $scope.headView = headManager;
    $scope.navView = navManager;
});
