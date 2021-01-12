<template>
  <ul
    class="single-stage-float-menu"
    :style="extendStyle"
  >
    <li
      v-for="(item,index) in showItems"
      :key="index"
    >
      <div v-if="item.type==='divider'">我是分割线</div>
      <div
        v-else-if="item.type==='item'"
        @click="itemClickFn(item,$event)"
      >{{item.text}}</div>
    </li>
  </ul>
</template>
<script>
/**
 *  【介绍】
 *      单级悬浮菜单。
 *      未实现的功能：
 *          1、支持不同的类型（例如分割线）
 *          2、支持图标
 *          3、支持滚动条/移动
 *  【参考】
 *      1、整体参考 http://demo.jb51.net/js/2017/jQuery_sbyjdjcd/
 *      2、本组件中的获取docment的高度和宽度参考$(document).height()和$(document).width()
 *  【注意点】
 *      1、getBoundingClientRect getClientRects clientWidth offsetWidth scrollWidth 这几个概念的不同
 *          1.1、https://www.cnblogs.com/TAO-JL/p/9575430.html
 *          1.2、https://blog.csdn.net/shmjiao/article/details/89018687
 */
export default {
  name: "SingleStageFloatMenu",
  props: {
    showItems: {
      type: Array,
      default() {
        return [];
      }
    },
    eventname: {
      type: String,
      default: "item-click"
    },
    pos: {
      type: Object,
      default() {
        return {
          margin: 10,
          pageX: 10,
          pageY: 10
        };
      }
    },
    priority: {
      type: Array,
      default() {
        return ["RightBottom", "RightTop", "LeftTop", "LeftBottom"];
      }
    }
  },
  data() {
    return {
      extendStyle: null
    };
  },
  methods: {
    itemClickFn(item, event) {
      this.$emit(this.eventname, item, event);
    },
    calculatePos() {
      var winWidth = Math.max(
        document.body["scrollWidth"],
        document.documentElement["scrollWidth"],
        document.body["offsetWidth"],
        document.documentElement["offsetWidth"],
        document.documentElement["clientWidth"]
      );
      var winHeight = Math.max(
        document.body["scrollHeight"],
        document.documentElement["scrollHeight"],
        document.body["offsetHeight"],
        document.documentElement["offsetHeight"],
        document.documentElement["clientHeight"]
      );
      var menuWidth = this.$el.offsetWidth,
        securityMenuWidth = menuWidth + 2 * this.pos.margin;
      var menuHeight = this.$el.offsetHeight,
        securityMenuHeight = menuHeight + 2 * this.pos.margin;

      var posInitConfig = {
        RightBottom: {
          area: {
            width: winWidth - this.pos.pageX,
            height: winHeight - this.pos.pageY
          },
          getPos1: () => {
            return {
              left: this.pos.pageX + this.pos.margin + "px",
              top: this.pos.pageY + this.pos.margin + "px"
            };
          },
          getPos2: () => {
            return {
              left: this.pos.pageX + this.pos.margin + "px",
              top: winHeight - securityMenuHeight + "px"
            };
          }
        },
        RightTop: {
          area: {
            width: winWidth - this.pos.pageX,
            height: this.pos.pageY
          },
          getPos1: () => {
            return {
              left: this.pos.pageX + this.pos.margin + "px",
              top: this.pos.pageY - menuHeight - this.pos.margin + "px"
            };
          },
          getPos2: () => {
            return {
              left: this.pos.pageX + this.pos.margin + "px",
              top: this.pos.margin + "px"
            };
          }
        },
        LeftTop: {
          area: {
            width: this.pos.pageX,
            height: this.pos.pageY
          },
          getPos1: () => {
            return {
              left: this.pos.pageX - menuWidth - this.pos.margin + "px",
              top: this.pos.pageY - menuHeight - this.pos.margin + "px"
            };
          },
          getPos2: () => {
            return {
              left: this.pos.pageX - menuWidth - this.pos.margin + "px",
              top: this.pos.margin + "px"
            };
          }
        },
        LeftBottom: {
          area: {
            width: this.pos.pageX,
            height: winHeight - this.pos.pageY
          },
          getPos1: () => {
            return {
              left: this.pos.pageX - menuWidth - this.pos.margin + "px",
              top: this.pos.pageY + this.pos.margin + "px"
            };
          },
          getPos2: () => {
            return {
              left: this.pos.pageX - menuWidth - this.pos.margin + "px",
              top: winHeight - securityMenuHeight + "px"
            };
          }
        }
      };
      var retPosObj = null;
      //
      for (let index = 0; index < this.priority.length; index++) {
        const tempPosition = this.priority[index];
        if (
          posInitConfig[tempPosition] &&
          posInitConfig[tempPosition].area.width > securityMenuWidth &&
          posInitConfig[tempPosition].area.height > securityMenuHeight
        ) {
          retPosObj = posInitConfig[tempPosition].getPos1();
          break;
        }
      }
      if (retPosObj === null) {
        if (winHeight > securityMenuHeight) {
          for (let index = 0; index < this.priority.length; index++) {
            const tempPosition = this.priority[index];
            if (
              posInitConfig[tempPosition] &&
              2 * posInitConfig[tempPosition].area.height > winHeight
            ) {
              retPosObj = posInitConfig[tempPosition].getPos2();
              break;
            }
          }
        }
      }
      return retPosObj;
    }
  },
  mounted() {
    this.extendStyle = this.calculatePos();
  }
};
</script>
<style lang="less">
.single-stage-float-menu {
  position: fixed;
  width: 150px;
  margin: 0;
  padding: 0;
  background: #ffffff;
  list-style: none;
  box-shadow: 0 15px 35px rgba(50, 50, 90, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  z-index: 999999;
  > li {
    transition: ease 0.2s;
    > div {
      padding: 10px;
      color: #5e5e5e;
      transition: ease 0.2s;
      font-size: 14px;
      cursor: pointer;
    }

    &:hover {
      background: #c5c5c5;
      > div {
        color: #2b2b2b;
      }
    }
  }
}
</style>