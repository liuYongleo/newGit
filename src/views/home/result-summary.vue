<template>
    <!-- 查看评审汇总 -->
    <div class="rs-main">
        <h3 class="main-title">评审汇总</h3>
        <section class="rs-table-wrap">
            <self-table class="rs-table"
                :loading="loading"
                :data="tableData"
                :maxRow="10">
                <el-table-column v-for="(item, index) in tableHeaderCopy"
                    :key="index"
                    :prop="item.key"
                    :label="item.label"
                    :fixed="index < 3"
                    :width="item.width * $store.state.rem">
                    <template slot-scope="scope">
                        <p class="align-center"
                            :class="[item.type === 1 ? scope.row[item.key] === '合格' ? 'text-success' : 'text-danger' : '']"
                            v-if="item.key === 'SCOREORDER'"
                            @click="editRank(scope.row)">{{ scope.row[item.key] }}</p>
                        <p class="align-center"
                            :class="[item.type === 1 ? scope.row[item.key] === '合格' ? 'text-success' : 'text-danger' : '']"
                            v-else>{{ scope.row[item.key] }}</p>
                        <p v-show="[1,2].indexOf(item.type) > -1"
                            class="bol-text-sec"
                            @click="showDialog(scope, index)">点击查看</p>
                    </template>
                </el-table-column>
            </self-table>
        </section>
        <!-- 编辑排名框 -->
        <review-score v-show="false"
            class="rpm-input"
            :showModal.sync="showModal"
            :score="editRankData.ScoreOrder"
            :needReason="true"
            :reason="editRankData.Reason"
            :dataIndex="1"
            title="请输入修改排名原因"
            inputTitle="排名"
            :validReg="/^[0-9]+$/"
            validTest="请填写正整数"
            :formEditable="formEditable"
            @confirm="editRankConfirm"></review-score>
        <!-- 点击查看弹窗 -->
        <el-dialog class="dy-dialog"
            title="评审相关参数"
            :visible.sync="dialogVisible"
            top="0">
            <section class="review-param">
                <el-row class="param-row">
                    <el-col :span="6">
                        评审方式：<span class="text-main">{{selectedHeadData.type === 1 ? '定性' : selectedHeadData.type === 2 ? '定量' : '-'}}</span>
                    </el-col>
                    <el-col :span="6"
                        :offset="1">
                        评审类型：<span class="text-main">{{selectedFlowData.指标类型 === 0 ? '一般指标' : selectedFlowData.指标类型 === 1 ? '重要指标' : '-'}}</span>
                    </el-col>
                    <el-col v-show="selectedHeadData.type === 2" :span="6"
                        :offset="1">
                        权重：<span class="text-main">{{selectedFlowData.权重 | empty}}%</span>
                    </el-col>
                </el-row>
                <el-row class="param-row">
                    <el-col :span="selectedHeadData.type === 1 ? 24 : 6">
                        评审原则：
                        <span class="text-danger"
                            v-if="selectedHeadData.type === 1">{{selectedFlowData.合格标准分子}}/{{selectedFlowData.合格标准分母}}评委评审合格才算合格</span>
                        <span class="text-danger"
                            v-else-if="selectedHeadData.type === 2">{{selectedFlowData.汇总方法 === 1 ? '去掉一个最高一个最低取平均值法' : selectedFlowData.汇总方法 === 2 ? '算术平均值法' : '-'}}</span>
                    </el-col>
                    <el-col v-show="selectedHeadData.type === 2" :span="6"
                        :offset="1">
                        明暗标：<span class="text-main">{{selectedFlowData.IsOpen ? '明标' : '暗标'}}</span>
                    </el-col>
                </el-row>
            </section>
            <!-- 定性 -->
            <section class="review-table"
                v-show="selectedHeadData.type === 1">
                <div>
                    <p class="text-main">评审项目汇总结果</p>
                    <self-table class="params-table"
                        :data="paramTableData1"
                        :highlightCurrentRow="true"
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
                v-show="selectedHeadData.type === 2">
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
                            :width="tr3.name * $store.state.rem">
                        </el-table-column>
                        <el-table-column label="评审得分"
                            :width="tr2.type * $store.state.rem">
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
                            :width="tr2.type * $store.state.rem">
                            <template slot-scope="scope">
                                <p>{{ scope.row.HIGHSCORE | empty }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="得分"
                            :width="tr2.type * $store.state.rem">
                            <template slot-scope="scope">
                                <p>{{ scope.row.Score | empty }}</p>
                            </template>
                        </el-table-column>
                    </self-table>
                </div>
            </section>
        </el-dialog>
    </div>
</template>

<script>
import reviewScore from '@/components/project-components/side-bar/side-bar-review/review-score';
export default {
    name: 'result-summary',
    data () {
        return {
            tableHeader: [
                {
                    key: 'SCOREORDER',
                    label: '排名',
                    width: 0.8,
                },
                {
                    key: 'ENTPRSNAME',
                    label: '投标单位',
                    width: 5.65,
                },
                {
                    key: 'TOTALPRICE',
                    label: '投标报价（元）',
                    width: 1.8,
                },
                {
                    key: 'TOTALSCORE',
                    label: '总得分',
                    width: 1.5,
                },
                {
                    key: '修改排名原因',
                    label: '修改排名原因',
                    width: 1.8,
                },
            ],
            tableData: [],
            tr: {
                rank: 0.81,
                name: 5.66,
                price: 1.81,
                total: 1.5,
                reason: 1.8,
                qb: 1.8,
                zg: 2.1,
                xs: 2.1,
                xys: 2.1,
                sgzz: 1.8,
                project: 1.8,
                jg: 1.8,
            },
            paramTableData1: [],
            tr2: {
                rank: 0.8,
                params: 2.75,
                result: 1.09,
                type: 1.88,
            },
            paramTableData2: [],
            tr3: {
                name: 1.3,
                result: 1.5,
                reason: 2.48,
            },
            dialogVisible: false,
            rem: this.$store.state.rem,
            loading: true,
            showModal: false,
            editRankData: {
                Reason: '',
                BidFileId: '',
                ScoreOrder: '',
            },
            dialogData: {}, // 点击查看数据
            formSubmitted: true, // 用户是否提交过该阶段得表单
            selectedHeadData: {}, // 点击查看时选中的tableHead数据
            leftTableLoading: true,
            rightTableLoading: true,
        };
    },
    components: {
        reviewScore,
    },
    filters: {
        bolText: value => {
            return value ? '合格' : '不合格';
        },
    },
    computed: {
        tableHeaderCopy () {
            let list = this.tableHeader;
            let flow = this.$store.state.flowDataPicker;
            flow.forEach(item => {
                let label = item.FlowName;
                if ([ '推荐组长', '评审汇总', '评标报告', ].indexOf(label) === -1) {
                    let headData = {
                        key: item.FlowId + '',
                        label,
                        width: 1.8,
                        type: item.FlowPSType,
                    };
                    list.push(headData);
                }
            });
            return list;
        },
        // 表单是否可编辑
        formEditable () {
            let flowData = {};
            const selectedFlow = this.selectedReviewData || {};
            if (selectedFlow.FlowName === '评审汇总') {
                flowData = selectedFlow;
            } else {
                let data = this.$store.state.flowData;
                for (let i = data.length - 1; i >= 0; i--) {
                    if (data[i].FlowName === '评审汇总') {
                        flowData = data[i];
                        break;
                    }
                }
            }
            // console.log('flowData', flowData);
            return [ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1 && !this.formSubmitted;
        },
        // 点击查看时选中的评审数据
        selectedFlowData () {
            let flow = this.$store.state.flowDataPicker;
            let head = this.selectedHeadData;
            let data = {};
            for (let item of flow) {
                if (item.FlowId === parseInt(head.key)) {
                    data = item;
                    break;
                }
            }
            return data;
        },
    },
    methods: {
        // 获取数据
        async getData () {
            let flowData = this.selectedReviewData || {};
            // 获取数据之前先调用这两个接口
            if ([ 0, 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                await this.portService.calSummaryScore();
            }
            this.loading = true;
            this.$store.commit('save', { path: 'summaryReviewData', data: [], });
            const res = await this.portService.getSummaryViewData();
            this.tableData = res.data.value;
            this.$store.commit('save', { path: 'summaryReviewData', data: this.tableData, });
            this.loading = false;
        },
        // 编辑排名
        editRank (item) {
            if (!this.formEditable) {
                return this.alert({content: '你已提交结果，不能编辑', });
            }
            if (!this.$store.state.isLeader) {
                return this.alertOnlyLeader();
            }
            this.editRankData.BidFileId = item.BIDFILEID;
            this.editRankData.Reason = item.修改排名原因;
            this.editRankData.ScoreOrder = item.SCOREORDER;
            this.showModal = true;
        },
        // 确认编辑排名
        async editRankConfirm ({ score, reason, }) {
            await this.portService.editSummaryRank(parseInt(this.editRankData.BidFileId), parseInt(score), reason);
            this.getData();
        },
        // 判断用户当前流程是否提交数据
        async checkCommit () {
            let data = this.$store.state.flowData;
            let flowData = {};
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].FlowName === '评审汇总') {
                    flowData = data[i];
                    break;
                }
            }
            if ([ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                let res = await this.portService.checkStageCommit(flowData.FlowName);
                this.formSubmitted = res.data.value;
            }
        },
        // 点击查看
        showDialog (scope, index) {
            // console.log(scope);
            this.selectedHeadData = this.tableHeaderCopy[index];
            this.dialogData = scope.row;
            this.dialogVisible = true;
            if (this.selectedHeadData.type === 1) {
                // 定性
                this.getDxData();
            } else if (this.selectedHeadData.type === 2) {
                // 定量
                this.getDlData();
            }
        },
        // 获取定性数据 左边表格
        async getDxData () {
            this.leftTableLoading = true;
            this.paramTableData1 = [];
            const res1 = await this.portService.getDxPcSummary(this.dialogData.BIDFILEID, this.selectedFlowData.FlowName);
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
            const res2 = await this.portService.getDxParamsSummary(this.dialogData.BIDFILEID, id, this.selectedFlowData.FlowName);
            this.rightTableLoading = false;
            this.paramTableData2 = res2.data.value;
        },
        // 获取定量数据
        async getDlData () {
            this.leftTableLoading = true;
            this.paramTableData1 = [];
            this.paramTableData2 = [];
            const res1 = await this.portService.getDlPcSummary(this.dialogData.BIDFILEID, this.selectedFlowData.FlowName);
            this.leftTableLoading = false;
            this.paramTableData1 = res1.data.value;
            if (this.paramTableData1.length && this.paramTableData1[0].BidFileID) {
                await this.getDlDataRight(this.paramTableData1[0].BidFileID);
            }
            // console.log(this.paramTableData1);
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
            const flowData = this.selectedHeadData;
            const res = await this.portService.getReviewParams(flowData.label);
            return res.data.value;
        },
        // 点击定性表格行
        async selectDxTable (row, column, event) {
            await this.getDxDataRight(row.ItemID);
        },
        // 点击定量表格行
        async selectDlTable (row, column, event) {
            await this.getDlDataRight(row.BidFileID);
        },
    },
    mounted () {
        this.getData();
        this.checkCommit();
    },
};
</script>

<style lang="scss" scoped>
    .rs-main {
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

        .review-param {
            font-size: 0.26rem;
            color: #999;
            background-color: #efefef;
            padding: 0.27rem 0.14rem;

            .param-row {
                margin-bottom: 0.3rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        .review-table {
            display: flex;
            justify-content: space-between;
            margin-top: 0.27rem;

            .params-table {
                margin-top: 0.19rem;
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
    }

    .text-main {
        font-size: 0.26rem;
        color: #333;
    }
</style>
