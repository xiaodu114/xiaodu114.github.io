function fibonacci(num) {
    return num <= 2 ? 1 : fibonacci(num - 1) + fibonacci(num - 2);
}
onmessage = (evt) => {
    console.log("demo2-worker 接收到消息");
    let num = evt.data;
    console.log(`demo2-worker 开始计算第${num}个数是啥`);
    let result = fibonacci(num);
    console.log(`demo2-worker 计算结束，第${num}个数是：${result}`);
    postMessage(result);
};
