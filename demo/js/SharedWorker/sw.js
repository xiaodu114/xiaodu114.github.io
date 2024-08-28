const ports = [];
// 在 SharedWorker 的全局作用域中，self 代表这个worker
self.addEventListener("connect", (event) => {
    //  获取通信端口
    const port = event.ports[0];
    //  收集起来，方便后面广播或者定向发送
    ports.push(port);

    //  监听消息
    port.onmessage = (evt) => {
        //  中转消息
        transferMessage(evt, port);
    };

    //  什么时机清除 ports ？也是通过 evt.data 判断吗？
});

function transferMessage(evt, curPort) {
    //  可以指定一下 evt.data 数据规范，来实现下面的几种需求
    //      1、一个页面一个 port ？
    //      2、定向发送时如何找到对应的 port ？
    //  广播（包括自己）
    ports.forEach((port) => {
        port.postMessage(evt.data);
    });
    // //  广播（排除自己）
    // ports.forEach((port) => {
    //     if (port === curPort) return;
    //     port.postMessage(evt.data);
    // });
    //  定向发送
    //  ……
}
