import * as elementPlusExtend from "./elementPlus.js";

export default function getUILibExtend() {
    switch (window._du_uiLib_) {
        case "element-plus":
            return elementPlusExtend;
        default:
            return null;
    }
}
