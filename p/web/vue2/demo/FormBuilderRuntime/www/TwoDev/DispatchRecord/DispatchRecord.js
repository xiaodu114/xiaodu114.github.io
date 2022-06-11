export default {
    loadedFormCofig() {
        // 出车记录 二次开发JS
        return new Promise((resolve, reject) => {
            resolve({
                tplConfig: {
                    body: {
                        listItemView: { //列表项展示配置
                            type: "html", // default|html|component
                            htmlConfig: { // 如果“type”是html类型时使用该配置
                                isNeedItemClick: true,
                                tpl: `
                                <div class="list-item-container">
                                    <div class="title">
                                        {{this.item.title}}
                                        <span>{{this.customTitle}}</span>
                                    </div>
                                    <div class="subtitle">
                                        <div class="left">
                                            <div class="item-label">{{this.formConfig['1557302467936'].label.text}}：</div>
                                            <div class="item-value">{{this.item['1557302467936']}}</div>
                                        </div>
                                        <div class="right">
                                            <div class="item-label">{{this.formConfig['1557302467937'].label.text}}：</div>
                                            <div class="item-value">{{this.item['1557302467937']}}</div>
                                        </div>
                                    </div>
                                    <div class="subtitle">
                                        <div class="right">
                                            <div class="item-label">{{this.formConfig['1557302467938'].label.text}}：</div>
                                            <div class="item-value">{{this.item['1557302467938']}}</div>
                                        </div>
                                    </div>
                                </div>
                                `,
                                bindData: {
                                    customTitle: "（HTML模板-写在JS文件中）"
                                }
                            }
                        }
                    }
                }
            });
        });
    }
}