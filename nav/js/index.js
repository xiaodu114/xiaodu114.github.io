const { ref, onMounted } = Vue;
const { useRouter, useRoute } = VueRouter;
export default {
    name: "App",
    template: "#appTemplate",
    props: {
        head: {
            type: Object,
            default: {
                title: "大家好，我是 xiaodu114",
                links: []
            }
        },
        navItems: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        // 生命周期钩子
        onMounted(() => {
            console.log("生命周期钩子：onMounted");
        });

        //  无需暴露的数据
        const router = useRouter();
        const route = useRoute();
        let activeNavItem = null;

        //  需要暴露的数据
        let selectedKeys = ref([]);

        //  不需要暴露的方法
        const init = () => {
            const firstLeafItem = props.navItems[0];
            selectedKeys.value = [firstLeafItem.key];
            selectHandler({item:firstLeafItem, key: firstLeafItem.key, selectedKeys: [firstLeafItem.key]});
        };

        //  需要暴露的方法
        function selectHandler({ item, key, selectedKeys }) {
            if (activeNavItem === item) return;
            activeNavItem = item;
            router.push({ name: item.extend.routeName, params: { src: item.src } });
        }

        init();

        return { selectHandler, selectedKeys };
    }
};
