<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    created () {
        /* eslint-disable */
        (function(win, doc, vm) {
            var resize = 'orientationchange' in window ? 'orientationchange' : 'resize';

            function change() {
                var htm = doc.documentElement;
                var size = (doc.documentElement.clientWidth / 1920) * 100;
                htm.style.fontSize = size + 'px';
                vm.$store.commit('save', {
                    path: 'rem',
                    data: size,
                });
                vm.$store.commit('save', {
                    path: 'indexCellWidth',
                    data: 0.8 * vm.$store.state.rem < 55 ? 55 : 0.8 * vm.$store.state.rem,
                });
            }

            win.addEventListener(resize, change, false);
            win.addEventListener('load', change, false);
            doc.addEventListener('DOMContentLoaded', change, false);
        })(window, document, this);
        /* eslint-enable */
    },
};
</script>

<style lang="scss">
    @import './assets/styles/index.scss';

    #app {
        height: 100%;
        margin-top: 0;
    }
</style>
