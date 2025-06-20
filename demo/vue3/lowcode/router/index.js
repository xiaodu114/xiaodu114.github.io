import { createRouter, createMemoryHistory } from "vue-router";

import menuItems from "./menu.js";

const items = [];
const routerOptions = {
    history: createMemoryHistory(),
    routes: []
};

if (Array.isArray(menuItems) && menuItems.length) {
    menuItems.forEach((item) => {
        if (!item.code) return;

        if (item.isDirectory) {
            const subItems = [];
            if (Array.isArray(item.children) && item.children.length) {
                item.children.forEach((subItem) => {
                    if (!(subItem.code && subItem.componentPath)) return;
                    routerOptions.routes.push({
                        name: item.code + "." + subItem.code,
                        path: "/" + item.code + "/" + subItem.code,
                        component: () => import(subItem.componentPath)
                    });
                    subItems.push({
                        id: subItem.id,
                        text: subItem.text,
                        routerName: item.code + "." + subItem.code
                    });
                });
            }
            if (subItems.length) {
                items.push({
                    id: item.id,
                    text: item.text,
                    isDirectory: true,
                    children: subItems
                });
            }
        } else {
            if (item.componentPath) {
                routerOptions.routes.push({
                    name: item.code,
                    path: "/" + item.code,
                    component: () => import(item.componentPath)
                });

                items.push({
                    id: item.id,
                    text: item.text,
                    routerName: item.code
                });
            }
        }
    });
}

const router = createRouter(routerOptions);

export default router;
export const navItems = items;
