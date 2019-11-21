<template>
    <div class="home full">
        <side-bar></side-bar>
        <router-view class="main"
                     :class="['side-bar-' + $store.state.selectedMenu, $store.state.barPosition]"></router-view>
        <user-edit-modal></user-edit-modal>
        <office-view-modal></office-view-modal>
    </div>
</template>

<script>
import sideBar from '@/components/project-components/side-bar/side-bar';
import userEditModal from '@/components/project-components/user-edit-modal/user-edit-modal';
import officeViewModal from '@/components/project-components/office-view-modal/office-view-modal';

export default {
    name: 'home',
    components: {
        sideBar,
        userEditModal,
        officeViewModal,
    },
    data () {
        return {
            leaderGetTimer: null, // 获取当前是否产生组长得timer
            msgTimer: null,
            dealingMsg: false, // 正在处理消息
        };
    },
    created () {
        this.getLeader();
        this.getMessage();
    },
    watch: {
        '$store.state.competeVisible' (value) {
            if (!value) {
                this.dealMsg();
            }
        },
    },
    methods: {
        async getLeader () {
            let leaderVoted = await this.$store.dispatch('getLeader');
            if (!leaderVoted) {
                this.leaderGetTimer = setInterval(() => {
                    this.intervalGetLeader();
                }, 5000);
            }
        },

        async intervalGetLeader () {
            let leaderVoted = await this.$store.dispatch('getLeader');
            if (leaderVoted) {
                clearInterval(this.intervalGetLeader);
            }
        },

        // 轮询消息接口
        getMessage () {
            if (!this.msgTimer) {
                this.msgTimer = setInterval(() => {
                    if (this.$store.state.authorization) {
                        this.getMsgApi();
                    }
                }, 5000);
            }
        },

        async getMsgApi () {
            if (this.dealingMsg) {
                // 正在处理消息时停止轮询
                this.msgTimer && clearInterval(this.msgTimer);
                this.msgTimer = null;
            } else {
                let res = await this.portService.getMessage();
                if (res.code === 200 && res.data.value.length) {
                    res = res.data.value;
                    this.msgData = res;
                    this.dealMsg();
                }
            }
        },

        // 处理消息
        dealMsg () {
            // console.log('msg', this.msgData);
            this.dealingMsg = true;
            if (this.msgData.length) {
                this.forEachMsg(this.msgData[0]);
            } else {
                this.dealingMsg = false;
                this.getMessage();
            }
        },

        forEachMsg (item) {
            if (item.消息类型 === 0) {
                // 普通消息，显示即可
                this.$confirm(item.SendMessage, '提示', {
                    customClass: 'dy-msg-box',
                    confirmButtonClass: 'el-button--success',
                    showClose: false,
                    showCancelButton: false,
                    closeOnClickModal: false,
                }).then(() => {
                    this.readMsg(item.Id);
                    this.msgData.splice(0, 1);
                    this.dealMsg();
                });
            } else if (item.消息类型 === 1) {
                // 否决投标
                this.msgData.splice(0, 1);
                this.dealMsg();
            } else if (item.消息类型 === 7) {
                // 打开竞争有效性判断窗
                this.alert({content: item.SendMessage,
                    cb: () => {
                        this.$store.commit('save', {path: 'competeVisible', data: true, });
                        this.readMsg(item.Id);
                        this.msgData.splice(0, 1);
                        // this.dealMsg();
                    }, });
            } else {
                this.msgData.splice(0, 1);
                this.dealMsg();
            }
        },

        // 消息已读
        async readMsg (id) {
            await this.portService.readMessage(id);
        },
    },
    beforeDestroy () {
        clearInterval(this.leaderGetTimer);
        clearInterval(this.msgTimer);
        this.msgTimer = null;
    },

};
</script>

<style scoped lang="scss">
    .home {
        .main {
            position: absolute;
            height: 100%;

            &.left {
                right: 0;
            }

            &.right {
                left: 0;
            }
        }

        .side-bar-0,
        .side-bar-1 {
            width: $sideBar1;
        }

        .side-bar-2 {
            width: $sideBar2;
        }

        .side-bar-3 {
            width: $sideBar3;
        }
    }
</style>
