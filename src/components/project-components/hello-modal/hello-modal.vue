<template>
    <el-dialog
        :visible.sync="modal"
        :show-close="false"
        :close-on-click-modal="false"
        append-to-body
        width="8.3rem">
        <div class="modal-content-wrap">
            <div class="content">
                <div class="text-wrap">
                    <p>
                        <span class="last-name">{{$store.state.project.PWNAME|xing}}专家</span>
                        <span>您好，</span>
                    </p>
                    <p>欢迎进入大邑智能评标系统!</p>
                </div>
                <button class="confirm-btn" @click="editUser">完善个人信息</button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'hello-modal',
    computed: {
        modal: {
            get () {
                return this.$store.state.helloModalShow;
            },
            set (value) {
                this.$store.commit('save', {
                    path: 'helloModalShow',
                    data: value,
                });
            },
        },
    },
    mounted () {
        // this.modal = true;
    },
    methods: {
        editUser () {
            this.modal = false;
            this.showUserEditModal();
        },
    },
};
</script>

<style scoped lang="scss">
    /deep/ .el-dialog {
        margin: 0 !important;
        top: 50%;
        left: 50%;
        height: 4.8rem;
        transform: translate(-50%, -50%);
    }

    /deep/ .el-dialog__header {
        display: none;
    }

    /deep/ .el-dialog__body {
        height: 100%;
        width: 100%;
        padding: 0;
    }

    .modal-content-wrap {
        position: relative;
        height: 100%;
        width: 100%;
        background: url('../../../../static/img/hellow-modal-bg.png') no-repeat 0 -1.37rem;
        background-size: 7.66rem 7.63rem;

        .content {
            position: absolute;
            top: 1.8rem;
            left: 3.6rem;

            .text-wrap {
                p {
                    margin-bottom: 0.25rem;
                    font-size: 0.32rem;
                    color: #333;

                    .last-name {
                        font-size: 0.36rem;
                        color: $green;
                    }
                }
            }

            button {
                margin-top: 0.3rem;
            }
        }

    }


</style>
