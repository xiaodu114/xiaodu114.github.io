import { ref, onMounted, onBeforeUnmount } from "vue";

export const component001 = {
    template: `
<div class="component-1-box">
    <h2>组件1</h2>
    <p>当前计数：{{ counter }}</p>
</div>`,
    setup(props, { attrs, slots, emit, expose }) {
        const counter = ref(0);
        let id = null;
        function loop() {
            counter.value++;
        }
        onMounted(() => {
            id = setInterval(loop, 1000);
        });
        onBeforeUnmount(() => {
            clearInterval(id);
        });
        return { counter };
    }
};

export const component002 = {
    template: `
<div class="component-2-box">
    <h2>组件2</h2>
</div>`
};

export const component003 = {
    template: `
<div class="component-3-box">
    <h2>组件3</h2>
    <p>当前计数：{{ counter }}</p>
</div>`,
    setup(props, { attrs, slots, emit, expose }) {
        const counter = ref(0);
        let id = null;
        function loop() {
            counter.value++;
        }
        onMounted(() => {
            id = setInterval(loop, 1000);
        });
        onBeforeUnmount(() => {
            clearInterval(id);
        });
        return { counter };
    }
};

export const component004 = {
    template: `
<div class="component-4-box">
    <h2>组件4</h2>
</div>`
};

export const component005 = {
    template: `
<div class="component-5-box">
    <h2>组件5</h2>
</div>`
};

export const component006 = {
    template: `
<div class="component-6-box">
    <h2>组件6</h2>
</div>`
};
