export function serializeQueryParams(queryParams) {
    return Object.entries(queryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
}

const optionsOther = {
    sceneMode: 3,
    scene3DOnly: true,
    showRenderLoopErrors: true,
    depthTestAgainstTerrain: false,
    contextOptions: {
        webgl: {
            alpha: true,
            depth: true,
            stencil: true,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: true
        }
    }
};

export const miniMapOptions = {
    geocoder: false, // 地理编码搜索
    homeButton: false, // 主页按钮
    sceneModePicker: false, // 场景模式选择器
    baseLayerPicker: false, // 底图选择器
    navigationHelpButton: false, // 导航帮助
    animation: false, // 动画控件
    timeline: false, // 时间轴
    fullscreenButton: false, // 全屏按钮
    infoBox: false, // 右上角的信息框
    selectionIndicator: false // 绿色四角选中框
};

if (window.Cesium) {
    /**
     * Cesium.Rectangle.fromDegrees 是一个静态方法，用于从经纬度范围创建一个矩形对象。它接受四个参数，分别是矩形的西边界经度、南边界纬度、东边界经度和北边界纬度。这些参数都是数字类型，表示经度和纬度的度数。
     */
    const beiJingRange = Cesium.Rectangle.fromDegrees(115.5, 39.4, 117.5, 40.5);

    /**
     * Cesium.Camera.DEFAULT_VIEW_RECTANGLE 是 Camera 类的一个静态属性，作用如下：
     * 1、决定场景的初始视角：Camera 在构造时会读取这个值来设置初始相机位置。Viewer 创建时会自动创建 Scene 和 Camera，所以必须在创建 Viewer 之前修改它才能影响初始视角——这一点原说法是对的。
     * 2、默认值是 Rectangle.MAX_VALUE，即整个地球范围，这就是为什么默认打开 Cesium 看到的是全球视角。
     * 3、它还被 camera.flyHome() 使用（飞回“主页”视角）。
     */
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = beiJingRange;
}

export function createCesiumViewer(containerId, options = miniMapOptions) {
    if (!window.Cesium) {
        throw new Error("Cesium is not loaded");
    }

    const viewer = new Cesium.Viewer(containerId, options);

    viewer.cesiumWidget.creditContainer.style.display = "none"; // 这个是干什么用的？ 也可以使用这个： viewer._cesiumWidget._creditContainer

    // //  ??? 去除时间影响光照
    // viewer.scene.light = new Cesium.DirectionalLight({
    //     direction: new Cesium.Cartesian3(0.35492591601301104, -0.8909182691839401, -0.2833588392420772)
    // });

    return viewer;
}

export const helper = {
    convert2Cartesian: (viewer, position, cesium) => {
        if (!viewer || !position || !cesium) return undefined;
        try {
            const ray = viewer.camera.getPickRay(position);
            if (ray) {
                const pos = viewer.scene.globe.pick(ray, viewer.scene);
                if (cesium.defined(pos)) return pos;
            }
            const pos = viewer.camera.pickEllipsoid(position, viewer.scene.globe.ellipsoid);
            return cesium.defined(pos) ? pos : undefined;
        } catch (e) {
            return undefined;
        }
    }
};

const ScreenSpaceEventTypeValue2HandlerName = {};
if (typeof window.Cesium?.ScreenSpaceEventType === "object" && Cesium.ScreenSpaceEventType !== null) {
    for (const key in Cesium.ScreenSpaceEventType) {
        if (Cesium.ScreenSpaceEventType.hasOwnProperty(key)) {
            const value = Cesium.ScreenSpaceEventType[key];
            ScreenSpaceEventTypeValue2HandlerName[value] = `_${key}_Handler`;
        }
    }
}
export class MapEventManager {
    _IsMouseMoveMarker = false;
    _MouseMoveGuideMarker = undefined;

    constructor(viewer, _InputActionOption = {}, option = {}) {
        this.viewer = viewer;
        this.inputActionOption = _InputActionOption;
        this.option = option;
        this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

        this._SelectedEntityChangedHandler = this._SelectedEntityChangedHandler.bind(this);
        this.viewer.selectedEntityChanged.addEventListener(this._SelectedEntityChangedHandler);

        for (const key in ScreenSpaceEventTypeValue2HandlerName) {
            if (ScreenSpaceEventTypeValue2HandlerName.hasOwnProperty(key)) {
                const handlerName = ScreenSpaceEventTypeValue2HandlerName[key];
                if (typeof this[handlerName] === "function") {
                    this[handlerName] = this[handlerName].bind(this);
                }
            }
        }
        if (typeof _InputActionOption === "object" && _InputActionOption !== null) {
            for (const key in _InputActionOption) {
                if (_InputActionOption.hasOwnProperty(key) && typeof _InputActionOption[key] === "function" && ScreenSpaceEventTypeValue2HandlerName.hasOwnProperty(key)) {
                    this.screenSpaceEventHandler.setInputAction(this[ScreenSpaceEventTypeValue2HandlerName[key]], key);
                }
            }
        }
    }

    //#region 向导 Marker（跟随鼠标移动）

    _DeleteGuideMarker() {
        if (this._MouseMoveGuideMarker) {
            this.viewer.entities.remove(this._MouseMoveGuideMarker);
            this._MouseMoveGuideMarker = undefined;
        }
    }

    _SyncUpdateGuideMarker(cartesianPos, guideMarkerConfig) {
        try {
            if (Cesium.defined(cartesianPos)) {
                if (!this._MouseMoveGuideMarker) {
                    const markerOptions = {
                        position: cartesianPos,
                        point: {
                            pixelSize: 14,
                            color: new Cesium.Color(1, 1, 1, 0.3),
                            outlineColor: Cesium.Color.fromCssColorString("#3cb878"),
                            outlineWidth: 3,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY
                        }
                    };
                    if (typeof guideMarkerConfig?.handleMarkerOptions === "function") {
                        guideMarkerConfig.handleMarkerOptions(markerOptions);
                    }
                    if (!(typeof markerOptions?.properties === "object" && markerOptions.properties !== null)) {
                        markerOptions.properties = {};
                    }
                    markerOptions.properties["_Type_For_MapEventManager"] = `MouseMoveGuideMarker_${Date.now()}`;
                    this._MouseMoveGuideMarker = this.viewer.entities.add(markerOptions);
                } else {
                    this._MouseMoveGuideMarker.position = cartesianPos;
                }
            } else {
                this._DeleteGuideMarker();
            }
        } catch (error) {}
    }

    //#endregion

    //#regin 选中实体改变事件

    _SelectedEntityChangedHandler(entity) {
        let validEntity = null;
        if (Cesium.defined(entity)) {
            const type = entity.properties?._Type_For_MapEventManager?.getValue();
            if (type?.startsWith("MouseMoveGuideMarker_")) {
                return;
            }
            validEntity = entity;
        }

        if (typeof this.option?.selectedEntityChangedHandler === "function") {
            this.option.selectedEntityChangedHandler(validEntity);
        }
    }

    //#endregion

    //#region InputAction 事件处理

    // 鼠标左键按下事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.LEFT_DOWN]](click) {
        const handler = this.inputActionOption[Cesium.ScreenSpaceEventType.LEFT_DOWN];
        if (typeof handler === "function") {
            const cartesianPos = helper.convert2Cartesian(this.viewer, click.position, window.Cesium);
            handler(cartesianPos, click);
        }
    }

    // 鼠标左键抬起事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.LEFT_UP]](click) {}

    // 鼠标左键点击事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.LEFT_CLICK]](click) {
        const handler = this.inputActionOption[Cesium.ScreenSpaceEventType.LEFT_CLICK];
        if (typeof handler === "function") {
            const cartesianPos = helper.convert2Cartesian(this.viewer, click.position, window.Cesium);
            handler(cartesianPos, click);
        }
    }

    // 鼠标左键双击事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK]](click) {}

    // 鼠标右键按下事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.RIGHT_DOWN]](click) {}

    // 鼠标右键抬起事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.RIGHT_UP]](click) {}

    // 鼠标右键点击事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.RIGHT_CLICK]](click) {
        const handler = this.inputActionOption[Cesium.ScreenSpaceEventType.RIGHT_CLICK];
        if (typeof handler === "function") {
            const cartesianPos = helper.convert2Cartesian(this.viewer, click.position, window.Cesium);
            handler(cartesianPos, click);
        }
    }

    // 鼠标移动事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.MOUSE_MOVE]](click) {
        const handler = this.inputActionOption[Cesium.ScreenSpaceEventType.MOUSE_MOVE];
        const isFn = typeof handler === "function";
        let cartesianPos = null;
        if (isFn || this._IsMouseMoveMarker) {
            cartesianPos = helper.convert2Cartesian(this.viewer, click.endPosition, window.Cesium);
        }
        if (isFn) {
            handler(cartesianPos, click);
        }
        if (this._IsMouseMoveMarker) {
            this._SyncUpdateGuideMarker(cartesianPos, this.option?.guideMarker);
        } else {
            this._DeleteGuideMarker();
        }
    }

    // 鼠标滚轮事件
    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.WHEEL]](click) {}

    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.PINCH_START]](click) {}

    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.PINCH_END]](click) {}

    [ScreenSpaceEventTypeValue2HandlerName[Cesium.ScreenSpaceEventType.PINCH_MOVE]](click) {}

    //#endregion

    /**
     * 开启鼠标移动时跟随标记
     */
    openMouseMoveMarker() {
        this._IsMouseMoveMarker = true;
        const key = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
        if (!this.screenSpaceEventHandler.getInputAction(key)) {
            this.screenSpaceEventHandler.setInputAction(this[ScreenSpaceEventTypeValue2HandlerName[key]], key);
        }
    }

    /**
     * 关闭鼠标移动时跟随标记
     */
    closeMouseMoveMarker() {
        const key = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
        const isFn = typeof this.inputActionOption[key] === "function";
        if (!isFn) {
            this.screenSpaceEventHandler.removeInputAction(key);
        }
        this._IsMouseMoveMarker = false;
        this._DeleteGuideMarker();
    }

    /**
     * 销毁
     */
    destroy() {
        this.screenSpaceEventHandler && this.screenSpaceEventHandler.destroy();
        this.screenSpaceEventHandler = null;
        this.viewer.selectedEntityChanged.removeEventListener(this._SelectedEntityChangedHandler);
        this.viewer = null;
    }
}
