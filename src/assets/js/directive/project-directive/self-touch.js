// 聚焦指令
let selfTouch = {
    // 初始化指令
    bind (el, binding, vnode) {
        let touchStartX;
        let touchEndX;

        el.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
            stopPropagation(e);
        });

        el.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            if (binding.arg === 'swipeleft') {
                if (touchStartX - touchEndX > 100) {
                    if (binding.expression) {
                        binding.value();
                    }
                }
            }

            // swipeRight
            if (binding.arg === 'swiperight') {
                if (touchEndX - touchStartX > 100) {
                    if (binding.expression) {
                        binding.value();
                    }
                }
            }
            stopPropagation(e);
        });
    },
};

function stopPropagation (e) {
    e = window.event || e;

    if (document.all) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
}

export default selfTouch;
