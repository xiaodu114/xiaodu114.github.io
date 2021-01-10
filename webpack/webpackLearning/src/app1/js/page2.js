import '../../common/css/common.less';
import '../css/page2.less';

import Vue from "vue";
import app1page2 from '../component/page2.vue';
import displaytext from '../../component/DisplayText.vue';

import * as utils from '../../common/js/utils.js';

var app1page2Vue = new Vue({
    el: "#app1page2",
    data() {
        return {
            msg: "应用1-》页面2",
            dateNow: utils.dateExtend_Format(new Date(), "yyyy-MM-dd ww qq")
        }
    },
    components: {
        app1page2,
        displaytext
    }
});