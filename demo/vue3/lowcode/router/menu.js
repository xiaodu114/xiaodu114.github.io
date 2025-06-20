export default [
    {
        id: "1",
        text: "表单",
        code: "form",
        isDirectory: true,
        children: [
            {
                id: "1-1",
                text: "示例一",
                code: "demo1",
                componentPath: "../page/form/demo1.js"
            },
            {
                id: "1-2",
                text: "示例二",
                code: "demo2",
                componentPath: "../page/form/demo2.js"
            }
        ]
    },
    {
        id: "2",
        text: "页面一",
        code: "page1",
        componentPath: "../page/page1.js"
    },
    {
        id: "3",
        text: "页面二",
        code: "page2",
        componentPath: "../page/page2.js"
    }
];
