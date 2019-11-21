// 评分
<template>
    <div>
        <el-input ref="field"
            v-if="needInput"
            :placeholder="placeholder"
            v-model="score"
            @click.native="fieldClick">
        </el-input>
        <el-dialog class="review-score"
            :visible.sync="modalVisible"
            :close-on-click-modal="false"
            append-to-body
            width="40%"
            top="2vh">
            <modal-main @close="close">
                <template slot="title">
                    <div>
                        <slot name="title">{{title}}</slot>
                    </div>
                </template>
                <div slot="content"
                    class="prompt-modal-content">
                    <p class="comp-name">{{compName}}</p>
                    <div class="cont-row">
                        <p class="title">{{inputTitle}}</p>
                        <el-input ref="score"
                            class="input"
                            type="number"
                            v-model="scoreCopy"
                            @keydown.native.enter="next">
                        </el-input>
                    </div>
                    <div class="cont-row">
                        <p class="title">理由</p>
                        <el-input ref="textarea"
                            class="input"
                            type="textarea"
                            :placeholder="placeholder"
                            v-model="reasonCopy"
                            :rows="4">
                        </el-input>
                    </div>
                    <div class="footer">
                        <button class="confirm-btn"
                            @click="confirm">确定</button>
                    </div>
                </div>
            </modal-main>
        </el-dialog>
    </div>
</template>

<script>
import modalMain from '@/components/project-components/modal-main/modal-main';
export default {
    name: 'review-score',
    props: {
        // 分数
        score: {
            default: '',
        },
        // 理由
        reason: {
            default: '',
        },
        // 点击数据index
        dataIndex: {
            defalut: '',
        },
        // 满分，不能超过满分
        maxScore: {
            default: '',
        },
        // 模态框标题
        title: {
            default: '',
        },
        placeholder: {
            default: '',
        },
        // 公司名称
        compName: {
            default: '',
        },
        // 是否需要理由
        needReason: {
            default: false,
        },
        // 是否为打分
        isScore: {
            default: false,
        },
        // 是否需要input栏
        needInput: {
            default: true,
        },
        showModal: {
            defalut: false,
        },
        inputTitle: {
            defalut: '分数',
        },
        // 验证reg
        validReg: {
            defalut: '',
        },
        // 验证错误时提示的文字
        validTest: {
            defalut: '',
        },
        // 是否可编辑
        formEditable: {
            defalut: true,
        },
    },
    data () {
        return {
            modalVisible: false,
            scoreCopy: '',
            reasonCopy: '',
        };
    },
    watch: {
        modalVisible (value) {
            if (value) {
                if (!this.formEditable) {
                    this.modalVisible = false;
                    this.alertCanNotEdit();
                } else {
                    this.scoreCopy = this.score;
                    this.reasonCopy = this.reason;
                    this.$nextTick(() => {
                        this.$refs.score.focus();
                    });
                }
            }
        },
        showModal (value) {
            if (!this.formEditable) {
                this.modalVisible = false;
                this.$emit('update:showModal', false);
                this.alertCanNotEdit();
            } else {
                if (value) {
                    this.modalVisible = true;
                }
            }
        },
    },
    components: {
        modalMain,
    },
    methods: {
        fieldClick () {
            this.$refs.field.blur();
            this.modalVisible = true;
        },
        close () {
            this.modalVisible = false;
            if (this.showModal) {
                this.$emit('update:showModal', false);
            }
        },
        confirm () {
            const data = {
                score: this.scoreCopy,
                reason: this.reasonCopy,
                index: this.dataIndex,
            };
            const res = this.valid(data);
            if (res) {
                this.$emit('confirm', data);
                this.close();
            }
        },
        // 验证
        valid (data) {
            if (data.score === '') {
                this.alert({ content: `请填写${this.inputTitle}`, });
                return false;
            }
            if (this.isScore) {
                if (data.score > this.maxScore) {
                    this.alert({ content: '评分不能超过满分！', });
                    return false;
                } else if (data.score < 0) {
                    this.alert({ content: '评分不能为负数！', });
                    return false;
                }
            }
            if (this.validReg) {
                let reg = new RegExp(this.validReg);
                if (!reg.test(data.score)) {
                    console.log(data.score);
                    this.alert({ content: this.validTest, });
                    return false;
                }
            }
            if (this.needReason) {
                if (this.needReason && data.reason === '') {
                    this.alert({ content: '请填写理由！', });
                    return false;
                }
            }
            return true;
        },
        next () {
            // this.$refs.textarea.focus();
        },
    },
};
</script>

<style lang="scss" scoped>
    .review-score {
        .comp-name {
            color: #333;
            font-size: 0.28rem;
            text-align: center;
            margin: 0.1rem 0 0.3rem;
        }

        .cont-row {
            display: flex;
            margin-bottom: 0.2rem;

            .title {
                width: 0.7rem;
                font-size: 0.26rem;
                color: #666;
                padding-top: 0.12rem;
            }
            .input {
                flex: 1;
            }
        }

        .footer {
            text-align: center;

            .confirm-btn {
                @include hollow-btn;
                padding-left: 0.6rem;
                padding-right: 0.6rem;

                &:active {
                    background-color: $colorActive;
                    color: #fff;
                }
            }
        }

        // el-input
        /deep/ .el-input {
            .el-input__inner {
                font-size: 0.26rem;
                color: inherit;
                font-family: $fontFamily;
                height: 0.55rem;
                line-height: 0.55rem;
                border: 1px solid #d0d0d0;
                background-color: inherit;
                border-radius: 0;
            }
        }
    }

    /deep/ .el-dialog__header {
        display: none !important;
    }

    /deep/ .el-dialog__body {
        padding: 0;
    }

    .prompt-modal-content {
        padding-bottom: 0.24rem;
    }
</style>
