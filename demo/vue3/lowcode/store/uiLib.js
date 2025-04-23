import { defineStore } from "pinia";

export const useUILibStore = defineStore("uiLib", {
  state: () => {
    return {
      lib: "element-plus",
    };
  },
});