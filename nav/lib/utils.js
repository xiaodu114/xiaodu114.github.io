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
