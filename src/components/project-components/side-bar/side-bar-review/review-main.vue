<!--评审模态框的内容模板-->
<template>
    <div class="modal-main">
        <div class="modal-header"
            @click="dblclickHead"
            v-self-touch:swipeleft="flowSwipeLeft"
            v-self-touch:swiperight="flowSwipeRight">
            <slot name="title">
                <div class="review-modal-title"
                    @click="showPicker">
                    <span class="title-text">{{$store.state.reviewStep}}.{{title}}</span>
                    <span class="title-icon-wrap">
                        <i class="iconfont icon-bottom-arrow"></i>
                    </span>
                </div>
            </slot>
            <section class="swipe-img-wrap">
                <img class="swipe-img"
                    v-show="$store.state.reviewWinState !== 1"
                    src="../../../../../static/img/side-bar/ps-swipe.png">
            </section>
            <section>
                <img class="head-icon"
                    v-show="$store.state.reviewWinState !== 1"
                    src="../../../../../static/img/side-bar/minimize.png"
                    @click="minimize">
                <img class="head-icon"
                    v-show="$store.state.reviewWinState !== 1"
                    src="../../../../../static/img/side-bar/maximize.png"
                    @click="maximize">
                <i class="close-icon iconfont icon-fork"
                    @click="close"></i>
            </section>
        </div>
        <div class="modal-content"
            v-self-touch:swipeleft="menuSwipeLeft"
            v-self-touch:swiperight="menuSwipeRight">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-main',
    props: {
        title: {
            type: String,
            require: true,
        },
    },
    methods: {
        close () {
            this.$emit('close');
        },
        showPicker () {
            this.$emit('showPicker');
        },
        // 双击header变半屏
        dblclickHead (e) {
            if (this.$store.state.reviewWinState === 1) {
                if (this.clickTime) {
                    let time = new Date().getTime();
                    if (time - this.clickTime < 300) {
                        this.$store.commit('save', { path: 'reviewWinState', data: 2, });
                    } else {
                        this.clickTime = time;
                    }
                } else {
                    this.clickTime = new Date().getTime();
                }
            }
        },
        menuSwipeLeft () {
            if (this.$store.state.barPosition === 'left') {
                if (this.$store.state.personalVisible) {
                    this.$store.commit('save', { path: 'personalVisible', data: false, });
                } else {
                    // 向左滑动关闭菜单栏
                    this.$store.commit('save', { path: 'selectedMenu', data: 0, });
                }
            }
        },
        menuSwipeRight () {
            if (this.$store.state.barPosition === 'right') {
                if (this.$store.state.personalVisible) {
                    this.$store.commit('save', { path: 'personalVisible', data: false, });
                } else {
                    // 向右滑动关闭菜单栏
                    this.$store.commit('save', { path: 'selectedMenu', data: 0, });
                }
            }
        },
        async flowSwipeLeft () {
            let flowData = this.$store.state.flowDataPicker || {};
            let reviewStep = this.$store.state.reviewStep || {};
            let goStep = reviewStep - 1;
            if (goStep > 0) {
                let flag = {Result: true, };
                if (goStep !== 0 && flowData[goStep - 1].FlowId !== 'leader') {
                    const res = await this.portService.checkCanGoFlow(flowData[goStep - 1].FlowName);
                    flag = res.data.value;
                }
                if (flag.Result) {
                    this.pickerVisible = false;
                    this.$store.commit('save', { path: 'reviewStep', data: goStep, });
                    this.reviewJump(flowData[goStep - 1]);
                } else {
                    this.flowBtnAlert(flag.ResultMessage);
                }
            }
        },
        async flowSwipeRight () {
            let flowData = this.$store.state.flowDataPicker || {};
            let reviewStep = this.$store.state.reviewStep || {};
            let goStep = reviewStep + 1;
            if (goStep <= flowData.length) {
                let flag = {Result: true, };
                if (flowData[goStep - 1].FlowId !== 'pbbg') {
                    const res = await this.portService.checkCanGoFlow(flowData[goStep - 1].FlowName);
                    flag = res.data.value;
                }
                if (flag.Result) {
                    this.pickerVisible = false;
                    this.$store.commit('save', { path: 'reviewStep', data: goStep, });
                    this.reviewJump(flowData[goStep - 1]);
                } else {
                    this.flowBtnAlert(flag.ResultMessage);
                }
            }
        },
        maximize () {
            this.$store.commit('save', { path: 'reviewWinState', data: 3, });
        },
        minimize () {
            if (this.$store.state.reviewWinState === 3) {
                this.$store.commit('save', { path: 'reviewWinState', data: 2, });
            } else if (this.$store.state.reviewWinState === 2) {
                this.$store.commit('save', { path: 'reviewWinState', data: 1, });
            }
        },
    },
};
</script>

<style scoped lang="scss">
    .modal-main {
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.21rem;
            font-size: 0.26rem;
            color: #fff;
            background-color: $green;

            .close-icon {
                font-size: 0.25rem;
            }

            .head-icon {
                width: 0.23rem;
                height: 0.23rem;
                margin-right: 0.3rem;
            }

            .swipe-img-wrap {
                height: .2rem;
            }

            .swipe-img {
                width: 2.46rem;
                height: .39rem;
            }
        }

        .modal-content {
            background-color: #fff;
            padding: 0.17rem 0.15rem 0 0.15rem;
        }

        .modal-form {
            padding: 0.06rem 0.1rem;
            background-color: #f2f2f2;

            .form-item {
                display: flex;
                padding: 0.13rem 0;

                .form-item-label {
                    width: 1.25rem;
                    padding-right: 0.15rem;
                    text-align: right;
                }

                .form-item-content {
                    flex-grow: 1;
                    color: #999;
                }

                &.them-text {
                    padding: 0.13rem 0;

                    .form-item-content {
                        color: #999;
                    }
                }
            }
        }
    }
</style>
