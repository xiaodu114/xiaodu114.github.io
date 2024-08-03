async function bar() {
    console.log("22222");
    return new Promise((resolve) => {
        resolve();
    });
}

async function foo() {
    console.log("111111");
    await bar();
    console.log("33333");
}
foo();
console.log("444444");
