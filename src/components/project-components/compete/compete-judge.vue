<template>
    <el-dialog class="dy-dialog cj-dialog"
        title="竞争有效性判断"
        v-bind="$attrs"
        top="0"
        append-to-body
        :showClose="false"
        :close-on-click-modal="false"
        @close="$emit('update:visible', false)">
        <section class="cj-main">
            <p class="cj-title">当前有效投标人数量不足3家，是否继续评估</p>
            <div class="cj-radio">
                <el-radio v-model="form.isContinue"
                    :label="1">继续</el-radio>
                <el-radio v-model="form.isContinue"
                    :label="2">不继续</el-radio>
            </div>
            <el-row class="param-row">
                <el-col :span="4">
                    评审意见
                </el-col>
                <el-col :span="20">
                    <el-input type="textarea"
                        :rows="5"
                        v-model="form.advice">
                    </el-input>
                </el-col>
            </el-row>
            <div class="cj-footer">
                <button class="hollow-btn"
                    @click="confirm($event)">确定</button>
            </div>
        </section>
    </el-dialog>
</template>

<script>
export default {
    name: 'compete-judge',
    data () {
        return {
            dialogVisible: false,
            form: {
                isContinue: 0,
                advice: '',
            },
        };
    },
    methods: {
        confirm (e) {
            // this.activeBtn(e);
            if (this.form.isContinue === 0) {
                return this.alert({content: '请选择是否继续评审？', });
            }
            // if (this.form.advice.trim() === '') {
            //     return this.alert({content: '请填写评审意见', });
            // }
            this.$emit('submit', this.form);
        },
    },
};
</script>

<style lang="scss" scoped>
    .cj-main {
        font-size: 0.26rem;
        color: #333;

        .cj-title {
            text-align: center;
            font-weight: 700;
            margin-bottom: 0.4rem;
        }

        .cj-radio {
            text-align: center;
            margin-bottom: 0.28rem;
        }

        .cj-footer {
            text-align: center;
            margin-top: 0.3rem;
        }

        .hollow-btn {
            padding-left: 0.57rem;
            padding-right: 0.57rem;

            &:active {
                background-color: $colorActive;
                color: #fff;
            }
        }
    }
</style>

<style lang="scss">
    body {
        .cj-dialog {
            .el-dialog {
                width: 8.54rem;
            }

            .el-dialog__body {
                padding: 0.47rem 0.3rem 0.3rem;
            }

            .el-radio__label,
            .el-radio__input.is-checked + .el-radio__label {
                color: #333;
                font-size: 0.26rem;
            }

            .el-radio__input .el-radio__inner {
                width: 0.21rem;
                height: 0.21rem;
            }

            .el-radio__inner::after {
                width: 0.09rem;
                height: 0.09rem;
            }
        }
    }
</style>
