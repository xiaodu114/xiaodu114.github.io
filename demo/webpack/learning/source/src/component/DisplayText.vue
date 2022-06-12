<template>
  <div
    class="display-text-container"
    :style="uStyle"
  >
    {{value}}
  </div>
</template>
<script>
export default {
  name: "DisplayText",
  props: {
    value: {
      type: String,
    },
    uStyle: {
      type: Object,
    },
  },
};
</script>