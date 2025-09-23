import { ref, reactive, computed, h, render, nextTick, onMounted } from "vue";
import gridStackItemContentTransfer from "./gridStackItemContentTransfer.js";

const gridStackLayoutBuilder = {
    name: "gridStackLayoutBuilder",
    template: `
<div class="grid-stack-layout-builder-box">
    <div class="left">
        <div class="material-box" ref="materialBoxRef">
            <div class="grid-stack-item" v-for="item in materialItems" :key="item.type" :gs-id="item.type" :data-gs-widget="JSON.stringify(item.widget)" :data-material-type="item.type" :class="[materialItemClassName, calcAddedOnlyOneMaterialTypes.includes(item.type) ? 'no-drag' : '']">
                <div class="grid-stack-item-content">{{ item.text }}</div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="grid-layout-wrapper">
            <grid-stack-layout ref="gridLayoutDesignRef" :is-design-mode="true" :items="gridStackItems" @added="addedHandler">
                <template #item-content="{ item, isDesignMode }">
                    <grid-stack-item-content-transfer :item="item" :isDesignMode="true" @deleteItem="deleteGridLayoutItem" />
                </template>
            </grid-stack-layout>
        </div>
        <div class="footer-btn-box">
            <button @click="saveLayoutInfoHandler">保存</button>
            <button @click="cancelHandler">取消</button>
        </div>
    </div>
</div>
    `,
    props: {
        materialItems: {
            type: Array,
            default: () => []
        },
        gridStackItems: {
            type: Array,
            default: () => []
        },
        fnOptions: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ["getLayoutInfo", "cancel"],
    setup(props, { attrs, slots, emit, expose }) {
        const gridLayoutDesignRef = ref(null);
        const materialBoxRef = ref(null);

        const materialItemClassName = ref("material-item");
        const materialItemClassNameDot = "." + materialItemClassName.value;

        //  只允许拖拽一个的物料类型
        const calcOnlyOneMaterialTypes = computed(() => {
            const types = new Set();
            if (Array.isArray(props.materialItems) && props.materialItems.length > 0) {
                props.materialItems.forEach((item) => {
                    if (item.isOnlyOne) {
                        types.add(item.type);
                    }
                });
            }
            return Array.from(types);
        });

        //  记录新添加的物料（id 到 对象的映射）
        const newAddedMaterialId2Obj = reactive(new Map());

        //  已经添加的并且只允许拖拽一次的物料类型
        const calcAddedOnlyOneMaterialTypes = computed(() => {
            const types = new Set();
            if (Array.isArray(props.gridStackItems) && props.gridStackItems.length > 0) {
                props.gridStackItems.forEach((item) => {
                    if (calcOnlyOneMaterialTypes.value.includes(item.type)) {
                        types.add(item.type);
                    }
                });
            }
            newAddedMaterialId2Obj.forEach((value, key) => {
                if (calcOnlyOneMaterialTypes.value.includes(value.type)) {
                    types.add(value.type);
                }
            });
            return Array.from(types);
        });

        //  获取 GridStack 实例
        function getGridStackInstance() {
            if (!(gridLayoutDesignRef.value && typeof gridLayoutDesignRef.value.getInstance === "function")) return;
            return gridLayoutDesignRef.value.getInstance();
        }

        //  重新注册可拖拽物料
        function refreshGridStackDragIn() {
            // const dd = GridStack.getDD();
            // dd.draggable(el, "destroy");
            GridStack.Utils.getElements(materialItemClassNameDot).forEach((el) => {
                if (el.ddElement?.cleanDraggable) {
                    el.ddElement.cleanDraggable();
                }
            });
            nextTick(() => {
                GridStack.setupDragIn(materialItemClassNameDot + ":not(.no-drag)", null, null, materialBoxRef.value);
            });
        }

        function addedHandler(event, items) {
            if (!Array.isArray(items) || items.length === 0) return;
            const instance = getGridStackInstance();

            items.forEach((item) => {
                const gsId = Date.now();
                const { el } = item;

                const materialType = el.dataset.materialType;
                const widget = {
                    w: item.w,
                    h: item.h,
                    x: item.x,
                    y: item.y
                };
                const { content, extend } = props.fnOptions.getGridStackItemConfig(materialType, gsId, widget);
                const itemConfig = {
                    id: gsId,
                    type: materialType,
                    widget,
                    content,
                    extend
                };
                const elContent = el.querySelector(".grid-stack-item-content");
                elContent.innerHTML = "";
                const vNode = h(gridStackItemContentTransfer, { item: itemConfig, isDesignMode: true, onDeleteItem: deleteGridLayoutItem });
                render(vNode, elContent);

                el.setAttribute("gs-id", gsId);
                el.classList.remove(materialItemClassName.value);
                instance.update(el, { id: gsId });

                newAddedMaterialId2Obj.set(gsId, {
                    id: gsId,
                    type: materialType
                });
            });
            refreshGridStackDragIn();
        }

        function deleteGridLayoutItem(item) {
            const instance = getGridStackInstance();
            const el = instance.el.querySelector(`.grid-stack-item[gs-id="${item.id}"]`);
            if (el) {
                instance.removeWidget(el);
                if (newAddedMaterialId2Obj.has(item.id)) {
                    newAddedMaterialId2Obj.delete(item.id);
                }
                if (Array.isArray(props.gridStackItems) && props.gridStackItems.length > 0) {
                    const index = props.gridStackItems.findIndex((gridStackItem) => gridStackItem.id === item.id);
                    if (index !== -1) {
                        props.gridStackItems.splice(index, 1);
                    }
                }
                refreshGridStackDragIn();
            }
        }

        function saveLayoutInfoHandler() {
            const layoutInfo = [];
            const instance = getGridStackInstance();
            // const layoutInfo = instance.save(false, false);
            // const nodes = instance.engine.nodes;
            const items = instance.getGridItems();
            if (Array.isArray(items) && items.length > 0) {
                items.forEach((item) => {
                    const { gridstackNode } = item;
                    layoutInfo.push({
                        id: gridstackNode.id,
                        type: item.dataset.materialType,
                        widget: {
                            w: gridstackNode.w,
                            h: gridstackNode.h,
                            x: gridstackNode.x,
                            y: gridstackNode.y
                        }
                    });
                });
            }
            emit("getLayoutInfo", layoutInfo);
        }

        function cancelHandler() {
            emit("cancel");
        }

        onMounted(() => {
            refreshGridStackDragIn();
        });

        return { materialBoxRef, gridLayoutDesignRef, materialItemClassName, calcAddedOnlyOneMaterialTypes, addedHandler, deleteGridLayoutItem, saveLayoutInfoHandler, cancelHandler };
    }
};

export default gridStackLayoutBuilder;
