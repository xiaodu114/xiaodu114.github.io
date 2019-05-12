export default {
    loadedFormCofig() {
        // 出车记录 二次开发JS
        return new Promise((resolve, reject) => {
            var retObj = {
                tplConfig: {
                    body: {
                        listItemView: { //列表项展示配置
                            type: "html", // default|html|component
                            htmlConfig: { // 如果“type”是html类型时使用该配置
                                isNeedItemClick: false,
                                tpl: null,
                                bindData: {
                                    customTitle: "（来自HTML文件，你可以点击我哦）",
                                    customTitleClickFn: function() {
                                        alert("我来自自定义的点击事件🙂🙂🙂,要做什么事情你自己决定");
                                    }
                                }
                            }
                        }
                    }
                }
            };
            fetch("./TwoDev/DispatchRecord/DispatchRecord-html.html").then((response) => {
                if (response.ok) {
                    return response.text();
                }
            }).then((data) => {
                if (data) {
                    var tempDiv = document.createElement("div");
                    tempDiv.innerHTML = data;
                    var tempTemplateDomStr = "";
                    var tempStyleStr = "";
                    if (tempDiv.children.length) {
                        [].map.call(tempDiv.children, (tempDivCh) => {
                            if (tempDivCh.tagName === "TEMPLATE") {
                                tempTemplateDomStr = tempDivCh.innerHTML;
                            }
                            if (tempDivCh.tagName === "STYLE") {
                                tempStyleStr = tempDivCh.innerHTML;
                            }
                        });
                    }
                    if (tempTemplateDomStr) {
                        retObj.tplConfig.body.listItemView.htmlConfig.tpl = tempTemplateDomStr;
                    }
                    if (tempStyleStr) {
                        var tempStyleElement = document.createElement("style");
                        tempStyleElement.type = "text/css";
                        tempStyleElement.innerHTML = tempStyleStr;
                        document.getElementsByTagName("head")[0].appendChild(tempStyleElement);
                    }
                }
                resolve(retObj);
            });
        });
    }
}