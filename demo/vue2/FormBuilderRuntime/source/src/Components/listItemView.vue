

<script>
import Vue from "vue";
export default {
    name: "listItemView",
    props: {
        item: {
            // 实例数据
            type: Object,
            required: true
        },
        formConfig: {
            // 表单配置
            type: Object,
            required: true
        },
        tpl: {
            // 列表项模板
            type: String
        },
        bindData: {
            // 绑定到this
            type: Object
        }
    },
    data() {
        return {};
    },
    methods: {
        bindDataToThis(bindData) {
            for (var key in bindData) {
                if (bindData.hasOwnProperty(key)) {
                    //暂时使用直接赋值（1、注意引用 2、覆盖原来的值）
                    this[key] = bindData[key];
                }
            }
        }
    },
    render: function (h, context) {
        this.bindDataToThis(this.bindData);
        var strDomTree = "";
        if (this.tpl) {
            strDomTree = this.tpl;
        } else {
            strDomTree = `
      <div class="list-item-container">
          <div class="title">
            {{this.item.title}}（默认模板）
          </div>
          <div class="subtitle">
            <div class="left">
              <div class="item-label">创建人：</div>
              <div class="item-value">{{this.item.createUserName}}</div>
            </div>
            <div class="right">
              <div class="item-label">创建时间：</div>
              <div class="item-value">{{this.item.createDate}}</div>
            </div>
          </div>
        </div>`;
        }
        var res = Vue.compile(strDomTree);
        return res.render.call(this);
    }
};
</script>

