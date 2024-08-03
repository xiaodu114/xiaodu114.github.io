//  示例一
Promise.resolve()
    .then(() => {
        console.log(0);
        return 4;
    })
    .then((res) => {
        console.log(res);
    });
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

//  示例二
Promise.resolve()
    .then(() => {
        console.log(0);
        return {
            then: function (resolve, reject) {
                resolve(4);
            }
        };
    })
    .then((res) => {
        console.log(res);
    });
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

//  示例三
Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4);
    })
    .then((res) => {
        console.log(res);
    });
Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });
