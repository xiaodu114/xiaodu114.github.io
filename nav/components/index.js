import duMenu from "./menu.js";
import iframeWrapper from "./iframeWrapper.js";
import arrowDown from "./svgIcon/arrowDown.js";

export function registerComponent(app) {
    app.component(iframeWrapper.name, iframeWrapper);
    app.component(duMenu.name, duMenu);
    app.component(arrowDown.name, arrowDown);
}
