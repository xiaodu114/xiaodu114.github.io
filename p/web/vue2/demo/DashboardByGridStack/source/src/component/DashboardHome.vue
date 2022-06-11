<template>
  <div class="dashboardhome-container">
    <template v-if="isDesignModel">
      <div class="designmodel-header">
        <select
          v-model="layoutDataType"
          @change="chooseLayoutDataType"
        >
          <option value="./json/layout-order.json">有序</option>
          <option value="./json/layout-random.json">任意</option>
          <option value="./json/layout-one.json">单个</option>
        </select>
        <span>
          <button
            type="button"
            @click="toggleLayoutSelfAdaption"
          >{{isLayoutSelfAdaption?"实际高度":"启用自适应(预览下起作用)"}}</button>
        </span>
        <button
          type="button"
          class="btn btn-default"
          @click="addItemTest"
        >新增一个节点</button>
        <button
          type="button"
          class="btn btn-default"
          @click="sendBroadcastFn1"
        >广播测试</button>
        <span>
          <button
            type="button"
            class="btn btn-default"
            @click="setInstanceToggleStaticGrid"
          >{{isStaticGrid?"启用拖拽缩放":"禁止拖拽缩放"}}</button>
        </span>
        <span>
          <button
            type="button"
            class="btn btn-default"
            @click="getCurrentLayoutConfigFn"
          >获取布局配置</button>
        </span>
        <span>
          <button
            type="button"
            @click="toggleModelType"
          >进入预览模式</button>
        </span>
        <span>
          <label for="">
            部件间距(预览起作用)
            <input
              type="number"
              v-model.number.lazy="partsGap"
            >
          </label>
        </span>
        <span>
          <a
            href="https://github.com/airbnb/javascript"
            target="_blank"
          >airbnb</a>
        </span>
      </div>
      <div class="designmodel-content">
        <gsc
          v-if="showItems.length"
          :show-items="showItems"
          :parts-gap="partsGap"
          @GridStackLayoutChange="gridStackLayoutChangeFn"
          ref="myGridStackContainerRef"
        >
          <template #default="{item,index}">
            <div class="custom-operate-region">
              <span>
                <i
                  class="fa fa-cog"
                  aria-hidden="true"
                  @click="settingOneItem(item,index)"
                ></i>
                <i
                  class="fa fa-trash-o"
                  aria-hidden="true"
                  @click="deleteOneItem(item,index)"
                ></i>
              </span>
            </div>
          </template>
        </gsc>
      </div>
    </template>
    <template v-else>
      <div class="runtimemodel-header">
        <button
          type="button"
          @click="toggleModelType"
        >进入设计模式</button>
      </div>
      <gbc
        class="runtimemodel-content"
        v-if="showItems.length"
        :class="{selfadaption:isLayoutSelfAdaption}"
        :show-items="showItems"
        :parts-gap="partsGap"
      ></gbc>
    </template>
  </div>
</template>
<script>
import gsc from "./GridStackContainer.vue";
import gbc from "./GridBoxContainer.vue";
import {
  GridStackItemModel,
  GridStackItemLayoutModel
} from "../utils/model.js";
import { getGUID } from "../utils/common.js";
export default {
  name: "DashboardHome",
  data() {
    return {
      layoutDataType: "./json/layout-order.json",
      showItems: [],
      isDesignModel: false,
      isLayoutSelfAdaption: false,
      isStaticGrid: false,
      partsGap: 20
    };
  },
  components: {
    gsc,
    gbc
  },
  methods: {
    chooseLayoutDataType() {
      this.showItems = [];
      this.getLayoutConfig(this.layoutDataType);
    },
    toggleLayoutSelfAdaption() {
      this.isLayoutSelfAdaption = !this.isLayoutSelfAdaption;
    },
    toggleModelType() {
      this.isDesignModel = !this.isDesignModel;
    },
    setInstanceToggleStaticGrid() {
      this.isStaticGrid = !this.isStaticGrid;
      this.$refs.myGridStackContainerRef.toggleStaticGrid(this.isStaticGrid);
    },
    sendBroadcastFn1() {
      if (GlobalEventBus) {
        GlobalEventBus.$emit("mainpage-broadcast-event-01", {
          msg: "现在时间" + new Date().Format("yyyy-MM-dd hh:mm:ss:S")
        });
      }
    },
    addItemTest() {
      var tmpNode = new GridStackItemModel({
        id: getGUID(),
        type: "html",
        gridstack: new GridStackItemLayoutModel({
          x: 0,
          y: 0,
          width: 3,
          height: 3
        }),
        url: "./htmlSnippets/amd1/amd1.html",
        js: "./htmlSnippets/amd1/amd1.js"
      });
      this.$refs.myGridStackContainerRef.initLayoutNodePosition([tmpNode]);
      this.showItems.push(tmpNode);
    },
    deleteOneItem(item, index) {
      if (index >= 0 && index < this.showItems.length) {
        this.showItems.splice(index, 1);
        this.$refs.myGridStackContainerRef.gridstackInstance.removeWidget(
          this.$refs.myGridStackContainerRef.$el.querySelector(
            `[data-gs-id='${item.id}']`
          )
        );
      }
    },
    settingOneItem(item, index) {
      alert("打开该部件的设置页面");
    },
    getCurrentLayoutConfigFn() {
      var tempNewItems = this.$refs.myGridStackContainerRef.getCurrentLayoutConfig();
      console.table(tempNewItems);
    },
    gridStackLayoutChangeFn(changeItems) {
      //每个节点的位置或者大小改变之后的回调函数
      console.table(changeItems);
    },
    // 分界线**************************************************
    handleLayoutConfig(config) {
      var tempHtmlSnippetsItems = [];
      if (Array.isArray(config) && config.length) {
        [].map.call(config, mapItem => {
          tempHtmlSnippetsItems.push(new GridStackItemModel(mapItem));
        });
      }
      this.showItems = tempHtmlSnippetsItems;
    },
    getLayoutConfig(path) {
      fetch(path)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          this.handleLayoutConfig(data);
        });
    }
  },
  created() {
    this.getLayoutConfig(this.layoutDataType);
    this.$watch("partsGap", (newValue, oldValue) => {
      this.$refs.myGridStackContainerRef.setVerticalMargin(newValue);
    });
  }
};
</script>
<style lang="less" scoped>
.dashboardhome-container {
  height: 100%;
  width: 100%;
  padding: 15px;
  background: #eeeded;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  > .designmodel-header {
    flex-shrink: 0;
  }
  > .designmodel-content {
    flex: 1;
    overflow-y: auto;
    > .grid-stack {
      > .grid-stack-item {
        > .grid-stack-item-content {
          > .custom-operate-region {
            display: none;
            position: absolute;
            width: 100%;
            height: 32px;
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            align-items: center;
            flex-direction: row-reverse;
            > span {
              display: inline-flex;
              > i {
                margin-right: 10px;
                cursor: pointer;
              }
            }
          }
        }
        &:hover {
          > .grid-stack-item-content {
            > .custom-operate-region {
              display: flex;
            }
          }
        }
      }
    }
  }
  > .runtimemodel-header {
    flex-shrink: 0;
  }
  > .runtimemodel-content {
    flex: 1;
    overflow-y: auto;
    &.selfadaption {
      grid-auto-rows: auto;
      overflow: hidden;
    }
  }
}
</style>