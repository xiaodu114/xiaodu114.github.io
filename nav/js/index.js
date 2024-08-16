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

        //  需要暴露的数据
        let activeNav = ref(null);

        //  不需要暴露的方法
        const init = () => {
            if (route) {
                let item = props.navItems.filter((item) => item.routerName === route.name)[0];
                if (item) {
                    activeNav = item;
                } else {
                    goTo(props.navItems[0]);
                }
            } else {
                goTo(props.navItems[0]);
            }
        };

        //  需要暴露的方法
        const goTo = (item) => {
            if (activeNav === item) return;
            activeNav.value = item;
            router.push({ name: item.routerName, params: { src: item.src } });
        };

        init();

        return { activeNav, goTo };
    }
};
