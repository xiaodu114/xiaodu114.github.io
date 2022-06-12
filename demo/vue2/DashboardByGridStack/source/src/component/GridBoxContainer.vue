<template>
  <div
    class="grid-container"
    :style="gridGapStyle"
  >
    <div
      class="grid-item"
      v-for="item in showItems"
      :key="item.id"
      :style="{gridColumnStart: item.gridstack.x + 1, gridColumnEnd:item.gridstack.x + item.gridstack.width+ 1 ,gridRowStart: item.gridstack.y + 1 ,gridRowEnd: item.gridstack.y + item.gridstack.height + 1  }"
    >
      <component-transform :item="item"></component-transform>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    showItems: {
      type: Array,
      default: []
    },
    partsGap: {
      type: Number,
      default: 20
    }
  },
  computed: {
    gridGapStyle() {
      return {
        "grid-gap": this.partsGap + "px"
      };
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 60px;
  > .grid-item {
    position: relative;
    background: #fff;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    overflow: hidden;
    &:hover,
    &:focus,
    &:active {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    }
  }
}
</style>


