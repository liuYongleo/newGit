<template>
    <!-- 查看价格评审 -->
    <div class="rs-main">
        <h3 class="main-title">价格评审-{{hasList ? '有清单' : '无清单'}}</h3>
        <div class="main-detail" v-if="hasList">
            <ul class="detail-list">
                <li class="detail-list-item">
                    控制价: <span class="text-success">{{priceData.TopPrice | empty}}元</span>
                </li>
                <li class="detail-list-item">
                    控制价{{priceData.TopPrice_N | empty}}%: <span class="text-success">{{priceData.TopPriceN | empty}}元</span>
                </li>
                <li class="detail-list-item">
                    控制价相应价格{{priceData.TopPrice_N2 | empty}}%: <span class="text-success">{{priceData.TopPriceN2 | empty}}元</span>
                </li>
                <li class="detail-list-item">
                    有效投标报价均值: <span class="text-success">{{priceData.AvgEvalTotalPrice | empty}}元</span>
                </li>
                <li class="detail-list-item">
                    评标基准价: <span class="text-success">{{priceData.BaseTotalPrice | empty}}元</span>
                </li>
            </ul>
        </div>
        <div class="line"></div>
        <section class="rs-table-wrap">
            <self-table class="rs-table"
                :data="tableData"
                :maxRow="9"
                :loading="loading">
                <el-table-column v-for="(item, index) in tableHeaderCopy" :key="item.key" :prop="item.key"
                    :label="item.label"
                    :fixed="index < 3"
                    :width="item.width * $store.state.rem">
                    <el-table-column v-if="item.children && item.children.length" v-for="(subItem, subIndex) in item.children" :key="subItem.key" :prop="subItem.key"
                        :label="subItem.label"
                        :width="subItem.width * $store.state.rem">
                            <template slot-scope="scope">
                                <p class="align-center">{{ scope.row[item.key] }}</p>
                            </template>
                    </el-table-column>
                </el-table-column>
            </self-table>
        </section>
    </div>
</template>

