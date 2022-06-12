<template>
    <component v-if="isShowContent && item.type === 'vue'" :is="currentCompName" v-bind="item.props"></component>
    <iframe v-else-if="isShowContent && item.type === 'iframe'" :src="item.url" frameborder="0"
        style="width: 100%; height: 100%;"></iframe>
    <cc v-else-if="isShowContent && item.type === 'html'" :bind-data="bindData" :tpl="tpl"></cc>
</template>
<script>
import Vue from "vue";
import cc from "./ComponentContainer.vue";
import {
    getGUID,
    getDataType,
    analysisFileText,
    addStyleTagToHead
} from "../utils/common.js";
import { fetchText } from "../utils/fetch-extend.js";
import { strES6DefaultModuleInterpreter } from "../utils/babel-extend.js";
import { GridStackItemModel } from "../utils/model.js";
export default {
    name: "ComponentTransform",
    props: {
        item: {
            type: GridStackItemModel,
            required: true
        }
    },
    data() {
        return {
            bindData: null,
            tpl: null,
            currentCompName: "",
            isShowContent: false
        };
    },
    components: {
        cc
    },
    methods: {
        async handleHtmlSnippetsType() {
            // 其实这种类型也是可以注册成组件的，并且最好注册成组件
            //    Vue.compile 这个方法太容易报错了，这里还在使用只是为了说明还有这一种实现方式
            var htmlText = await fetchText(this.item.url);
            var htmlObj = analysisFileText(htmlText);
            if (htmlObj.template.text) {
                this.tpl = htmlObj.template.text;
            }
            if (
                htmlObj.style.text &&
                (getDataType(htmlObj.style.attrObj.lang) === "undefined" ||
                    htmlObj.style.attrObj.lang === "css")
            ) {
                addStyleTagToHead(htmlObj.style.text);
            }
            var jsObj = await window.SystemJS.import(this.item.js);
            this.bindData = jsObj.default || jsObj || {};
        },
        async handleVueFileType() {
            var fileText = await fetchText(this.item.url);
            var fileObj = analysisFileText(fileText),
                tempComponentOption = {};
            if (fileObj.template.text) {
                tempComponentOption.template = fileObj.template.text;
            }
            if (fileObj.script.text) {
                var tempJSObj = null;
                if (Babel && getDataType(Babel.transform) === "function") {
                    tempJSObj = strES6DefaultModuleInterpreter(fileObj.script.text);
                } else {
                    tempJSObj = new Function(
                        "return " +
                        fileObj.script.text.substr(fileObj.script.text.indexOf("{"))
                    )();
                }
                if (getDataType(tempJSObj) !== "object") tempJSObj = {};
                tempJSObj.props = Object.assign(tempJSObj.props || {}, {
                    extendData: {
                        type: Object
                    },
                    contextInfo: {
                        type: Object
                    }
                });
                tempComponentOption = Object.assign(tempJSObj, tempComponentOption);
            }
            this.currentCompName = "random-" + getGUID();
            Vue.component(this.currentCompName, tempComponentOption);
            if (
                fileObj.style.text &&
                (getDataType(fileObj.style.attrObj.lang) === "undefined" ||
                    fileObj.style.attrObj.lang === "css")
            ) {
                addStyleTagToHead(fileObj.style.text);
            }
        },
        async getContent() {
            if (this.item.type === "html") {
                await this.handleHtmlSnippetsType();
            } else if (this.item.type === "vue") {
                await this.handleVueFileType();
            }
            this.isShowContent = true;
        }
    },
    created() {
        this.getContent();
    }
};
</script>