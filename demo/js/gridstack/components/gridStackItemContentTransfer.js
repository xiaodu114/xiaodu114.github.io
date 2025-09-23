import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const gridStackItemContentTransfer = {
    name: "gridStackItemContentTransfer",
    template: `
<div class="grid-stack-item-content-transfer-box" ref="rootEl">
    <component :is="item.content.comp" :="bindObj"></component>
    <div class="grid-stack-item-content-mask" v-if="isDesignMode">
        <div class="tool-box">
            <span @click="toolBtnDeleteHandler">✖</span>
        </div>
    </div>
</div>
    `,
    props: {
        isDesignMode: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ["deleteItem"],
    setup(props, { attrs, slots, emit, expose }) {
        const rootEl = ref();

        const refreshKey = ref(new Date().valueOf());

        const isNeedRefresh = computed(() => {
            return props.item?.extend?.isSizeChange2Refresh !== false;
        });

        const bindObj = computed(() => {
            const obj = {};
            if (isNeedRefresh.value) {
                obj.key = refreshKey.value;
            }
            return obj;
        });

        let resizeObserver = null;
        if (isNeedRefresh.value) {
            resizeObserver = new ResizeObserver((entries) => {
                requestAnimationFrame(() => {
                    refreshKey.value++;
                });
            });
        }

        function toolBtnDeleteHandler() {
            emit("deleteItem", props.item);
        }

        onMounted(() => {
            if (rootEl.value && resizeObserver) {
                resizeObserver.observe(rootEl.value);
            }
        });

        onBeforeUnmount(() => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        });

        return {
            rootEl,
            bindObj,
            toolBtnDeleteHandler
        };
    }
};

export default gridStackItemContentTransfer;
