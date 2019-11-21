<template>
    <div class="user-wrap"
         :class="[$store.state.barPosition]">
        <div class="user">
            <modal-main @close="close">
                <div class="review-modal-title"
                     slot="title">
                    <span class="title-text">个人中心</span>
                </div>
                <div class="user-content-wrap"
                     slot="content">
                    <h6>
                        <span>评委信息</span>
                        <span class="green-color" @click="showUserEditModal">编辑</span>
                    </h6>
                    <div class="modal-form them-text">
                        <div class="form-item">
                            <label class="form-item-label">专家职务:</label>
                            <div class="form-item-content">{{$store.state.isLeader?'组长':'评委'}}</div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">专家姓名:</label>
                            <div class="form-item-content">{{$store.state.project.PWNAME|empty}}</div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">专家编号:</label>
                            <div class="form-item-content">{{$store.state.project.PWCODE|empty}}</div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">身份证号:</label>
                            <div class="form-item-content">{{$store.state.project.PersonIc|empty}}</div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">工作单位:</label>
                            <div class="form-item-content">{{$store.state.project.Enterprise|empty}}</div>
                        </div>
                    </div>
                    <h6>设置</h6>
                    <div class="modal-form them-text">
                        <div class="form-item">
                            <label class="form-item-label">评估方式:</label>
                            <div class="form-item-content">
                                <el-radio v-model="config.method"
                                          :label="1">同步
                                </el-radio>
                                <el-radio v-model="config.method"
                                          :label="2">异步
                                </el-radio>
                            </div>
                        </div>
                        <!-- <div class="form-item">
                            <label class="form-item-label">系统风格:</label>
                            <div class="form-item-content">
                                <el-radio v-model="config.style"
                                          :label="1">固定操作版
                                </el-radio>
                                <el-radio v-model="config.style"
                                          :label="2">按钮悬浮版
                                </el-radio>
                            </div>
                        </div> -->
                        <div class="form-item">
                            <label class="form-item-label">操作习惯:</label>
                            <div class="form-item-content">
                                <el-radio v-model="config.position"
                                          label="left">左手
                                </el-radio>
                                <el-radio v-model="config.position"
                                          label="right">右手
                                </el-radio>
                            </div>
                        </div>
                    </div>
                </div>
            </modal-main>
        </div>
    </div>
</template>

<script>
import modalMain from '@/components/project-components/modal-main/modal-main';

export default {
    name: 'side-bar-user',
    components: {
        modalMain,
    },
    data () {
        return {
            config: {
                method: 1,
                style: 1,
                position: 1,
            },
        };
    },
    watch: {
        'config.method' (value) {
            this.$store.commit('save', {path: 'reviewType', data: value, });
        },
        'config.position' (value) {
            this.$store.commit('save', {path: 'barPosition', data: value, });
        },
    },
    mounted () {
        // console.log(this.$store.state.project);
        this.config.method = this.$store.state.reviewType;
        this.config.position = this.$store.state.barPosition;
    },
    methods: {
        close () {
            this.$store.commit('save', {path: 'personalVisible', data: false, });
        },
    },
};
</script>

<style scoped lang="scss">
    .user-wrap {
        position: absolute;
        overflow: hidden;
        bottom: 0;
        background-color: #fff;
        border-radius: 0 0.05rem 0 0;
        box-shadow: 2px -2px 4px 0 #cbcbcb;

        &.left {
            left: $sideBarWidth;
        }

        &.right {
            right: $sideBarWidth;
        }

        .user {
            width: 6.3rem;
            padding-bottom: 0.3rem;
        }

        .user-content-wrap {
            padding-left: 0.05rem;
            padding-right: 0.05rem;
        }

        /deep/ .modal-main {
            .modal-content {
                padding: 0.17rem 0.2rem 0 0.2rem;
            }
        }

        h6 {
            display: flex;
            justify-content: space-between;
            padding: 0.2rem 0;
            font-size: 0.26rem;
            color: #333;
        }

        .content-bottom {
            padding-top: 0.3rem;
            text-align: center;

            .next-btn {
                @include hollow-btn;
                height: 0.45rem;
                border-radius: 0.23rem;
            }
        }
    }
</style>
