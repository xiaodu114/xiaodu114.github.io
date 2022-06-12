(function(window) {
    define(function() {
        return {
            loadedFormCofig(vueIntance, OtherParameters) {
                return new Promise((resolve, reject) => {
                    resolve({
                        itemTpl: `
                        <div class="list-item-container">
                            <div class="title">
                                {{this.item.title}}
                            </div>
                            <div class="subtitle">
                                <div class="left">
                                    <div class="item-label">{{this.formConfig['1548245360016'].label.text}}：</div>
                                    <div class="item-value">{{this.item['1548245360016']}}</div>
                                </div>
                                <div class="right">
                                    <div class="item-label">{{this.formConfig['1548245360017'].label.text}}：</div>
                                    <div class="item-value">{{this.item['1548245360017']}}</div>
                                </div>
                            </div>
                            <div class="subtitle">
                                <div class="left">
                                    <div class="item-label">创建人：</div>
                                    <div class="item-value">{{this.item.createUserName}}</div>
                                </div>
                                <div class="right">
                                    <div class="item-label">{{this.formConfig['1548245360018'].label.text}}：</div>
                                    <div class="item-value">{{this.item['1548245360018']}}</div>
                                </div>
                            </div>
                        </div>
                        `
                    });
                });
            }
        }
    })
})(window);