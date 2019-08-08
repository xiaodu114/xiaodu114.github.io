<template>
  <div class="grid-stack">
    <div
      class="grid-stack-item"
      v-for="(item,index) in showItems"
      :key="item.id"
      :data-gs-id="item.id"
      :data-gs-x="item.gridstack.x"
      :data-gs-y="item.gridstack.y"
      :data-gs-width="item.gridstack.width"
      :data-gs-height="item.gridstack.height"
    >
      <div class="grid-stack-item-content">
        <slot
          v-bind:item="item"
          v-bind:index="index"
        ></slot>
        <component-transform :item="item"></component-transform>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataType } from "../utils/common.js";
import {
  GridStackItemModel,
  GridStackItemLayoutModel
} from "../utils/model.js";
export default {
  name: "GridStackContainer",
  props: {
    showItems: {
      type: Array,
      default: []
    },
    contextInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    acceptSelector: {
      type: String,
      default: ".drag-to-grid-stack-item"
    },
    partsGap: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      gridstackInstance: null
    };
  },
  components: {},
  computed: {},
  methods: {
    // 外部可以调用的代码 开始
    toggleStaticGrid(staticValue) {
      this.gridstackInstance.setStatic(staticValue);
    },
    setVerticalMargin(value) {
      this.gridstackInstance.verticalMargin(value);
    },
    getCurrentLayoutConfig() {
      var tempRetItems = [];
      if (
        this.gridstackInstance.grid &&
        Array.isArray(this.gridstackInstance.grid.nodes) &&
        this.gridstackInstance.grid.nodes.length
      ) {
        [].map.call(this.gridstackInstance.grid.nodes, item => {
          tempRetItems.push(
            new GridStackItemModel({
              id: item.id,
              gridstack: new GridStackItemLayoutModel({
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height
              })
            })
          );
        });
      }
      return tempRetItems;
    },
    // 外部可以调用的代码 结束
    addChangeEventForIntance() {
      // 只处理item位置和大小的改变，新增和删除不在这里处理
      $(this.$el).on("change", (event, items) => {
        if (!(Array.isArray(items) && items.length)) return;
        var changeItems = [];
        for (let index = 0; index < items.length; index++) {
          const element = items[index];
          var tempOldItem = this.showItems.find(x => x.id === element.id);
          if (!tempOldItem) continue;
          var isChanged = false;
          ["x", "y", "width", "height"].map(key => {
            if (
              Object.hasOwnProperty.call(element, key) &&
              tempOldItem.gridstack[key] !== element[key]
            ) {
              isChanged = true;
              tempOldItem.gridstack[key] = element[key];
            }
          });
          if (isChanged) {
            changeItems.push(tempOldItem);
          }
        }
        if (changeItems.length) {
          this.$emit("GridStackLayoutChange", changeItems);
        }
      });
    },
    initGridStack() {
      $(() => {
        $(this.$el).gridstack({
          acceptWidgets: this.acceptSelector,
          alwaysShowResizeHandle: true,
          width: 12,
          verticalMargin: this.partsGap,
          disableOneColumnMode: true // 禁用单列模式
        });
        this.gridstackInstance = $(this.$el).data("gridstack");
        this.addChangeEventForIntance();
      });
    }
  },
  beforeCreate() {
    if (!$) {
      console.log("本组件依赖Jquery");
      return false;
    }
  },
  created() {
    this.initGridStack();
  },
  beforeUpdate() {
    //暂时在这个里处理，新增一个item之后不能拖动的问题
    if (
      this.gridstackInstance.grid &&
      Array.isArray(this.gridstackInstance.grid.nodes)
    ) {
      var noGridStackItemIndexs = [];
      [].map.call(this.showItems, (item, itemIndex) => {
        var tempIndex = this.gridstackInstance.grid.nodes.findIndex(
          node => item.id === node.id
        );
        if (tempIndex < 0) {
          noGridStackItemIndexs.push(itemIndex);
        }
      });
      if (noGridStackItemIndexs.length) {
        this.$nextTick(() => {
          noGridStackItemIndexs.map(index => {
            this.gridstackInstance.makeWidget(
              $(
                this.$el.querySelector(
                  `[data-gs-id='${this.showItems[index].id}']`
                )
              )
            );
          });
        });
      }
    }
  },
  destroyed() {
    $(this.$el).unbind("change");
  }
};
</script>
<style lang="less">
.grid-stack-item {
  > .grid-stack-item-content {
    background: #fff;
    cursor: move;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    overflow: hidden !important;
    &:hover,
    &:focus,
    &:active {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
}
</style>