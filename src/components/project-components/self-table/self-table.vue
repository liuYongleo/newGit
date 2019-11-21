<!--简单封装el-table，便于全局统一设置-->
<template>
    <div class="self-table">
        <el-table ref="table" v-bind="tableProps" :data="$attrs.data" @row-click="rowClick"
                  :highlight-current-row="highlightCurrentRow" v-loading="loading">
            <slot></slot>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'self-table',
    props: {
        maxRow: {
            type: Number,
            default: 10,
        },
        rowHeight: {
            type: Number,
            default: 0.781,
        },
        // 是否要高亮当前行（true：点击时设为高亮）
        highlightCurrentRow: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        tableProps () {
            return this.$_.merge(this.defaultTableProps, this.$attrs, this.patchConfig);
        },
        patchConfig () {
            return {
                maxHeight: (this.maxRow + 1) * this.rowHeight * this.$store.state.rem, // 最高行数,props[maxRow] 设置
            };
        },
    },
    data () {
        return {
            defaultTableProps: {
                border: true,
                maxHeight: (this.maxRow + 1) * this.rowHeight * this.$store.state.rem,
            },

        };
    },
    watch: {
        '$attrs.data' (newData) {
            this.$refs.table.setCurrentRow(newData[0]);
        },
    },
    mounted () {
        this.$refs.table.setCurrentRow(this.$attrs.data[0]);
    },
    methods: {
        rowClick (row, column, event) {
            this.$refs.table.setCurrentRow(row);
            this.$emit('rowClick', row, column, event);
        },
    },
};
</script>

<style lang="scss">
    /*----element css reset----*/
    .self-table {
        $tableBorderColor: #dcdcdc; // table的border-color

        .el-table {
            font-size: $fontL;
        }

        .el-table .cell,
        .el-table th div {
            display: inline-block;
            width:auto;
            padding-left: 0.1rem;
            padding-right: 0.1rem;
            line-height: 1.375;
            text-align: left;
            white-space: pre-line;
        }

        .el-table th div {
            color: #fff;
        }

        .el-table td,
        .el-table th {
            text-align: center;
            padding-top: 0.22rem;
            padding-bottom: 0.22rem;
            a {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0.1rem;
                right: 0.1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $green;
            }
        }

        .el-table th {
            background-color: $green;
        }

        .el-table--border:after,
        .el-table--group:after,
        .el-table:before {
            background-color: $tableBorderColor;
        }

        .el-table--border,
        .el-table--group {
            border-color: $tableBorderColor;
        }

        .el-table td,
        .el-table th.is-leaf {
            border-bottom: 1px solid $tableBorderColor;
        }

        .el-table--border th,
        .el-table--border th.gutter:last-of-type {
            border-bottom: 1px solid $tableBorderColor;
        }

        .el-table--border td,
        .el-table--border th {
            border-right: 1px solid $tableBorderColor;
        }

        &.theme-gray {
            .el-table tr {
                background-color: #f6f6f6;
            }
        }

        // current row
        .el-table__body tr.current-row > td {
            color: $green;
            background-color: #e4fff9;
        }

        // hover row
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            color: $green;
            background-color: #e4fff9;
        }

        .el-loading-spinner {
            margin-top: -.21rem;

            .circular {
                width: .42rem;
                height: .42rem;
            }
        }

    }
</style>
