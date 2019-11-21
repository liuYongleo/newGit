// 查看各流程汇总详情
<template>
    <el-dialog class="dy-dialog sbs-dialog"
        title="评审相关参数"
        :visible="dialogVisible"
        append-to-body
        top="0"
        @close="closeDialog">
        <el-row>
            <!-- 单位列表 -->
            <el-col :span="12">
                <self-table class="params-table"
                    :data="companyListCopy"
                    highlightCurrentRow
                    :maxRow="9"
                    :loading="compTableLoading"
                    @rowClick="selectComp">
                    <el-table-column label="序号"
                        min-width="20%">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column class="align-left"
                        prop="name"
                        label="投标单位"
                        min-width="80%">
                    </el-table-column>
                </self-table>
            </el-col>
            <!-- 汇总结果 -->
            <el-col :span="12">
                <section class="left-data">
                    <section class="review-param">
                        <el-row class="param-row">
                            <el-col :span="11">
                                评审方式：<span class="text-main">{{selectedFlowData.FlowPSType === 1 ? '定性' : selectedFlowData.FlowPSType === 2 ? '定量' : '-'}}</span>
                            </el-col>
                            <el-col :span="12"
                                :offset="1">
                                评审类型：<span class="text-main">{{selectedFlowData.指标类型 === 0 ? '一般指标' : selectedFlowData.指标类型 === 1 ? '重要指标' : '-'}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="param-row"
                            v-show="selectedFlowData.FlowPSType === 2">
                            <el-col :span="11">
                                权重：<span class="text-main">{{selectedFlowData.权重 | empty}}%</span>
                            </el-col>
                            <el-col :span="12"
                                :offset="1">
                                明暗标：<span class="text-main">{{selectedFlowData.IsOpen ? '明标' : '暗标'}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="param-row">
                            <el-col :span="24">
                                评审原则：
                                <span class="text-danger"
                                    v-if="selectedFlowData.FlowPSType === 1">{{selectedFlowData.合格标准分子}}/{{selectedFlowData.合格标准分母}}评委评审合格才算合格</span>
                                <span class="text-danger"
                                    v-else-if="selectedFlowData.FlowPSType === 2">{{selectedFlowData.汇总方法 === 1 ? '去掉一个最高一个最低取平均值法' : selectedFlowData.汇总方法 === 2 ? '算术平均值法' : '-'}}</span>
                            </el-col>
                        </el-row>
                    </section>
                    <!-- 定性 -->
                    <section class="review-table"
                        v-show="selectedFlowData.FlowPSType === 1">
                        <div>
                            <p class="text-main">评审项目汇总结果</p>
                            <self-table class="params-table"
                                :data="paramTableData1"
                                highlightCurrentRow
                                :rowHeight="0.5"
                                :maxRow="4"
                                :loading="leftTableLoading"
                                @rowClick="selectDxTable">
                                <el-table-column prop="XH"
                                    label="序号"
                                    :width="tr2.rank * $store.state.rem">
                                </el-table-column>
                                <el-table-column class="align-left"
                                    prop="ItemName"
                                    label="评审因素"
                                    :width="tr2.params * $store.state.rem">
                                </el-table-column>
                                <el-table-column label="结果"
                                    :width="tr2.result * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p class="bol-text"
                                            :class="[scope.row.Score === '合格' ? 'text-success' : 'text-danger']">{{ scope.row.Score }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="指标类型"
                                    :width="tr2.type * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.指标类型 | empty }}</p>
                                    </template>
                                </el-table-column>
                            </self-table>
                        </div>
                        <div>
                            <p class="text-main">评委评审情况</p>
                            <self-table class="params-table"
                                :data="paramTableData2"
                                :rowHeight="0.5"
                                :maxRow="4"
                                :loading="rightTableLoading">
                                <el-table-column prop="PWName"
                                    label="评委"
                                    :width="tr3.name * $store.state.rem">
                                </el-table-column>
                                <el-table-column label="结果"
                                    :width="tr3.result * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p class="bol-text"
                                            :class="[scope.row.Conclusion === '合格' ? 'text-success' : 'text-danger']">{{ scope.row.Conclusion }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="理由"
                                    :width="tr3.reason * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.Reason | empty }}</p>
                                    </template>
                                </el-table-column>
                            </self-table>
                        </div>
                    </section>
                    <!-- 定量 -->
                    <section class="review-table"
                        v-show="selectedFlowData.FlowPSType === 2">
                        <div>
                            <p class="text-main">评委评审情况</p>
                            <self-table class="params-table"
                                :data="paramTableData1"
                                :rowHeight="0.5"
                                :maxRow="4"
                                :highlightCurrentRow="true"
                                :loading="leftTableLoading"
                                @rowClick="selectDlTable">
                                <el-table-column prop="PWName"
                                    label="评委"
                                    min-width="60%">
                                </el-table-column>
                                <el-table-column label="评审得分"
                                    min-width="40%">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.SumScore | empty }}</p>
                                    </template>
                                </el-table-column>
                            </self-table>
                        </div>
                        <div>
                            <p class="text-main">评审项目汇总结果</p>
                            <self-table class="params-table"
                                :data="paramTableData2"
                                :rowHeight="0.5"
                                :maxRow="4"
                                :loading="rightTableLoading">
                                <el-table-column prop="ScoreOrd"
                                    label="序号"
                                    :width="tr2.rank * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p>{{ scope.$index + 1 }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column class="align-left"
                                    prop="ItemName"
                                    label="评审因素"
                                    :width="tr2.params * $store.state.rem">
                                </el-table-column>
                                <el-table-column label="满分"
                                    :width="1.5 * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.HIGHSCORE | empty }}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="得分"
                                    :width="1.5 * $store.state.rem">
                                    <template slot-scope="scope">
                                        <p>{{ scope.row.Score | empty }}</p>
                                    </template>
                                </el-table-column>
                            </self-table>
                        </div>
                    </section>
                </section>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
export default {
    name: 'side-bar-summary',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        selectedFlowIndex: {
            type: Number,
            default: 1,
        },
    },
    watch: {
        selectedFlowIndex (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getComps(null, true);
            }
        },
    },
    data () {
        return {
            compTableLoading: true,
            companyList: [],
            paramTableData1: [],
            tr2: {
                rank: 0.8,
                params: 3.4,
                result: 1.09,
                type: 1.88,
            },
            paramTableData2: [],
            tr3: {
                name: 1.3,
                result: 1.5,
                reason: 4.4,
            },
            dialogData: {}, // 点击查看数据
            selectedHeadData: {}, // 点击查看时选中的tableHead数据
            leftTableLoading: true,
            rightTableLoading: true,
        };
    },
    computed: {
        // 点击查看时选中的评审数据
        selectedFlowData () {
            let flow = this.$store.state.flowDataPicker[this.selectedFlowIndex] || {};
            return flow;
        },
        companyListCopy () {
            const flowData = this.$store.state.flowData[this.selectedFlowIndex] || {};
            let data = [];
            data = !this.companyList.length ? [] : this.companyList.map(item => {
                if (flowData.IsOpen) {
                    this.$set(item, 'name', item.ENTPRSNAME);
                } else {
                    this.$set(item, 'name', item['暗标名称']);
                }
                return item;
            });
            return data;
        },
    },
    methods: {
        // 点击定性表格行
        async selectDxTable (row, column, event) {
            await this.getDxDataRight(row.ItemID);
        },
        // 点击定量表格行
        async selectDlTable (row, column, event) {
            await this.getDlDataRight(row.BidFileID);
        },
        // 获取企业数据
        async getComps (selectedCompData, getNew = false) {
            if (getNew) {
                this.compTableLoading = true;
                const flowData = this.$store.state.flowData[this.selectedFlowIndex] || {};
                const res = await this.portService.getTbComp(flowData.FlowName);
                this.companyList = res.data.value;
                this.selectedHeadData = this.companyList[0] || {};
                this.paramTableData1 = [];
                this.paramTableData2 = [];
            } else {
                this.selectedHeadData = selectedCompData || {};
            }
            // console.log('companyList', this.companyList[0]);
            if (this.selectedFlowData.FlowPSType === 1) {
                // 定性
                this.getDxData();
            } else if (this.selectedFlowData.FlowPSType === 2) {
                // 定量
                this.getDlData();
            }
            // console.log(this.companyList);
            this.compTableLoading = false;
        },
        // 获取定性数据 左边表格
        async getDxData () {
            this.leftTableLoading = true;
            this.paramTableData1 = [];
            const res1 = await this.portService.getDxPcSummary(this.selectedHeadData.BIDFILEID, this.selectedFlowData.FlowName);
            this.paramTableData1 = res1.data.value;
            this.leftTableLoading = false;
            if (this.paramTableData1.length && this.paramTableData1[0].ItemID) {
                this.paramTableData1.forEach(item => {
                    item.指标类型 = this.selectedFlowData.指标类型 === 0 ? '一般指标' : this.selectedFlowData.指标类型 === 1 ? '重要指标' : '-';
                });
                await this.getDxDataRight(this.paramTableData1[0].ItemID);
            }
            // console.log(this.paramTableData1);
            // console.log(this.paramTableData2);
        },
        // 获取定性数据 右边表格
        async getDxDataRight (id) {
            this.rightTableLoading = true;
            this.paramTableData2 = [];
            const res2 = await this.portService.getDxParamsSummary(this.selectedHeadData.BIDFILEID, id, this.selectedFlowData.FlowName);
            this.rightTableLoading = false;
            this.paramTableData2 = res2.data.value;
        },
        // 获取定量数据
        async getDlData () {
            this.leftTableLoading = true;
            this.paramTableData1 = [];
            this.paramTableData2 = [];
            const res1 = await this.portService.getDlPcSummary(this.selectedHeadData.BIDFILEID, this.selectedFlowData.FlowName);
            this.leftTableLoading = false;
            this.paramTableData1 = res1.data.value;
            if (this.paramTableData1.length && this.paramTableData1[0].BidFileID) {
                await this.getDlDataRight(this.paramTableData1[0].BidFileID);
            }
            console.log(this.paramTableData1);
            // console.log(this.paramTableData2);
        },
        // 获取定量数据 右边表格
        async getDlDataRight (BidFileID) {
            this.rightTableLoading = true;
            this.paramTableData2 = [];
            const res2 = await this.portService.getDlParamsSummary(BidFileID, this.selectedFlowData.FlowName);
            this.paramTableData2 = res2.data.value;
            const params = await this.getParams();
            this.rightTableLoading = false;
            for (let item of this.paramTableData2) {
                for (let par of params) {
                    if (item.ItemId === par.ID) {
                        this.$set(item, 'HIGHSCORE', par.HIGHSCORE);
                        this.$set(item, 'ItemName', par.ITEMNAME);
                        break;
                    }
                }
            }
        },
        // 获取评审因素
        async getParams () {
            const flowData = this.selectedFlowData;
            const res = await this.portService.getReviewParams(flowData.FlowName);
            return res.data.value;
        },
        // 选择单位
        selectComp (row, column, event) {
            this.getComps(row);
        },
        getData () {
            this.getComps(null, true);
        },
        closeDialog () {
            this.$emit('update:dialogVisible', false);
        },
    },
    mounted () {
        this.getData();
    },
};
</script>

<style lang="scss" scoped>
    .sbs-dialog {
        .main-title {
            margin: 0 0 0.2rem 0;
        }

        .rs-table-wrap {
            margin-left: 0.31rem;

            .bol-text {
                font-size: $fontL;
                margin-bottom: 0.05rem;
            }
            .bol-text-sec {
                font-size: 0.2rem;
                color: #999;
            }
        }

        .left-data {
            margin-left: 0.2rem;
            padding: 0 0.14rem 0.69rem;
            background-color: #efefef;
        }

        .review-param {
            font-size: 0.26rem;
            color: #999;
            padding: 0.27rem 0;
            border-bottom: 1px dashed #ccc;

            .param-row {
                margin-bottom: 0.3rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        .review-table {
            // display: flex;
            // justify-content: space-between;
            margin-top: 0.27rem;

            .params-table {
                margin-top: 0.19rem;
            }

            div:first-child {
                margin-bottom: 0.22rem;
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

        /deep/ .el-dialog {
            width: 15.78rem;
        }
    }

    .text-main {
        font-size: 0.26rem;
        color: #333;
    }
</style>
