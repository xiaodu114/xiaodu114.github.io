import '../../common/css/common.less';
import '../css/page1.less';

import Vue from "vue";
import app1page1 from '../component/page1.vue';
import displaytext from '../../component/DisplayText.vue';

import * as utils from '../../common/js/utils.js';

var app1page1Vue = new Vue({
    el: "#app1page1",
    data() {
        return {
            msg: "应用1-》页面1",
            musics: ["偏偏喜欢你", "祈祷"],
            jsonContent: null,
            dateNow: utils.dateExtend_Format(new Date(), "yyyy-MM-dd tthh:mm:ss")
        }
    },
    components: {
        app1page1,
        displaytext
    },
    methods: {
        async loadJSONFile(url) {
            let response = await fetch(url);
            return await response.json();
        },
        async asyncFn1() {
            return await Promise.resolve("123");
        }
    },
    created() {
        let ishas1 = this.musics.includes("祈祷");
        let ishas2 = this.musics.includes("片片枫叶情");
        Promise.resolve(true).then(responseData => {
            console.log(responseData);
        });
        this.asyncFn1().then(responseData => {
            console.log(responseData);
        });
        this.loadJSONFile("/mock/app1/page1.json").then(responseData => {
            this.jsonContent = responseData;
        });
    },
});