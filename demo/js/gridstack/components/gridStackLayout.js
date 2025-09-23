import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";

const gridStackLayout = {
    name: "gridStackLayout",
    template: `
<div class="grid-stack-layout-box" ref="rootEl" :style="gridBgStyles">
    <div class="grid-stack-item" v-for="it in items" :key="it.id" :gs-id="it.id" :data-material-type="it.type" :gs-w="it.widget.w" :gs-h="it.widget.h" :gs-x="it.widget.x" :gs-y="it.widget.y">
        <div class="grid-stack-item-content">
            <slot name="item-content" :item="it" :isDesignMode="isDesignMode">
                <span>{{ it.widget.x }}-{{ it.widget.y }}-{{ it.widget.w }}-{{ it.widget.h }}</span>
            </slot>
        </div>
    </div>
</div>
    `,
    props: {
        isDesignMode: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => ({})
        },
        items: {
            type: Array,
            default: () => []
        }
    },
    emits: ["added"],
    setup(props, { attrs, slots, emit, expose }) {
        const rootEl = ref();

        let gridInstance = null;
        const defaultOptions = {
            column: 12,
            cellHeight: 100,
            margin: 6,
            acceptWidgets: true
        };

        const calcOptions = computed(() => {
            return {
                ...defaultOptions,
                ...props.options,
                ...{
                    disableDrag: !props.isDesignMode,
                    disableResize: !props.isDesignMode
                }
            };
        });

        const gridBgStyles = computed(() => {
            if (!props.isDesignMode) {
                return {};
            }
            const cfg = calcOptions.value;
            const col = cfg.column || 12;
            const cellHeight = cfg.cellHeight || 100;
            const horizontalGap = cfg.margin || 6,
                verticalGap = cfg.margin || 6;
            const horizontalGap2x = horizontalGap * 2,
                verticalGap2x = verticalGap * 2;
            const gapColor = "#f1f5ff";
            const gridItemColor = "#fff";
            return {
                backgroundColor: gridItemColor,
                backgroundImage: `linear-gradient(to right, ${gapColor} ${horizontalGap2x}px, transparent ${horizontalGap2x}px),
                                linear-gradient(to bottom, ${gapColor} ${verticalGap2x}px, transparent ${verticalGap2x}px)`,
                backgroundSize: `${100 / col}% ${cellHeight}px`,
                backgroundPosition: `-${horizontalGap}px -${verticalGap}px`
            };
        });

        watch(
            () => props.isDesignMode,
            (design) => {
                if (!gridInstance) return;
                if (design) {
                    gridInstance.enableMove(true);
                    gridInstance.enableResize(true);
                } else {
                    gridInstance.disable();
                }
            }
        );

        onMounted(() => {
            if (!rootEl.value) return;

            // GridStack.renderCB = function (el, widget) {
            // };
            // GridStack.addRemoveCB = function (host, item, add, isGrid) {
            // };

            gridInstance = GridStack.init(calcOptions.value, rootEl.value);

            gridInstance.on("added", (event, items) => {
                emit("added", event, items);
            });
        });

        onBeforeUnmount(() => {
            gridInstance?.destroy();
        });

        expose({
            getInstance: () => gridInstance
        });

        return {
            rootEl,
            gridBgStyles
        };
    }
};

export default gridStackLayout;
