<template>
    <div class="side-bar-wrap" :class="[$store.state.barPosition]">
        <!-- 主导航栏 -->
        <div class="side-bar">
            <div class="logo-wrap">
                <img src="../../../../static/img/side-bar/logo.png" class="logo" />
            </div>
            <section class="side-bar-list-wrap">
                <ul class="side-bar-list center">
                    <li class="bar-list-item" v-for="item in menu" :key="item.id" @click="selectMenu(item)">
                        <img class="bar-list-icon"
                            :src="item.id === $store.state.selectedMenu ? item.iconActive : item.icon" />
                        <p :class="{'active': item.id === $store.state.selectedMenu}">{{item.name}}</p>
                        <i class="selected-icon"
                            :class="[item.id === $store.state.selectedMenu ? 'active' : '', $store.state.barPosition]"></i>
                    </li>
                    <li class="bar-list-item" @click="showGuide">
                        <img class="bar-list-icon" src="../../../../static/img/side-bar/menu-4.png" />
                        <p>指引</p>
                    </li>
                </ul>
            </section>
            <ul class="side-bar-list">
                <li class="bar-list-item" @click="palyAudio">
                    <img class="bar-list-icon"
                        :src="audioPlaying ? './static/img/side-bar/menu-5-active.png' : './static/img/side-bar/menu-5.png'" />
                </li>
            </ul>
        </div>
        <transition :name="'menu-show-' + $store.state.barPosition">
            <!-- 评审 -->
            <side-bar-review v-show="$store.state.selectedMenu === 1"></side-bar-review>
        </transition>
        <transition :name="'menu-show-' + $store.state.barPosition">
            <!-- 菜单栏 -->
            <side-bar-menu v-show="$store.state.selectedMenu === 2" v-self-touch:swipeleft="menuSwipeLeft"
                v-self-touch:swiperight="menuSwipeRight" @closeBar="closeBar"></side-bar-menu>
        </transition>
        <transition :name="'flow-show-' + $store.state.barPosition">
            <!-- 流程栏 -->
            <side-bar-flow v-show="$store.state.selectedMenu === 3" v-self-touch:swipeleft="menuSwipeLeft"
                v-self-touch:swiperight="menuSwipeRight" @selectFlow="selectFlow" @closeBar="closeBar">
            </side-bar-flow>
        </transition>
        <transition :name="'user-show-' + $store.state.barPosition">
            <!-- 个人中心 (从菜单栏中点击唤起)-->
            <side-bar-user v-show="$store.state.personalVisible" v-self-touch:swipeleft="menuSwipeLeft"
                v-self-touch:swiperight="menuSwipeRight"></side-bar-user>
        </transition>
        <!-- 定性定量结果汇总 -->
        <side-bar-summary :dialogVisible.sync="summaryDialogVisible" :selectedFlowIndex="selectedFlowIndex"></side-bar-summary>
    </div>
</template>

<script>
import sideBarReview from '@/components/project-components/side-bar/side-bar-review';
import sideBarMenu from '@/components/project-components/side-bar/side-bar-menu';
import sideBarFlow from '@/components/project-components/side-bar/side-bar-flow';
import sideBarUser from '@/components/project-components/side-bar/side-bar-user';
import sideBarSummary from '@/components/project-components/side-bar/side-bar-summary';

