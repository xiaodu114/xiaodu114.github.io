const { ref, provide, inject } = Vue;
const selectedKeysSymbol = Symbol("selectedKeys");
export default {
    name: "duMenu",
    template: "#menuTemplate",
    props: {
        depth: {
            type: Number,
            default: () => 0
        },
        items: {
            type: Array,
            default: () => []
        },
        selectedKeys: {
            type: Array,
            default: () => []
        }
    },
    emits: ["select"],
    setup(props, { slots, attrs, expose, emit }) {
        const localOpenedKeys = ref(new Set());
        function isOpened(item) {
            return localOpenedKeys.value.has(item.key);
        }
        function toggleSubMenu(item) {
            if (localOpenedKeys.value.has(item.key)) {
                localOpenedKeys.value.delete(item.key);
            } else {
                localOpenedKeys.value.add(item.key);
            }
        }

        const localSelectedKeys = inject(selectedKeysSymbol, ref(new Set()));
        if (props.depth === 0) {
            if(Array.isArray(props.selectedKeys)) {
                localSelectedKeys.value = new Set(props.selectedKeys);
            }
            provide(selectedKeysSymbol, localSelectedKeys);
        }
        function isSelected(item) {
            return localSelectedKeys.value.has(item.key);
        }
        function handleLeafItemClick(item) {
            localSelectedKeys.value.clear();
            localSelectedKeys.value.add(item.key);
            emit("select", { item, key: item.key, selectedKeys: localSelectedKeys.value });
        }

        return {
            isOpened,
            toggleSubMenu,
            isSelected,
            handleLeafItemClick
        };
    }
};
