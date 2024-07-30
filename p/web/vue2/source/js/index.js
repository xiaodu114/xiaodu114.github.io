export default {
    name: "App",
    template: "#appTemplate",
    data() {
        return {
            natItems: [
                { text: "介绍", routerName: "introduction" },
                { text: "解说", routerName: "narrate" },
                { text: "双向绑定", routerName: "twoBind" }
            ],
            activeNav: null
        };
    },
    computed: {},
    methods: {
        goTo(item) {
            if (this.activeNav === item) return;
            this.activeNav = item;
            this.$router.push({ name: item.routerName, params: { src: item.src } });
        }
    },
    created() {
        if (this.$route) {
            let item = this.natItems.filter((item) => item.routerName === this.$route.name)[0];
            if (item) {
                this.activeNav = item;
            } else {
                this.goTo(this.natItems[0]);
            }
        } else {
            this.goTo(this.natItems[0]);
        }
    }
};
