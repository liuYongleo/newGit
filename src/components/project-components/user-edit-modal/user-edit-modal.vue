<template>
    <el-dialog
        class="user-edit-modal"
        :visible.sync="modal"
        :close-on-click-modal="false"
        append-to-body>

        <modal-main @close="close" title="设置评委信息">
            <div slot="content" class="prompt-modal-content">
                <div class="user-edit-form">
                    <div class="form-item">
                        <label class="form-item-label">专家职务：</label>
                        <div class="form-item-content">{{$store.state.isLeader?'组长':'评委'}}</div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">专家姓名：</label>
                        <div class="form-item-content">
                            <el-input class="default" v-model="editForm.PWNAME"></el-input>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">专家编号：</label>
                        <div class="form-item-content">
                            {{editForm.PWCODE|empty}}
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">身份证号：</label>
                        <div class="form-item-content">
                            <el-input class="default" v-model="editForm.PersonIc"></el-input>
                        </div>
                    </div>
                    <div class="form-item">
                        <label class="form-item-label">工作单位：</label>
                        <div class="form-item-content">
                            <el-input class="default" v-model="editForm.Enterprise"></el-input>
                        </div>
                    </div>
                    <div class="form-item submit-btn-wrap">
                        <button class="hollow-btn" @click="saveForm">保存</button>
                    </div>
                </div>
            </div>
        </modal-main>
    </el-dialog>
</template>

<script>
import modalMain from '@/components/project-components/modal-main/modal-main';

export default {
    name: 'user-edit-modal',
    components: {
        modalMain,
    },
    data () {
        return {
            editForm: {
                PWNAME: this.$store.state.project.PWNAME,
                PWCODE: this.$store.state.project.PWCODE,
                PersonIc: this.$store.state.project.PersonIc,
                Enterprise: this.$store.state.project.Enterprise,
            },
        };
    },
    computed: {
        modal: {
            get () {
                return this.$store.state.userEditModalShow;
            },
            set (value) {
                this.$store.commit('save', {
                    path: 'userEditModalShow',
                    data: value,
                });
            },
        },
    },
    watch: {
        '$store.state.userEditModalShow': function (value) {
            if (value) {
                this.editForm = {
                    PWNAME: this.$store.state.project.PWNAME,
                    PWCODE: this.$store.state.project.PWCODE,
                    PersonIc: this.$store.state.project.PersonIc,
                    Enterprise: this.$store.state.project.Enterprise,
                };
            }
        },
    },
    mounted () {
        // this.modal = true;
    },
    methods: {
        close: function () {
            this.modal = false;
        },
        saveForm: async function () {
            let params = {
                PwName: this.editForm.PWNAME, // 姓名
                PersonIc: this.editForm.PersonIc, // 身份证号码
                Enterprise: this.editForm.Enterprise, // 单位
            };
            await this.portService.saveUserInfo(params);
            this.$message({
                showClose: true,
                message: '保存成功！',
                type: 'success',
            });
            this.modal = false;
            this.$store.commit('save', {
                path: 'project',
                data: Object.assign({}, this.$store.state.project, params),
            });

            let projectRes = await this.portService.getPwBidProjects(this.$store.state.project.ProjCode);
            if (projectRes.data.value[0]) {
                this.$store.commit('save', {
                    path: 'project',
                    data: projectRes.data.value[0],
                });
            }
        },
    },
};
</script>

<style scoped lang="scss">
    .user-edit-modal {
        .prompt-modal-content {
            padding-bottom: 0.3rem;
            max-height: 70vh;
            overflow: auto;
        }

        /deep/ .el-dialog {
            margin: 0 !important;
            width: 44% !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /deep/ .el-dialog__header {
            display: none !important;
        }

        /deep/ .el-dialog__body {
            padding: 0;
        }

        /deep/ .modal-content {
            padding: 0;
        }

        .user-edit-form {
            display: inline-block;
            width: 100%;
            padding: 0 6.425%;
            font-size: $fontL;
            .form-item {
                display: flex;
                align-items: center;
                min-height: 0.48rem;
                margin: 0.3rem 0;
                font-size: 0.27rem;

                &.submit-btn-wrap {
                    justify-content: center;

                    button {
                        width: 1.63rem;
                    }
                }

                &:last-child {
                    margin-bottom: 0;
                }

                .form-item-label {
                    width: 1.55rem;
                    color: #333;
                    text-align: right;
                }

                .form-item-content {
                    flex-grow: 1;

                    .el-input {
                        width: 100%;
                    }
                }
            }
        }
    }


</style>
