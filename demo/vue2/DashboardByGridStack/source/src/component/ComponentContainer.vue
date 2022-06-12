<script>
import Vue from "vue";
import { getDataType } from "../utils/common.js";
export default {
  name: "ComponentContainer",
  props: {
    tpl: {
      type: String
    },
    bindData: {
      type: Object
    }
  },
  data() {
    var tempData = {};
    if (
      getDataType(this.bindData) === "object" &&
      getDataType(this.bindData.data) === "object"
    ) {
      for (var key in this.bindData.data) {
        if (this.bindData.data.hasOwnProperty(key)) {
          tempData[key] = this.bindData.data[key];
        }
      }
    }
    return tempData;
  },
  methods: {},
  render: function(h, context) {
    var res = Vue.compile(this.tpl ? this.tpl : "<div>你没有设置模板</div>");
    return res.render.call(this);
  },
  beforeCreate() {},
  created() {
    if (
      getDataType(this.bindData) === "object" &&
      getDataType(this.bindData.methods) === "object"
    ) {
      for (var key in this.bindData.methods) {
        if (this.bindData.methods.hasOwnProperty(key)) {
          if (getDataType(this.bindData.methods[key]) === "function") {
            this[key] = this.bindData.methods[key].bind(this);
          }
        }
      }
    }
    if (getDataType(this.createdFn) === "function") {
      this.createdFn();
    }
  },
  beforeMount() {
    if (getDataType(this.beforeMountFn) === "function") {
      this.beforeMountFn();
    }
  },
  mounted() {
    if (getDataType(this.mountedFn) === "function") {
      this.mountedFn();
    }
  },
  beforeUpdate() {
    if (getDataType(this.beforeUpdateFn) === "function") {
      this.beforeUpdateFn();
    }
  },
  updated() {
    if (getDataType(this.updatedFn) === "function") {
      this.updatedFn();
    }
  },
  beforeDestroy() {
    if (getDataType(this.beforeDestroyFn) === "function") {
      this.beforeDestroyFn();
    }
  },
  destroyed() {
    if (getDataType(this.destroyedFn) === "function") {
      this.destroyedFn();
    }
  }
};
</script>