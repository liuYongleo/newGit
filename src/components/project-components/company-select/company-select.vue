<template>
    <div class="cs-main" :class="[position, theme]">
        <section class="btn-cont">
            <el-select class="cs-select-cont" v-model="selectedValue" placeholder="请选择" @change="valueChange">
                <el-option v-for="item in companyData" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span class="cs-select-btn" :class="{'active': selectedIndex !== 0}" @click="prevComp($event)">上一家</span>
            <span class="cs-select-btn" :class="{'active': selectedIndex !== companyData.length - 1}"
                @click="nextComp($event)">下一家</span>
        </section>
    </div>
</template>

<script>
export default {
    name: 'company-select',
    props: {
        companyData: {
            type: Array,
            default: function () {
                return [
                    {
                        value: '北京筑龙信息技术有限责任公司',
                        label: '北京筑龙信息技术有限责任公司',
                    },
                    {
                        value: '测试公司',
                        label: '测试公司',
                    },
                ];
            },
        },
        // 位置 top-顶部 bottom-底部
        position: {
            type: String,
            default: 'bottom',
        },
        // 背景颜色 dark-黑 light-白
        theme: {
            type: String,
            default: 'dark',
        },
    },
    watch: {
        companyData (value) {
            this.selectedValue = value[0].value || '';
        },
    },
    data () {
        return {
            selectedIndex: 0, // 选中公司的index
            selectedValue: '', // 选中公司的value
        };
    },
    methods: {
        prevComp (e) {
            if (this.selectedIndex > 0) {
                this.selectedIndex = this.selectedIndex - 1;
                this.selectedValue = this.companyData[this.selectedIndex].value;
                // 手动加按钮激活样式
                this.$nextTick(() => {
                    e.target.classList.add('btn-active');
                    setTimeout(() => {
                        e.target.classList.remove('btn-active');
                    }, 100);
                });
                this.selectCompany();
            }
        },
        nextComp (e) {
            if (this.selectedIndex < this.companyData.length - 1) {
                this.selectedIndex = this.selectedIndex + 1;
                this.selectedValue = this.companyData[this.selectedIndex].value;
                this.activeBtn(e);
                this.selectCompany();
            }
        },
        valueChange (value) {
            this.selectedValue = value;
            this.companyData.forEach((item, index) => {
                if (item.value === this.selectedValue) {
                    this.selectedIndex = index;
                    this.selectCompany();
                }
            });
        },
        // 选择公司
        selectCompany () {
            this.$emit('selectComp', this.selectedValue);
        },
    },
};
</script>

<style lang="scss" scoped>
    .cs-main {
        position: fixed;
        width: inherit;
        height: $companySelectHeight;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;

        &.top {
            top: 0;
        }
        &.bottom {
            bottom: 0;
        }
        &.dark {
            background-color: #293134;
        }
        &.light {
            background-color: #fff;
            border-bottom: solid 1px #d9dce1;
        }

        .btn-cont {
            .cs-select-btn {
                display: inline-block;
                font-size: $fontL;
                background-color: #fff;
                padding: 0 0.25rem;
                color: #a7a7a7;
                border: 1px solid #a7a7a7;
                border-radius: 0.05rem;
                line-height: 0.38rem;
                height: 0.45rem;
                margin-right: 0.2rem;

                &:last-child {
                    margin-right: 0;
                }

                &.active {
                    border-color: $colorActive;
                    color: $colorActive;
                }

                &.btn-active {
                    border-color: $colorActive;
                    background-color: $colorActive;
                    color: #fff;
                }
            }

            /deep/ .cs-select-btn {
                height: 0.44rem;
            }
        }
    }
</style>

<style lang="scss">
    .cs-select-cont {
        margin: 0 0.2rem 0 0;
        line-height: 0.44rem;

        .el-input--suffix .el-input__inner {
            width: 5.5rem;
            height: 0.44rem;
            color: #333;
            font-size: $fontM;
        }
        &.el-select .el-input.is-focus .el-input__inner {
            border-color: $colorActive;
        }
        .el-input .el-select__caret {
            font-size: 0.2rem;
        }
        .el-input__suffix {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.44rem;
        }
    }
    .cs-main.light {
        .cs-select-cont {
            .el-input--suffix .el-input__inner {
                padding-right: 0.42rem;
                border-color: $colorActive;
                border-radius: 0.05rem;
            }
            .el-input__suffix {
                right: 0;
                width: 0.42rem;
                background-color: $colorActive;
                border-radius: 0.05rem;
                margin-top: 0.03rem;
            }
            .el-input .el-select__caret {
                color: #fff;
                font-size: 0.2rem;
            }
        }
    }

    // select选项颜色
    .el-select-dropdown__item {
        font-size: $fontM;
        color: #333;
    }
    .el-select-dropdown__item.selected {
        color: $colorActive;
    }
    .el-select-dropdown__item {
        height: 0.34rem;
        line-height: 0.34rem;
    }
</style>
