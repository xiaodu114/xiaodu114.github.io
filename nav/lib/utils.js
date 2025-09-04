export function fetchGetJSON(url) {
    return fetch(url).then(
        (response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error(`异常---> 响应状态码：${response.status} ；响应状态信息：${response.statusText}`);
            }
        },
        (error) => {
            console.error(`异常---> ${JSON.stringify(error)}`);
        }
    );
}

/**
 * 将数据库格式的菜单树转换成 UI 菜单和路由数组
 * @param {Array} menuItems 数据库返回的菜单节点
 * @returns {{ uiMenuItems: Array, routeItems: Array }}
 */
export function handleDbMenuItems(menuItems, { idKey = "id", labelKey = "text", childrenKey = "children" } = {}) {
    const uiMenuItems = [];
    const routeItems = [];
    const nodeMap = new Map(); // id -> node
    const nodePathMap = new Map(); // id -> 根到该节点的 code 路径字符串

    /* ---------- 1. 建立索引：id -> 节点，并记录父级关系 ---------- */
    const stack = [];

    // 初始化：将所有节点（含子节点）压栈，并记录父级
    if (Array.isArray(menuItems)) {
        menuItems.forEach((n) => stack.push({ node: n, nodePath: [] }));
    }

    while (stack.length) {
        const { node, nodePath } = stack.pop();
        const idValue = node[idKey];
        const nodeSimple = {
            ...node,
            [childrenKey]: null
        };
        const fullNodePath = [...nodePath];
        fullNodePath.push(nodeSimple);

        nodeMap.set(idValue, nodeSimple);
        nodePathMap.set(idValue, fullNodePath);

        const childrenNodes = node[childrenKey];
        if (Array.isArray(childrenNodes)) {
            // 逆序压栈，保持原有顺序
            for (let i = childrenNodes.length - 1; i >= 0; i--) {
                stack.push({ node: childrenNodes[i], nodePath: fullNodePath });
            }
        }
    }

    /* ---------- 2. 再次遍历生成 uiMenuItems & routeItems ---------- */
    const buildStack = [];
    if (Array.isArray(menuItems)) {
        // menuItems.forEach((n) => buildStack.push({ node: n, parentUi: undefined }));
        // 逆序压栈，保持原有顺序
        for (let i = menuItems.length - 1; i >= 0; i--) {
            buildStack.push({ node: menuItems[i], parentUi: undefined });
        }
    }

    while (buildStack.length) {
        const { node, parentUi } = buildStack.pop();
        const idValue = node[idKey];

        // UI 菜单项
        const uiMenuItem = { key: idValue, label: node[labelKey], extend: {} };

        // 挂到父节点或根数组
        if (parentUi) {
            (parentUi.children ||= []).push(uiMenuItem);
        } else {
            uiMenuItems.push(uiMenuItem);
        }

        const childrenNodes = node[childrenKey];
        if (Array.isArray(childrenNodes) && childrenNodes.length) {
            // 有子节点 -> 继续压栈
            for (let i = childrenNodes.length - 1; i >= 0; i--) {
                buildStack.push({ node: childrenNodes[i], parentUi: uiMenuItem });
            }
        } else {
            const codePaths = nodePathMap.get(idValue).map((item) => item.code);
            const routeName = codePaths.join(".");
            const routePath = codePaths.join("/");
            // 叶子节点 -> 生成路由
            routeItems.push({
                name: routeName,
                path: "/" + routePath,
                meta: { [idKey]: idValue }
            });

            // 给 UI 菜单项补充 routeName，方便点击跳转
            uiMenuItem.extend.routeName = routeName;
        }
    }

    return { uiMenuItems, routeItems, nodeMap };
}
