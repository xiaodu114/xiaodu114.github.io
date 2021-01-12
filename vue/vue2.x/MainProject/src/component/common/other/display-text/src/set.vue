<template>
    <div class="display-text-set-container">
        <formiteminneruse :show-label="1 === 1">
            <template #label> 文本值 </template>
            <template #default>
                <input
                    type="text"
                    v-model="config.value"
                >
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                display类型
            </template>
            <template #default>
                <optioninneruse
                    :attr-value.sync="config.uStyle.display"
                    :options="['none','block','inline','inline-block','list-item','run-in','table','inline-table','table-row-group','table-header-group','table-footer-group','table-row','table-column-group','table-column','table-cell','table-caption','inherit']"
                ></optioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                文本行进方向
            </template>
            <template #default>
                <optioninneruse
                    :attr-value.sync="config.uStyle.writingMode"
                    :options="['horizontal-tb','vertical-rl','vertical-lr','sideways-rl','sideways-lr','inherit','initial','unset']"
                ></optioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                高度
            </template>
            <template #default>
                <numberunitinneruse :attr-value.sync="config.uStyle.height"></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                宽度
            </template>
            <template #default>
                <numberunitinneruse :attr-value.sync="config.uStyle.width"></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                字体大小
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.fontSize"
                    :default-values="[]"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                行高
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.lineHeight"
                    :unitRequire="false"
                    :default-values="['inherit','initial','normal','revert','unset']"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                字体粗细
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.fontWeight"
                    :unitRequire="false"
                    :default-values="['bold','bolder','inherit','initial','lighter','normal','revert','unset']"
                    :units="[]"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                修饰线外观
            </template>
            <template #default>
                <optioninneruse
                    :attr-value.sync="config.uStyle.textDecoration"
                    :options="['none','underline','line-through','overline']"
                ></optioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                行内内容对齐
            </template>
            <template #default>
                <optioninneruse
                    :attr-value.sync="config.uStyle.textAlign"
                    :options="['left','right','center','justify','justify-all','start','end','match-parent','inherit','initial','unset']"
                ></optioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                垂直对齐方式
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.verticalAlign"
                    :unitRequire="false"
                    :default-values="['baseline','sub','super','text-top','text-bottom','middle','top','bottom']"
                    :units="['px','pt','em','%']"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                单词间距
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.wordSpacing"
                    :units="['px','em']"
                    :default-values="['normal','inherit']"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                文本字符间距
            </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.letterSpacing"
                    :units="['px','em']"
                    :default-values="['normal','inherit','initial','unset']"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1 === 1">
            <template #label> 首行文本缩进 </template>
            <template #default>
                <numberunitinneruse
                    :attr-value.sync="config.uStyle.textIndent"
                    :units="['mm', 'px', '%', 'em']"
                    :default-values="['inherit', 'initial', 'unset']"
                ></numberunitinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1===1">
            <template #label>
                单词内断行
            </template>
            <template #default>
                <optioninneruse
                    :attr-value.sync="config.uStyle.wordBreak"
                    :options="['normal','break-all','keep-all','break-word','inherit','initial','unset']"
                ></optioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1 === 1">
            <template #label> 外边距 </template>
            <template #default>
                <fourdirectioninneruse
                    :all-attr.sync="config.uStyle.margin"
                    :top-attr.sync="config.uStyle.marginTop"
                    :right-attr.sync="config.uStyle.marginRight"
                    :bottom-attr.sync="config.uStyle.marginBottom"
                    :left-attr.sync="config.uStyle.marginLeft"
                    :units="['pt', 'px','%', 'em']"
                    :default-values="['auto','0','inherit', 'initial', 'unset']"
                ></fourdirectioninneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1 === 1">
            <template #label> 边框 </template>
            <template #default>
                <borderinneruse
                    :all-border.sync="config.uStyle.border"
                    :top-border.sync="config.uStyle.borderTop"
                    :right-border.sync="config.uStyle.borderRight"
                    :bottom-border.sync="config.uStyle.borderBottom"
                    :left-border.sync="config.uStyle.borderLeft"
                ></borderinneruse>
            </template>
        </formiteminneruse>
        <formiteminneruse :show-label="1 === 1">
            <template #label> 内边距 </template>
            <template #default>
                <fourdirectioninneruse
                    :all-attr.sync="config.uStyle.padding"
                    :top-attr.sync="config.uStyle.paddingTop"
                    :right-attr.sync="config.uStyle.paddingRight"
                    :bottom-attr.sync="config.uStyle.paddingBottom"
                    :left-attr.sync="config.uStyle.paddingLeft"
                    :units="['pt', 'px','%', 'em','cm']"
                    :default-values="['0','inherit', 'initial', 'unset']"
                ></fourdirectioninneruse>
            </template>
        </formiteminneruse>
    </div>
</template>
<script>
import formiteminneruse from "../../../form/form-item/index.js";
import numberunitinneruse from "../../../style/number-unit/index.js";
import optioninneruse from "../../../style/option/index.js";
import borderinneruse from "../../../style/border/index.js";
import fourdirectioninneruse from "../../../style/four-direction/index.js";
export default {
    name: "DisplayTextSet",
    props: {
        config: {
            type: Object,
        },
    },
    components: {
        formiteminneruse,
        numberunitinneruse,
        optioninneruse,
        borderinneruse,
        fourdirectioninneruse,
    },
};
</script>
<style lang="less">
.display-text-set-container {
    height: 100%;
    overflow: auto;
}
</style>