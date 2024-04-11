function checkDOMContentLoaded() {
    return new Promise((resolve, reject) => {
        if (["interactive", "complete"].indexOf(document.readyState) >= 0) {
            resolve();
        } else {
            document.addEventListener("DOMContentLoaded", (event) => {
                resolve();
            });
        }
    });
}

customElements.define(
    "llm-study-nav",
    class LlmStudyNav extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({
                mode: "open"
            });

            //#region 组件模板
            shadowRoot.innerHTML = `
            <style>
                summary {
                    cursor: pointer;
                }

                .ddz-llm-study-nav-container ol li {
                    line-height: 1.6;
                }
            </style>
            <details>
                <summary>LLM 系列：你可以了解更多，点开看看吧！</summary>
                <div class="ddz-llm-study-nav-container">
                    <ol>
                        <li>
                            <a href="/p/llm/chatglm2/index.html" target="_blank">ChatGLM2-6B</a>
                        </li>
                        <li>
                            <a href="/p/llm/langchainChatchat/index.html" target="_blank">Langchain-Chatchat</a>
                        </li>
                        <li>
                            <a href="/p/llm/chatglmCpp/index.html" target="_blank">chatglm.cpp</a>
                        </li>
                        <li>
                            <a href="/p/llm/llamaCpp/index.html" target="_blank">llama.cpp</a>
                        </li>
                        <li>
                            <a href="/p/llm/fastChat/index.html" target="_blank">FastChat</a>
                        </li>
                        <li>
                            <a href="/p/llm/extraChapter/index.html" target="_blank">番外篇</a>
                        </li>
                        <li>
                            <a href="/p/llm/codeShell/index.html" target="_blank">CodeShell</a>
                        </li>
                        <li>
                            <a href="/p/llm/sqlcoder/index.html" target="_blank">sqlcoder</a>
                        </li>
                        <li>
                            <a href="/p/llm/ollama/index.html" target="_blank">Ollama</a>
                        </li>
                        <li>
                            <a href="/p/llm/bigdl/index.html" target="_blank">BigDL-LLM</a>
                        </li>
                        <li>
                            <a href="/p/llm/pycorrector/index.html" target="_blank">pycorrector</a>
                        </li>
                        <li>
                            <a href="/p/llm/llamaFactory/index.html" target="_blank">LLaMA Factory</a>
                        </li>
                        <li>
                            <a href="/p/llm/typeChat/index.html" target="_blank">TypeChat</a>
                        </li>
                        <li>
                            <a href="/p/llm/faiss/index.html" target="_blank">Faiss</a>
                        </li>
                        <li>
                            <a href="/p/llm/xorbitsInference/index.html" target="_blank">Xorbits Inference</a>
                        </li>
                    </ol>
                </div>
            </details>
            `;
            //#endregion
        }
    }
);

checkDOMContentLoaded().then(() => {
    const h1Ele = document.querySelector("body>.blog-page>h1");
    if (h1Ele && h1Ele.after) h1Ele.after(document.createElement("llm-study-nav"));
});
