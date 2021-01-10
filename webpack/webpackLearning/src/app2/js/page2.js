import '../../common/css/common.less';
import '../css/page2.less';

import Vue from "vue";
import app2page2 from '../component/page2.vue';
import displaytext from '../../component/DisplayText.vue';

import * as utils from '../../common/js/utils.js';

var app2page2VueInstance = new Vue({
    el: "#app2page2Vue",
    data() {
        return {
            msg: "应用2-》页面2",
            dateNow: utils.dateExtend_Format(new Date(), "yyyy-MM-dd HH:mm:ss.fff ww qq")
        }
    },
    components: {
        app2page2,
        displaytext
    }
});