<script>
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
                    key: 'price',
                    label: '投标报价（元）',
                    width: 1.8,
                },
                {
                    key: 'rate',
                    label: '报价费率（%）',
                    width: 1.8,
                },
                {
                    key: 'BUSISCORE',
                    label: '得分合计',
                    width: 1.5,
                },
                {
                    key: 'BaseTotalPrice',
                    label: '评标基准价（元）',
                    width: 1.5,
                },
                {
                    key: 'PriceScore',
                    label: '评标价得分',
                    width: 1.5,
                },
                {
                    key: 'reasonable',
                    label: '商务标合理性评分',
                    width: 2.3,
                },
                {
                    key: 'AQWMSGF',
                    label: '安全文明措施费（元）',
                    width: 2.1,
                },
                {
                    key: 'safeBase',
                    label: '安全文明措施费基准价（元）',
                    width: 2.7,
                },
                {
                    key: 'safeScore',
                    label: '安全文明措施费得分',
                    width: 2.5,
                },
                {
                    key: 'EvalTotalPrice',
                    label: '评标价（元）',
                    width: 2.1,
                },
                {
                    key: 'first',
                    label: '低于成本第一条',
                    children: [
                        {
                            key: 'IsLessThanTopPriceN',
                            label: '是否低于控制价70%',
                            width: 2.5,
                        },
                        {
                            key: 'IsGreaterThanTopPrice',
                            label: '是否高于控制价',
                            width: 2.5,
                        },
                    ],
                },
                {
                    key: 'second',
                    label: '低于成本第二条',
                    children: [
                        {
                            key: 'AvgEvalTotalPriceM',
                            label: '有效投标报价均值95%',
                            width: 2.8,
                        },
                    ],
                },
                {
                    key: 'secondRate',
                    label: '低于成本第二条',
                    children: [
                        {
                            key: 'average90',
                            label: '国家发文规定90%',
                            width: 2.5,
                        },
                        {
                            key: 'AvgEvalTotalPriceM',
                            label: '有效投标报价均值95%',
                            width: 2.8,
                        },
                    ],
                },
            ],
            tableData: [],
            priceData: {},
            loading: true,
        };
    },
    filters: {
        bolText: value => {
            return value ? '是' : '否';
        },
    },
    computed: {
        // 是否有清单 true/false
        hasList () {
            return this.$store.state.project['需要清单'];
        },
        // 价格或费率
        isPrice () {
            return true;
        },
        tableHeaderCopy () {
            let th = this.tableHeader;
            let price = this.priceData || {};
            let priceHead = [ 'rate', 'BaseTotalPrice', 'reasonable', 'safeBase', 'safeScore', 'secondRate', 'first', 'second', ];
            let rateHead = [ 'price', 'BaseTotalPrice', 'reasonable', 'safeBase', 'safeScore', 'second', 'first', 'secondRate', ];
            if (!price.isDiYuChengBen) {
                // 是否显示第一二条
                priceHead.splice(priceHead.indexOf('first'), 1);
                priceHead.splice(priceHead.indexOf('second'), 1);
                rateHead.splice(priceHead.indexOf('first'), 1);
                rateHead.splice(priceHead.indexOf('secondRate'), 1);
            } else {
                if (!price.isDiYuChengBenDiYiTiao) {
                    // 是否显示第一条
                    priceHead.splice(priceHead.indexOf('first'), 1);
                    rateHead.splice(priceHead.indexOf('first'), 1);
                }
            }
            let data = [];
            th.forEach(item => {
                if (this.hasList) {
                    // 有清单
                    if (this.isPrice) {
                        // 价格
                        if (priceHead.indexOf(item.key) === -1) {
                            if (item.key === 'price') item.key = 'TOTALPRICE';
                            data.push(item);
                        }
                    } else {
                        // 费率
                        if (rateHead.indexOf(item.key) === -1) {
                            if (item.key === 'rate') item.key = 'TOTALPRICE';
                            data.push(item);
                        }
                    }
                } else {
                    // 无清单
                    if ([ 'first', 'second', 'secondRate', 'rate', 'EvalTotalPrice', ].indexOf(item.key) === -1) {
                        if (item.key === 'price') item.key = 'TOTALPRICE';
                        data.push(item);
                    }
                }
            });
            return data;
        },
    },
    methods: {
        showDialog (scope) {
            this.dialogVisible = true;
        },
        // 获取数据
        async getData () {
            let flowData = this.selectedReviewData || {};
            // 进入价格评审之前先调用这两个接口
            if ([ 0, 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                await this.portService.calPrice();
                await this.portService.calOrder();
            }
            const res = await this.portService.getPriceViewData('价格评审');
            const data = res.data.value;
            this.tableData = data.Table || [];
            this.priceData = data.Data[0] || {};
            this.$store.commit('save', {path: 'priceReviewData', data: data, });
            this.loading = false;
        },
    },
    mounted () {
        this.getData();
    },
};
</script>

<style lang="scss" scoped>
    .rs-main {
        .main-title {
            border-bottom: none;
        }

        .main-detail {
            padding: 0 0 0.2rem 0.31rem;
        }

        .line {
            display: block;
            width: inherit;
            height: 1px;
            background: #dcdcdc;
            margin-bottom: .2rem;
        }

        .detail-list {
            font-size: $fontM;
            color: #666;

            .detail-list-item {
                display: inline-block;
                margin-right: 0.38rem;
            }
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
        }

        /deep/ .rs-table.el-table .el-table__header {
            th {
                padding-top: 0.17rem;
                padding-bottom: 0.17rem;
            }
        }

        /deep/ .el-table thead.is-group th {
            background-color: #00bb8e;
        }
    }

    .text-main {
        font-size: 0.26rem;
        color: #333;
    }
</style>
