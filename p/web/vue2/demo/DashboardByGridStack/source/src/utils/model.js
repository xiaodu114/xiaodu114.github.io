import {
    getDataType,
    getGUID
} from './common.js';

/**
 * GridStack布局项位置大小类-描述该项的位置，大小
 */
export class GridStackItemLayoutModel {
    constructor(obj) {
        if (getDataType(obj) === "object") {
            this.x = Object.hasOwnProperty.call(obj, "x") ? obj.x : 0;
            this.y = Object.hasOwnProperty.call(obj, "y") ? obj.y : 0;
            this.width = Object.hasOwnProperty.call(obj, "width") ? obj.width : 3;
            this.height = Object.hasOwnProperty.call(obj, "height") ? obj.height : 3;
        } else {
            this.x = 0;
            this.y = 0;
            this.width = 3;
            this.height = 3;
        }
    }
}

/**
 * GridStack布局项-基础类
 */
export class GridStackItemModel {
    constructor(obj) {
        if (getDataType(obj) === "object") {
            this.id = Object.hasOwnProperty.call(obj, "id") ? obj.id : getGUID();
            this.type = Object.hasOwnProperty.call(obj, "type") ? obj.type : ""; // vue|html|iframe
            this.gridstack = new GridStackItemLayoutModel(obj.gridstack);
            this.url = Object.hasOwnProperty.call(obj, "url") ? obj.url : "";
            this.js = Object.hasOwnProperty.call(obj, "js") ? obj.js : "";
            this.props = Object.hasOwnProperty.call(obj, "props") ? obj.props : {};
            this.extendConfig = Object.hasOwnProperty.call(obj, "extendConfig") ? obj.extendConfig : {};
        } else {
            this.id = getGUID();
            this.type = ""; // vue|html|iframe
            this.gridstack = new GridStackItemLayoutModel();
            this.url = "";
            this.js = "";
            this.props = {};
            this.extendConfig = {};
        }
    }
}