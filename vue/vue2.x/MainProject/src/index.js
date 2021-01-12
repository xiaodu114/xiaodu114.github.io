import Vue from "vue";
import AppHome from './component/AppHome.vue';

var myVueApp = new Vue({
    el: "#vue2xMainProject",
    render: h => h(AppHome)
});