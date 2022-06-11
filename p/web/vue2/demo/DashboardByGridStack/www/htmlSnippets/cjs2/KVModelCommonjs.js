var KVModel = /** @class */ (function () {
    function KVModel(obj) {
        if (obj && obj.constructor === Object) {
            this.key = Object.hasOwnProperty.call(obj, "Key") ? obj.Key : "";
            this.value = Object.hasOwnProperty.call(obj, "Value") ? obj.Value : "";
        }
        else {
            this.key = "";
            this.value = "";
        }
    }
    return KVModel;
}());
module.exports.KVModel = KVModel;