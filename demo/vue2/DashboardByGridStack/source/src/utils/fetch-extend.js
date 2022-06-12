/**
 * 使用Fetch请求一个文本文件
 * @param {String} url 
 * @returns {Promise} 
 */
export const fetchText = async function (url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.text();
    } else {
        alert("异常：" + response.statusText);
    }
}