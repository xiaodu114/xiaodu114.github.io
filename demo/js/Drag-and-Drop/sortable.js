;
(function (window) {
    function userAgent(pattern) {
        if (typeof window !== 'undefined' && window.navigator) {
            return !!
                /*@__PURE__*/
                navigator.userAgent.match(pattern);
        }
    }

    function getWindowScrollingElement() {
        var scrollingElement = document.scrollingElement;
        if (scrollingElement) {
            return scrollingElement;
        } else {
            return document.documentElement;
        }
    }

    function getRelativeScrollOffset(el) {
        var offsetLeft = 0,
            offsetTop = 0,
            winScroller = getWindowScrollingElement();
        if (el) {
            do {
                var elMatrix = matrix(el),
                    scaleX = elMatrix.a,
                    scaleY = elMatrix.d;
                offsetLeft += el.scrollLeft * scaleX;
                offsetTop += el.scrollTop * scaleY;
            } while (el !== winScroller && (el = el.parentNode));
        }
        return [offsetLeft, offsetTop];
    }

    var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
    var Edge = userAgent(/Edge/i);
    var FireFox = userAgent(/firefox/i);
    var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
    var IOS = userAgent(/iP(ad|od|hone)/i);
    var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

    var PositionGhostAbsolutely = IOS,
        ghostRelativeParent, ghostRelativeParentInitialScroll;

    function css(el, prop, val) {
        var style = el && el.style;
        if (style) {
            if (val === void 0) {
                if (document.defaultView && document.defaultView.getComputedStyle) {
                    val = document.defaultView.getComputedStyle(el, '');
                } else if (el.currentStyle) {
                    val = el.currentStyle;
                }
                return prop === void 0 ? val : val[prop];
            } else {
                if (!(prop in style) && prop.indexOf('webkit') === -1) {
                    prop = '-webkit-' + prop;
                }
                style[prop] = val + (typeof val === 'string' ? '' : 'px');
            }
        }
    }

    function matrix(el, selfOnly) {
        var appliedTransforms = '';
        if (typeof el === 'string') {
            appliedTransforms = el;
        } else {
            do {
                var transform = css(el, 'transform');
                if (transform && transform !== 'none') {
                    appliedTransforms = transform + ' ' + appliedTransforms;
                }
                /* jshint boss:true */
            } while (!selfOnly && (el = el.parentNode));
        }
        var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
        /*jshint -W056 */
        return matrixFn && new matrixFn(appliedTransforms);
    }

    function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
        if (!el.getBoundingClientRect && el !== window) return;
        var elRect, top, left, bottom, right, height, width;
        if (el !== window && el !== getWindowScrollingElement()) {
            elRect = el.getBoundingClientRect();
            top = elRect.top;
            left = elRect.left;
            bottom = elRect.bottom;
            right = elRect.right;
            height = elRect.height;
            width = elRect.width;
        } else {
            top = 0;
            left = 0;
            bottom = window.innerHeight;
            right = window.innerWidth;
            height = window.innerHeight;
            width = window.innerWidth;
        }
        if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
            // Adjust for translate()
            container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
            // Not needed on <= IE11

            if (!IE11OrLess) {
                do {
                    if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
                        var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

                        top -= containerRect.top + parseInt(css(container, 'border-top-width'));
                        left -= containerRect.left + parseInt(css(container, 'border-left-width'));
                        bottom = top + elRect.height;
                        right = left + elRect.width;
                        break;
                    }
                    /* jshint boss:true */

                } while (container = container.parentNode);
            }
        }

        if (undoScale && el !== window) {
            // Adjust for scale()
            var elMatrix = matrix(container || el),
                scaleX = elMatrix && elMatrix.a,
                scaleY = elMatrix && elMatrix.d;

            if (elMatrix) {
                top /= scaleY;
                left /= scaleX;
                width /= scaleX;
                height /= scaleY;
                bottom = top + height;
                right = left + width;
            }
        }
        return {
            top: top,
            left: left,
            bottom: bottom,
            right: right,
            width: width,
            height: height
        };
    }

    function getDraggingItemShadow(draggingObj, container) {
        var draggingItem = draggingObj.item;
        var rect = getRect(draggingItem, true, PositionGhostAbsolutely, true, container);

        if (PositionGhostAbsolutely) {
            // Get relatively positioned parent
            ghostRelativeParent = container;

            while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
                ghostRelativeParent = ghostRelativeParent.parentNode;
            }

            if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
                if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
                rect.top += ghostRelativeParent.scrollTop;
                rect.left += ghostRelativeParent.scrollLeft;
            } else {
                ghostRelativeParent = getWindowScrollingElement();
            }

            ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }

        var shadowDom = draggingItem.cloneNode(true);
        css(shadowDom, 'transition', '');
        css(shadowDom, 'transform', '');
        css(shadowDom, 'box-sizing', 'border-box');
        css(shadowDom, 'margin', 0);
        css(shadowDom, 'top', rect.top);
        css(shadowDom, 'left', rect.left);
        css(shadowDom, 'width', rect.width);
        css(shadowDom, 'height', rect.height);
        css(shadowDom, 'opacity', '0.8');
        css(shadowDom, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
        css(shadowDom, 'zIndex', '100000');
        css(shadowDom, 'pointerEvents', 'none');
        css(shadowDom, 'transform-origin', draggingObj.tapDistanceLeft / parseInt(shadowDom.style.width) * 100 + '% ' + draggingObj.tapDistanceTop / parseInt(shadowDom.style.height) * 100 + '%');
        container.appendChild(shadowDom); // Set transform-origin
        return shadowDom;
    }

    window.SortableJSExportObj = {
        getRect: getRect,
        getDraggingItemShadow: getDraggingItemShadow
    };
})(window);