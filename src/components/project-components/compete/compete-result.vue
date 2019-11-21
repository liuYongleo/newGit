<template>
    <el-dialog class="dy-dialog cj-dialog"
        title="竞争有效性汇总"
        v-bind="$attrs"
        top="0"
        :modal-append-to-body="false"
        @close="$emit('update:visible', false)">
        <section class="cj-main">
            <p class="cj-title">汇总结果：<span class="text-danger">继续评审</span></p>
            <self-table class="cj-table"
                :data="tableData"
                :rowHeight="0.5"
                :maxRow="6"
                :loading="loading">
                <el-table-column prop="XHColumn"
                    label="序号"
                    min-width="12%">
                </el-table-column>
                <el-table-column class="align-left"
                    prop="PWName"
                    label="评委姓名"
                    min-width="22%">
                </el-table-column>
                <el-table-column prop="是否继续评审"
                    label="是否继续评审"
                    min-width="25%">
                </el-table-column>
                <el-table-column prop="Reason"
                    label="评审意见"
                    min-width="41%">
                    <template slot-scope="scope">
                        {{scope.row.Reason | empty}}
                    </template>
                </el-table-column>
            </self-table>
        </section>
    </el-dialog>
</template>

<script>
export default {
    name: 'compete-result',
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    data () {
        return {
        };
    },
    filters: {
        bolText: function (value) {
            return value === 1 ? '是' : '否';
        },
    },
};
</script>

<style lang="scss" scoped>
    .cj-main {
        font-size: 0.26rem;
        color: #333;

        .cj-title {
            margin-bottom: 0.27rem;
        }

        /deep/ .self-table .el-table {
            th,
            td {
                padding-top: 0.13rem;
                padding-bottom: 0.13rem;
            }

            .cell,
            th div {
                font-size: $fontM;
                line-height: inherit;
            }

            .el-table__body-wrapper {
                .cell,
                th div {
                    color: #333;
                }
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
                padding: 0.3rem;
            }
        }
    }
</style>
