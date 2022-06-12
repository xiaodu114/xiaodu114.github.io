# Drag and Drop 项目介绍  
一、PC端  

    采用HTML 拖放（Drag and Drop）接口实现，是在拖拽过程中实时排序的。
    
* 示例1：[预览](https://xiaodu114.github.io/html-js-css/js-demo/Drag-and-Drop/index1.html)  

    第一版的实现方式是：传入的是拖拽容器的id,之后遍历容器中所有的拖拽项，为他们设置可拖拽属性，并添加dragstart、dragover事件监听。drag和dragend事件是在dragstart中注册的,并在拖拽结束时销毁这两个事件……

    >参考chrome浏览器最近访问的标签页中的方法
    ```javascript
    /**
     * Additional API for Array. Moves the item at index |from| to index |to|.
     * @param {number} from Index of the item to move.
     * @param {number} to Index to move the item to.
     */
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };
    ```
    >添加新增节点扩展方法：putToMyBefore、putToMyAfter。
    ```javascript
    Element.prototype.putToMyBefore = function (insertNode) {
        this.parentNode.insertBefore(insertNode, this);
    };
    Element.prototype.putToMyAfter = function (insertNode) {
        if (this.parentNode.lastElementChild === this) {
            this.parentNode.appendChild(insertNode);
        } else {
            this.nextElementSibling.putToMyBefore(insertNode);
        }
    };
    ```
* 示例2：[预览](https://xiaodu114.github.io/html-js-css/js-demo/Drag-and-Drop/index2.html)  

    参考SortableJS的写法,为拖拽容器添加点击事件(mousedown、pointerdown),之后在点击事件中去设置拖拽项的拖拽属性和事件，并且在拖拽结束时销毁这些事件。因为如果使用示例1中的方式，自始至终只弄了一遍，并支持动态添加一个节点，也不支持刷新的方法，现在采用这种方式，就不用担心了……但是如果拖拽项比较多时，实时注册和销毁会不会影响性能，这个我就/(ㄒoㄒ)/~~

* 示例3：[预览](https://xiaodu114.github.io/html-js-css/js-demo/Drag-and-Drop/index3.html)  

    这一次添加了动态添加节点测试。由传入id修改为传入dom元素，因此这里也做了一些简单的验证。另一项改动就是将拖拽事件绑定到了拖拽容器上,具体是这样的：容器添加点击事件(mousedown),之后在该事件中注册容器的dragover事件，并且设置拖拽项的拖拽属性和dragstart事件并在该事件中绑定drag和dragend事件；在容器的dragover事件中需要处理一些碰撞检测和交换顺序……

    >判断是否是一个DOM元素:Stack Overflow中的一个问题中给出了好多中方式，我也没有一一测试；还有就是大名鼎鼎的lodash，这里面也有这样一个方法，看了一下源码，依赖还挺多的，抽取太费劲了……下面是自己写的一个方法（注意：_GetDataType，这个方法是很早在网上找的，现在忘了出处了，不好意思），以及[测试结果](https://xiaodu114.github.io/html-js-css/js-demo/Drag-and-Drop/tag001.html),这个测试绝对是闲的，对就是闲的……
    ```javascript
    /**
     * 获取数据的类型
     * document                                   ->  htmldocument
     * window                                     ->  window
     * Web Components(extends HTMLElement)        ->  htmlelement
     * es6+ class(name endsWith element)          ->  function
     * es6+ class(name endsWith element) instance ->  object 
     * div                                        ->  htmldivelement
     * button                                     ->  htmlbuttonelement
     */
    _GetDataType = (obj) => {
        return Object.prototype.toString
            .call(obj)
            .replace(/^\[object\s(\w+)\]$/, "$1")
            .toLowerCase();
    };
    _isHTMLElementByDataType = (obj) => {
        var tempDataType = this._GetDataType(obj);
        return tempDataType.endsWith("element") && obj.nodeType === 1;
    };
    ```
    >DOMNodeRemoved监听DOM删除操作（其中新增节点操作也会触发该事件），网上都建议采用MutationObserver，但是它可以监听自己的删除吗？还是采用监听父容器这个迂回路线来实现。

二、移动端  

    等待……

【参考网址】  
* [HTML 拖放 API - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)  
* [ChildNode - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode)
* [EventTarget.removeEventListener - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener)
* [将HTML字符转换为DOM节点并动态添加到文档中](https://juejin.im/post/5b784074518825430e570a7f)
* [SortableJS](https://github.com/SortableJS/Sortable)
* [lodash.isElement | Lodash 中文网](https://www.lodashjs.com/docs/lodash.isElement)
* [How do you check if a JavaScript Object is a DOM Object? - Stack Overflow](https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object)