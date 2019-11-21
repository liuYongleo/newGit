// 聚焦指令
let focus = {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {
        // 聚焦元素
        if (binding.value) {
            el.focus();
        }
    },
    update: function (el, binding) {
        // 聚焦元素
        if (binding.value !== binding.oldValue) {
            el.focus();
        }
    },
};

export default focus;
