export default {
    loadedFormCofig() {
        // 维护记录 二次开发JS
        return new Promise((resolve, reject) => {
            resolve({
                tplConfig: {
                    body: {
                        listItemView: { //列表项展示配置
                            type: "component", // default|html|component
                            componentConfig: { // 如果“type”是component类型时使用该配置
                                //name: "list-item-view", // 组件名称可以为空，默认为“user-custom-item-view”
                                option: {
                                    data: function() {
                                        return {
                                            customTitle: "(这里注册了一个新的列表项组件)"
                                        }
                                    },
                                    methods: {
                                        btn1Click: function(item) {
                                            alert("主键ID：" + this.item.id + "您点击的是按钮1");
                                        },
                                        btn2Click: function() {
                                            alert("主键ID：" + this.item.id + "您点击的是按钮2");
                                        }
                                    },
                                    template: `
                                        <div class="list-item-container">
                                            <div class="title">
                                                {{this.item.title}}
                                                <span>{{this.customTitle}}</span>
                                            </div>
                                            <div class="subtitle">
                                                <div class="left">
                                                    <div class="item-label">{{this.formConfig['1557302039598'].label.text}}：</div>
                                                    <div class="item-value">{{this.item['1557302039598']}}</div>
                                                </div>
                                                <div class="right">
                                                    <div class="item-label">{{this.formConfig['1557302039599'].label.text}}：</div>
                                                    <div class="item-value">{{this.item['1557302039599']}}</div>
                                                </div>
                                            </div>
                                            <div class="subtitle">
                                                 <div class="left">
                                                    <button type="button" @click="btn1Click();">按钮1</button>
                                                </div>
                                                <div class="right">
                                                    <button type="button" @click="btn2Click();">按钮2</button>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }
                            }
                        }
                    }
                }
            });
        });
    }
}