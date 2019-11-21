// 防止按钮重复点击
let dbClick = {
    inserted: function (el, binding) {
        el.addEventListener('click', e => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, 1000);
            }
        });
    },
};

export default dbClick;
