(function anonymous() {
    with (this) {
        return _c(
            "div",
            {
                attrs: {
                    id: "app"
                }
            },
            [
                _c("h2", [_v(_s(msg))]),
                _v(" "),
                _c("p", [_v("这里再重复一遍：" + _s(msg))]),
                _v(" "),
                _c("p", [
                    _c("label", [
                        _v("修改msg："),
                        _c("input", {
                            directives: [
                                {
                                    name: "model",
                                    rawName: "v-model",
                                    value: msg,
                                    expression: "msg"
                                }
                            ],
                            attrs: {
                                type: "text"
                            },
                            domProps: {
                                value: msg
                            },
                            on: {
                                input: function ($event) {
                                    if ($event.target.composing) return;
                                    msg = $event.target.value;
                                }
                            }
                        })
                    ])
                ])
            ]
        );
    }
});