export default {
    name: 'side-bar',
    components: {
        sideBarReview,
        sideBarMenu,
        sideBarFlow,
        sideBarUser,
        sideBarSummary,
    },
    data () {
        return {
            menu: [
                {
                    id: 1,
                    name: '评审',
                    icon: './static/img/side-bar/menu-1.png',
                    iconActive: './static/img/side-bar/menu-1-active.png',
                },
                {
                    id: 2,
                    name: '菜单',
                    icon: './static/img/side-bar/menu-2.png',
                    iconActive: './static/img/side-bar/menu-2-active.png',
                },
                {
                    id: 3,
                    name: '流程',
                    icon: './static/img/side-bar/menu-3.png',
                    iconActive: './static/img/side-bar/menu-3-active.png',
                },
            ],
            audioPlaying: false, // 语音是否在播放
            personalVisible: false,
            selectedFlowIndex: 1, // 选择流程栏的index
            summaryDialogVisible: false,
        };
    },
    methods: {
        async selectMenu (menuItem) {
            // 打开流程栏查接口
            if (menuItem.id === 3 && this.$store.state.selectedMenu !== 3) {
                this.$store.dispatch('getFlowData', 1);
            }
            // 点评审没有流程数据的话插接口
            if (menuItem.id === 1 && !this.$store.state.flowDataPicker) {
                this.$store.dispatch('getFlowData');
            }
            this.$store.state.selectedMenu === menuItem.id
                ? this.$store.commit('save', { path: 'selectedMenu', data: 0, })
                : this.$store.commit('save', { path: 'selectedMenu', data: menuItem.id, });

            this.$store.state.personalVisible && this.$store.commit('save', { path: 'personalVisible', data: false, });
        },
        // 播放语音
        palyAudio () {
            this.audioPlaying = !this.audioPlaying;
        },
        // 显示指引
        showGuide () {
            this.$store.commit('save', { path: 'selectedMenu', data: 0, });
        },
        // 选择流程栏流程
        selectFlow (flowItem, index) {
            // console.log(flowItem);
            if ([ 'leader', 'pbbg', 'pbjs', ].indexOf(flowItem.FlowId) === -1 && [ '价格评审', '评审汇总', ].indexOf(flowItem.FlowName) === -1) {
                if (flowItem.EvalStatus_Flow === 4) {
                    // 当前评审状态为 4(正在进行) 时，打开评审框
                    if (index < this.$store.state.flowDataPicker.length) {
                        this.$store.commit('save', { path: 'reviewStep', data: index + 1, });
                        this.$store.commit('save', { path: 'selectedMenu', data: 1, });
                    }
                } else if (flowItem.EvalStatus_Flow === 2) {
                    // 当前评审状态为 2(已完成) 时，打开评审汇总结果框
                    this.selectedFlowIndex = index;
                    this.summaryDialogVisible = true;
                }
            }
            this.reviewJump(flowItem);
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
        closeBar () {
            this.$store.commit('save', { path: 'selectedMenu', data: 0, });
        },
    },
};
</script>

<style lang="scss" scoped>
    $sideBarBgColor: #293134;
    $menuFontColor: #969696;
    $menuFontSize: 0.2rem;

    .side-bar-wrap {
        position: absolute;
        display: flex;
        height: 100%;
        z-index: 100;
        top: 0;
        bottom: 0;
        // overflow: hidden;
    }

    .side-bar-wrap.left {
        left: 0;
        flex-direction: row;
    }

    .side-bar-wrap.right {
        right: 0;
        flex-direction: row-reverse;
    }

    .side-bar {
        position: relative;
        width: $sideBarWidth;
        height: 100%;
        background-color: $sideBarBgColor;
        z-index: 1;

        .logo-wrap {
            width: inherit;
            height: 0.6rem;
            margin: 0.32rem auto 0;

            .logo {
                width: 100%;
                height: 100%;
            }
        }

        .side-bar-list-wrap {
            display: flex;
            align-items: center;
            height: 100%;
            padding-bottom: .92rem;
        }

        .side-bar-list {
            position: absolute;
            bottom: 0.3rem;
            width: inherit;
            text-align: center;

            &.center {
                position: relative;
                width: 100%;
            }

            .bar-list-item {
                position: relative;
                color: $menuFontColor;
                font-size: $menuFontSize;
                margin-bottom: 0.8rem;

                &:last-child {
                    margin-bottom: 0;
                }

                .bar-list-icon {
                    width: 100%;
                    height: 0.4rem;
                    margin-bottom: 0.03rem;
                }

                .active {
                    color: $colorActive;
                }

                .selected-icon {
                    display: none;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                    width: 0;
                    height: 0;
                    border: 0.07rem solid;
                }

                .selected-icon.active {
                    display: block;
                }

                .selected-icon.left {
                    right: -0.08rem;
                    border-color: #fff transparent transparent #fff;
                }

                .selected-icon.right {
                    left: -0.08rem;
                    border-color: transparent #fff #fff transparent;
                }
            }
        }
    }

    @mixin pa {
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .menu-show-left-enter,
    .menu-show-left-leave-to,
    .flow-show-left-enter,
    .flow-show-left-leave-to {
        @include pa;
        transform: translateX(-100%);
    }

    .menu-show-right-enter,
    .menu-show-right-leave-to,
    .flow-show-right-enter,
    .flow-show-right-leave-to {
        @include pa;
        transform: translateX(100%);
    }

    .menu-show-left-enter-active,
    .menu-show-left-leave-active,
    .flow-show-left-enter-active,
    .flow-show-left-leave-active {
        @include pa;
        left: $sideBarWidth;
        transition: all 0.2s ease;
    }

    .menu-show-right-enter-active,
    .menu-show-right-leave-active,
    .flow-show-right-enter-active,
    .flow-show-right-leave-active {
        @include pa;
        right: $sideBarWidth;
        transition: all 0.2s ease;
    }

    // 个人中心动画
    .user-show-left-enter,
    .user-show-left-leave-to {
        z-index: -1 !important;
        transform: translateX(-100%);
    }

    .user-show-right-enter,
    .user-show-right-leave-to {
        transform: translateX(100%);
    }

    .user-show-left-enter-active,
    .user-show-left-leave-active,
    .user-show-right-enter-active,
    .user-show-right-leave-active {
        transition: all 0.2s ease;
    }
</style>
