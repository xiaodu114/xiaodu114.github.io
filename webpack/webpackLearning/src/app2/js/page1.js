import '../../common/css/common.less';
import '../css/page1.less';

import Vue from "vue";
import app2page1 from '../component/page1.vue';
import displaytext from '../../component/DisplayText.vue';

import * as utils from '../../common/js/utils.js';

var app2page1VueInstance = new Vue({
    el: "#app2page1Vue",
    data() {
        return {
            msg: "应用2-》页面1",
            dateNow: utils.dateExtend_Format(new Date(), "ddd dddd ttHH:mm:ss.SSS")
        }
    },
    components: {
        app2page1,
        displaytext
    }
});