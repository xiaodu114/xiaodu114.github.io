import { createRouter, createMemoryHistory } from "vue-router";

import menuItems from "./menu.js";

const items = [];
const routerOptions = {
    history: createMemoryHistory(),
    routes: []
};
if (Array.isArray(menuItems) && menuItems.length) {
    menuItems.forEach((item) => {
        routerOptions.routes.push({
            name: item.code,
            path: "/" + item.code,
            component: () => import(item.componentPath)
        });

        items.push({
            text: item.text,
            routerName: item.code
        });
    });
}

const router = createRouter(routerOptions);

export default router;
export const navItems = items;
