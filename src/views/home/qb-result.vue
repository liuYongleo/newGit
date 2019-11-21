<template>
    <!-- 清标结果 -->
    <div class="qbr-main">
        <h3>查看自动清标结果</h3>
        <div class="main-wrap">
            <p class="main-title">检查结果<span class="detail-btn"
                    @click="showAll">查看总体检查结果</span></p>
            <ul class="detail-list">
                <li class="detail-item"
                    v-for="(item, index) in qbList"
                    :key="index">
                    <p class="title">
                        {{item.Title | empty}}
                        <span v-show="index === 0"
                            class="detail-btn"
                            @click="showPcData(item, index)">查看详情</span>
                        <img v-show="selectedIndex === index"
                            src="../../../static/img/qbr-icon.png"
                            class="qbr-icon">
                    </p>
                    <p class="cont">{{item.Rule}}<br>{{item.Result}}</p>
                </li>
            </ul>
        </div>
        <el-dialog class="dy-dialog"
            :title="diaTitle"
            :visible.sync="dialogVisible"
            top="0">
            <self-table v-show="table === 1"
                class="params-table"
                :data="tableData"
                :loading="tableLoading"
                :maxRow="9">
                <el-table-column label="序号"
                    fixed
                    :width="tr.rank * $store.state.rem">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="ENTPRSNAME"
                    label="投标单位"
                    fixed
                    :width="tr.tbdw * $store.state.rem">
                </el-table-column>
                <el-table-column label="标书信息"
                    :width="tr.bsxj * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_PC"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_PC"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="错漏项"
                    :width="tr.clx * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_QD"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_QD"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="最高投标限价"
                    :width="tr.zgtbxj * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_PricePC"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_PricePC"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="单价与费用组成"
                    :width="tr.djyfyzc * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_DJ_RCJFY"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_DJ_RCJFY"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="合价检查结果"
                    :width="tr.hjjcjg * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_DJ_SL_HJ"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_DJ_SL_HJ"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="总报价检查结果"
                    :width="tr.zbjjcjg * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_HJ_ZBJ"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_HJ_ZBJ"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="不平衡报价情况"
                    :width="tr.bphbjqk * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_BPHBJ"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_BPHBJ"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="雷同性情况"
                    :width="tr.ltxqk * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_LTX"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_LTX"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="不可竞争费核查"
                    :width="tr.bkjzfhc * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_BKJZFHC"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_BKJZFHC"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="规费、税金检查"
                    :width="tr.gfsjjc * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.IS_GF_SJ"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.IS_GF_SJ"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column label="主要清单检查"
                    :width="tr.zycqjc * $store.state.rem">
                    <template slot-scope="scope">
                        <i v-show="scope.row.Is_主要清单检查_招商局"
                            class="el-icon-check text-success qb-icon"></i>
                        <i v-show="!scope.row.Is_主要清单检查_招商局"
                            class="el-icon-close text-danger qb-icon"></i>
                    </template>
                </el-table-column>
            </self-table>
            <self-table v-show="table === 2"
                class="params-table"
                :data="tableDataPc"
                :loading="tableLoading"
                :maxRow="9">
                <el-table-column label="序号"
                    fixed
                    :width="tr2.rank * $store.state.rem">
                    <template slot-scope="scope">
                        {{ scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="Memo_PC"
                    label="投标单位"
                    fixed
                    :width="tr2.tbdw * $store.state.rem">
                </el-table-column>
                <el-table-column prop="CPU_SN"
                    label="芯片批次号"
                    :width="tr2.ltxqk * $store.state.rem">
                </el-table-column>
                <el-table-column prop="IDE_SN"
                    label="硬盘序列号"
                    :width="tr2.bkjzfhc * $store.state.rem">
                </el-table-column>
                <el-table-column prop="CDSN"
                    label="网卡序列号"
                    :width="tr2.gfsjjc * $store.state.rem">
                </el-table-column>
            </self-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'qb-result',
    data () {
        return {
            qbList: [],
            diaTitle: '',
            dialogVisible: false,
            tableData: [],
            tr: {
                rank: 0.8,
                tbdw: 3.8,
                bsxj: 1.5,
                clx: 1.5,
                zgtbxj: 2,
                djyfyzc: 2,
                hjjcjg: 2,
                zbjjcjg: 2,
                bphbjqk: 2,
                ltxqk: 1.5,
                bkjzfhc: 2,
                gfsjjc: 2,
                zycqjc: 2,
            },
            tableData2: [
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
                {
                    tbdw: '',
                    xpjdh: '',
                    ypxlh: '',
                    wkxlh: '',
                },
            ],
            tr2: {
                rank: 0.8,
                tbdw: 6.8,
                xpjdh: 2.67,
                ypxlh: 3,
                wkxlh: 3.61,
            },
            table: 1,
            selectedIndex: 0,
            tableDataPc: [], // 电脑硬件信息
            tableLoading: true,
        };
    },
    methods: {
        showAll () {
            this.diaTitle = '总体检查结果';
            this.dialogVisible = true;
            this.table = 1;
            this.getQbTotalCheckData();
        },
        // 硬件信息检查
        showPcData (item, index) {
            this.diaTitle = '电脑硬件信息描述';
            this.dialogVisible = true;
            this.table = 2;
            this.selectedIndex = index;
            this.getQbPcData();
        },
        showDetail (item, index) {
            this.diaTitle = '电脑硬件信息描述';
            this.dialogVisible = true;
            this.table = 3;
            this.selectedIndex = index;
        },
        getData () {
            this.getQbTotalCheck();
        },
        // 界面上清标报告的显示
        async getQbTotalCheck () {
            const res = await this.portService.getQbTotalCheck();
            // console.log('界面上清标报告的显示', res.data.value);
            this.qbList = res.data.value;
        },
        // 获取硬件信息
        async getQbPcData () {
            this.tableLoading = true;
            const res = await this.portService.getQbPcData();
            // console.log('硬件信息', res.data.value);
            this.tableDataPc = res.data.value;
            this.tableLoading = false;
        },
        // 获取所有进入评标系统的投标单位信息
        async getQbTotalCheckData () {
            this.tableLoading = true;
            const res = await this.portService.getQbTotalCheckData();
            // console.log('getQbTotalCheckData', res.data.value);
            this.tableData = res.data.value;
            this.tableLoading = false;
        },
    },
    mounted () {
        this.getData();
    },
};
</script>

<style lang="scss" scoped>
    .qbr-main {
        .main-wrap {
            color: #333;
            font-size: 0.26rem;
            font-weight: 700;
            margin: 0.27rem 0.3rem 0 0.7rem;

            .main-title {
                margin-bottom: 0.27rem;
            }

            .detail-btn {
                border: 1px solid $colorActive;
                color: $colorActive;
                padding: 0 0.19rem;
                font-size: $fontL;
                border-radius: 0.05rem;
                height: 0.35rem;
                margin-left: 0.23rem;
                font-weight: normal;
                display: inline-block;
                vertical-align: middle;
                line-height: 0.31rem;

                &:active {
                    @include btn-active;
                }
            }

            .detail-list {
                font-size: 0.24rem;

                .detail-item {
                    padding: 0.21rem 0;
                    border-top: 1px dashed #ccc;

                    .title {
                        position: relative;

                        .qbr-icon {
                            position: absolute;
                            left: -0.4rem;
                            width: 0.3rem;
                            height: 0.3rem;
                        }
                    }

                    .cont {
                        color: #666;
                        font-weight: normal;
                        line-height: 0.5rem;
                        margin-top: 0.2rem;
                        white-space: pre-line;
                    }
                }
            }
        }

        .qb-icon {
            font-size: 0.3rem;
            font-weight: 700;
        }

        /deep/ .dy-dialog {
            .el-dialog {
                width: 17.3rem;
            }

            .el-table .el-table__body .cell,
            .el-table .el-table__body th div {
                color: #333;
            }
        }
    }
</style>
