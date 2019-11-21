<template>
    <div>
        <h3>
            查看保证金缴纳情况
        </h3>
        <div class="content-box">
            <self-table
                :data="tableData"
                border>
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="TBRNAME"
                    label="投标人名称">
                </el-table-column>
                <el-table-column
                    prop="BAOZHENGJINDIJIAOJINE"
                    label="保证金交付金额（元）">
                </el-table-column>
                <el-table-column
                    prop="BZJZT"
                    label="提交情况">
                    <template slot-scope="scope">
                        <span :class="{'green-color': scope.row.BZJZT === '已缴纳',
                                        'green-red': scope.row.BZJZT !== '已缴纳' }">
                            {{scope.row.BZJZT}}
                        </span>
                    </template>
                </el-table-column>
            </self-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'deposit',
    data () {
        return {
            tableData: [],
        };
    },
    created () {
        this.getDepositList();
    },
    methods: {
        async getDepositList () {
            let res = await this.portService.getDepositList();
            this.tableData = res.data.value;
            console.log(this.tableData);
        },

        indexMethod (index) {
            return index * 2;
        },
    },
};
</script>

<style scoped>

</style>
