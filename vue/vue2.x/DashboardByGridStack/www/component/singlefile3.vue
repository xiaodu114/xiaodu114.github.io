<template>
  <div class="singlefile3">
    <div>{{singlefile3str}}</div>
    <pre>{{singlefile3obj}}</pre>
  </div>
</template>
<script data-p1='12' data-p2='1234'>
export default {
  name: "singlefile3",
  props: {
    singlefile3str: {
      type: String
    },
    singlefile3obj: {
      type: Object
    }
  },
  data: function() {
    return {};
  }
};
</script>
<style>
.singlefile3 {
  color: lightsalmon;
  height: 100%;
  overflow-y: auto;
}
</style>