<template>
    <div class="review-clarify">
        <h3>
            查看评标澄清问题
        </h3>
        <div class="content-box part-wrap">
            <div class="left-part">
                <div class="search-tool">
                    <div class="filed-item">
                        <label>
                            组织机构代码
                        </label>
                        <div class="filed-item-content">
                            <el-input class="default" v-model="searchParams.organizationCode"></el-input>
                        </div>
                    </div>
                    <div class="filed-item">
                        <label>
                            单位名称
                        </label>
                        <div class="filed-item-content">
                            <el-input class="default" v-model="searchParams.unitName"></el-input>
                        </div>
                    </div>
                    <button class="search-btn" @click="search">查询</button>
                </div>
                <div class="part-content" style="margin-bottom: 0">
                    <self-table :data="organizationTableOrgin" :maxRow="9" highlightCurrentRow :loading="leftTableLoading" @rowClick="rowClick">
                        <el-table-column
                            label="序号"
                            :width="$store.state.indexCellWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="TBR_BH"
                            label="组织机构代码">
                        </el-table-column>
                        <el-table-column
                            prop="TBR_NAME"
                            label="投标单位">
                        </el-table-column>
                    </self-table>
                </div>
            </div>
            <div class="right-part">
                <div class="part-title">
                    澄清回复
                </div>
                <div class="part-content">
                    <self-table
                        class="theme-gray"
                        :data="clarifyReply"
                        :maxRow="4"
                        :loading="clarifyReplyLoading">
                        <el-table-column
                            label="序号"
                            :width="$store.state.indexCellWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="FileName"
                            label="文件名">
                            <!-- <template slot-scope="scope">
                                <span :class="{'green-color': scope.row.active}">{{scope.row.FileName}}</span>
                            </template> -->
                        </el-table-column>
                    </self-table>
                </div>
                <div class="part-title">
                    澄清附件
                </div>
                <div class="part-content">
                    <self-table
                        class="theme-gray"
                        :data="clarifyReply"
                        row-key="id"
                        :maxRow="4"
                        :loading="clarifyReplyLoading">
                        <el-table-column
                            label="序号"
                            :width="$store.state.indexCellWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="FileName"
                            label="文件名">
                            <!-- <template slot-scope="scope">
                                <span :class="{'green-color': scope.row.active}">{{scope.row.fileName}}</span>
                            </template> -->
                        </el-table-column>
                    </self-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'review-clarify-view',
    data () {
        return {
            searchParams: {
                organizationCode: '',
                unitName: '',
            },

            // 组织机构table
            organizationTable: [],
            organizationTableOrgin: [],

            // 澄清回复table
            clarifyReply: [],
            clarifyReplyLoading: true,

            leftTableLoading: false,
            selectedComp: false, // 当前选中单位
        };
    },
    methods: {
        search () {
            this.leftTableLoading = true;
            this.organizationTableOrgin = this.organizationTable.filter(item => {
                if (this.searchParams.unitName && this.searchParams.organizationCode) {
                    if (item.TBR_NAME.indexOf(this.searchParams.unitName) !== -1 && item.TBR_BH.indexOf(this.searchParams.organizationCode) !== -1) {
                        return true;
                    }
                } else if (this.searchParams.unitName) {
                    if (item.TBR_NAME.indexOf(this.searchParams.unitName) !== -1) {
                        return true;
                    }
                } else if (this.searchParams.organizationCode) {
                    if (item.TBR_BH.indexOf(this.searchParams.organizationCode) !== -1) {
                        return true;
                    }
                } else {
                    return true;
                }
            });
            if (this.organizationTableOrgin[0]) {
                this.selectedComp = this.organizationTableOrgin[0] || {};
                this.getCqProblemList();
            }
            this.leftTableLoading = false;
        },
        async getTable () {
            this.leftTableLoading = true;
            const res = await this.portService.getCqProblem();
            // console.log('获取已确认澄清问题投标人', res.data.value);
            if (res.data.value === 'null' || !res.data.value) {
                this.organizationTable = [];
                this.clarifyReplyLoading = false;
            } else {
                this.organizationTable = res.data.value;
                this.organizationTableOrgin = this.organizationTable;
                this.selectedComp = this.organizationTableOrgin[0] || [];
                this.getCqProblemList();
            }
            this.leftTableLoading = false;
        },
        async getCqProblemList () {
            this.clarifyReplyLoading = true;
            const res = await this.portService.getCqProblemList(this.selectedComp.TBR_BH);
            // console.log('list', res.data.value);
            this.clarifyReply = res.data.value;
            this.clarifyReplyLoading = false;
        },
        rowClick (row) {
            if (this.selectedComp.TBR_BH !== row.TBR_BH) {
                this.selectedComp = row;
                this.getCqProblemList();
            }
        },
    },
    mounted () {
        this.getTable();
    },
};
</script>

<style scoped lang="scss">

</style>
