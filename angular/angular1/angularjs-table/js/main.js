var app = angular.module('myApp', []);
app.directive("ddzTable", function($timeout, $document) {
    return {
        restrict: "A",
        replace: true,
        templateUrl: './tpl/tableTpl.html',
        scope: {
            config: "="
        },
        link: function(scope, element, attrs) {
            var defaultConfig = {
                data: [],
                header: {
                    style: "",
                    class: ""
                },
                body: {
                    style: "",
                    class: "",
                    trStyle: "",
                    trClass: ""
                },
                columns: [{
                    thText: "",
                    thTpl: '',
                    thStyle: "",
                    thClass: "",
                    tdIndex: "",
                    tdTpl: '',
                    tdStyle: "",
                    tdClass: ""
                }],
                scroll: {
                    slideToBottom: null,
                    slideToRight: null,
                }
            };
            //scope.config= Object.assign(defaultConfig, scope.config);
            element[0].querySelector(".scroll-body").addEventListener("scroll", function() {
                var tableHeaderDom = element[0].querySelector(".scroll-header");
                tableHeaderDom.style.transform = `translateX(${-this.scrollLeft}px)`;
            });
        }
    }
});
app.directive('ddzTableReplace', function() {
    //参考网址：https://stackoverflow.com/questions/16496647/replace-ng-include-node-with-template
    return {
        require: 'ngInclude',
        restrict: 'A',
        /* optional */
        link: function(scope, el, attrs) {
            el.replaceWith(el.children());
        }
    }
});
