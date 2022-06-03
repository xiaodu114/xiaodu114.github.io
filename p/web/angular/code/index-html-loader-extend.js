//  这些用来特殊处理 type="text/ng-template"
const path = require("path");
const htmlparser2 = require("htmlparser2");
const render = require("dom-serializer").default;
const CSSselect = require("css-select");
const domutils = require("domutils");

function handleNGTemplate(content, loaderContext, config){
    const htmlElement = htmlparser2.parseDocument(content);
    let ngTemplates = CSSselect.selectAll(
        'script[type="text/ng-template"]',
        htmlElement
    );
    if (!ngTemplates && ngTemplates.length) return content;
    let isNeedReplace = false;
    [...ngTemplates].forEach((ngTemplate, index) => {
        ngTemplate.childNodes.forEach((childNode) => {
            const innerElement = htmlparser2.parseDocument(
                render(childNode, {
                    emptyAttrs: false,
                    selfClosingTags: false,
                    decodeEntities: false,
                })
            );
            //  查找并处理特殊元素
            let imgElements = CSSselect.selectAll(
                "img",
                innerElement
            );
            if (!(imgElements && imgElements.length))
                return;
            [...imgElements].forEach((img) => {
                if (
                    img.attribs.src &&
                    !path.isAbsolute(img.attribs.src)
                ) {
                    isNeedReplace = true;
                    img.attribs.src = path
                        .join(
                            config.PUBLICPATH,
                            path.relative(
                                config.absolutePath,
                                path.resolve(
                                    path.resolve(
                                        loaderContext.resourcePath,
                                        ".."
                                    ),
                                    img.attribs.src
                                )
                            )
                        )
                        .split(path.sep)
                        .join("/");
                }
            });
            domutils.replaceElement(
                childNode,
                innerElement
            );
        });
    });
    return isNeedReplace
        ? render(htmlElement, {
            emptyAttrs: false,
            selfClosingTags: false,
            decodeEntities: false,
        })
        : content;
}

module.exports = handleNGTemplate;