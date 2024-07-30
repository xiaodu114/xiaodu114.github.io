export default {
    name: "IframeWrapper",
    template: "#iframeWrapperTemplate",
    props: {
        src: {
            type: String,
            default() {
                return "";
            }
        }
    }
};
