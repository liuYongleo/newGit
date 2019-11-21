<template>
    <div class="rp-main">
        <review-main class="review-modal"
            :title="'价格评审'"
            v-bind="$attrs"
            v-on="$listeners">
            <template slot="content">
                <!-- <h6 class="content-sub-title">
                    <span class="strong-color">*</span>
                    <span>投标单位-</span>
                    <span class="strong-color">{{companyList.length}}</span>
                    <span>家</span>
                </h6> -->
                <div class="hs-table">
                    <div class="table-header-wrap">
                        <el-row class="table-header">
                            <el-col :span="12"
                                class="middle">
                                <div>单位名称</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="table-th align-center">是否低<br>于成本</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="table-th align-center">是否<br>废标</div>
                            </el-col>
                            <el-col :span="4">
                                <div class="table-th align-center">废标<br>理由</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="table-content-wrap">
                        <el-row v-for="(item,index) in companyList"
                            :key="index"
                            class="content-row">
                            <el-col :span="1">
                                {{item.SCOREORDER}}
                            </el-col>
                            <el-col :span="11">
                                <div class="text-overflow">
                                    {{item.ENTPRSNAME}}
                                </div>
                            </el-col>
                            <el-col :span="4"
                                class="check-wrap">
                                <!-- <el-checkbox class="dy-check"
                                    v-model="item.underCost"
                                    disabled></el-checkbox> -->
                                <el-switch class="project-switch"
                                    v-model="item.IS_低于成本"
                                    active-color="#00bb8e"
                                    active-text="是"
                                    inactive-text="否"
                                    disabled
                                    :width="0.85 * $store.state.rem">
                                </el-switch>
                            </el-col>
                            <el-col :span="4"
                                class="check-wrap">
                                <!-- <el-checkbox class="dy-check"
                                    v-model="item.abandon"
                                    @change="abandon($event, item)"></el-checkbox> -->
                                <!-- <modal-check :inputValue.sync="item.reason"
                                    v-model="item.abandon"
                                    modal-title="不合格原因"></modal-check> -->
                                <modal-switch :inputValue.sync="item.BadBidNote"
                                    :value.sync="item.Is_BadBid"
                                    :disabled="priceData.isDiYuChengBenPingShenZiDongFeiBiao"
                                    :dataIndex="index"
                                    modal-title="废标原因"
                                    :formEditable="formEditable"
                                    :onlyLeader="true"
                                    @confirm="invalidBid"
                                    @click.native="checkCanClick"></modal-switch>
                            </el-col>
                            <el-col :span="4"
                                class="check-wrap">
                                <div class="text-overflow">
                                    {{item.BadBidNote}}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="content-bottom"
                    v-show="formEditable">
                    <button class="hollow-btn"
                        @click="submitPrice">
                        提交结果
                    </button>
                </div>
            </template>
        </review-main>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';
import promptModal from '@/components/project-components/prompt-modal/prompt-modal';

export default {
    name: 'review-price',
    props: {
        stepIndex: {
            type: Number,
            require: true,
        },
    },
    data () {
        return {
            modal: false,
            modalText: '',
            modalItem: null,
            pwData: [],
            formSubmitted: true, // 用户是否提交过该阶段得表单
        };
    },
    components: {
        reviewMain,
        promptModal,
    },
    computed: {
        companyList () {
            let list = this.$store.state.priceReviewData.Table || [];
            return list;
        },
        priceData () {
            return this.$store.state.priceReviewData.Data[0] || {};
        },
        // 表单是否可编辑
        formEditable () {
            const flowData = this.selectedReviewData || {};
            return [ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1 && !this.formSubmitted;
        },
    },
    methods: {
        // 是否废标
        abandon (checked, item) {
            this.modalText = '';
            if (checked) {
                this.modal = true;
                this.modalItem = item;
            } else {
                item.reason = '';
            }
        },
        modalClose () {
            this.modalItem.reason = this.modalText;
        },
        // 废标确认
        async invalidBid ({ checked, reason, dataIndex, }) {
            let data = this.companyList[dataIndex];
            const res = await this.portService.invalidBid(data.BIDFILEID, checked, reason);
            if (res.code === 200) {
                data.Is_BadBid = checked;
                data.BadBidNote = reason;
            }
        },
        // 提交结果
        async submitPrice () {
            if (!this.$store.state.isLeader) {
                return this.alertOnlyLeader();
            }
            this.$confirm('提交价格评审结果以后不能修改！确定提交吗？', '提示', {
                customClass: 'dy-msg-box',
                confirmButtonClass: 'el-button--success',
            }).then(() => {
                let data = this.selectedReviewData || {};
                this.portService.submitPriceOrSummary(data.FlowId, data.FlowName).then(res => {
                    this.formSubmitted = true;
                    // 提交结果刷新下流程
                    this.$store.dispatch('getFlowData');
                    this.alert({ content: '评审结果已提交成功！', });
                });
            });
        },
        // 判断用户当前流程是否提交了数据
        async checkCommit () {
            const flowData = this.selectedReviewData || {};
            if ([ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                let res = await this.portService.checkStageCommit(flowData.FlowName);
                this.formSubmitted = res.data.value;
            }
        },
        // 判断是否可废标
        checkCanClick () {
            if (this.priceData.isDiYuChengBenPingShenZiDongFeiBiao) {
                this.alert({content: '自动废标，不可编辑', });
            }
        },
    },
    mounted () {
        this.checkCommit();
    },
};
</script>

<style lang="scss" scoped>
    .rp-main {
        width: 100%;
        padding-bottom: 0.3rem;
    }

    .review-modal {
        .content-title {
            padding: 0.05rem 0 0.2rem 0;
        }

        .title-box {
            height: 0.7rem;
            line-height: 0.7rem;
            font-size: 0.26rem;
            text-align: center;
            color: $green;
            background-color: #f2f2f2;
        }

        .content-sub-title {
            padding: 0 0 0.2rem 0;
            color: #666;
            font-size: $fontXL;
        }

        .introduce {
            padding: 0.09rem 0.13rem 0.15rem 0.13rem;
            font-size: $fontL;
            color: #999;
            background-color: #f2f2f2;

            p {
                line-height: 0.35rem;
            }
        }

        .table-content-wrap {
            max-height: 3.6rem;
            overflow-y: auto;

            .check-wrap {
                display: flex;
                justify-content: center;
            }
        }

        .content-bottom {
            padding-top: 0.3rem;
            text-align: center;

            .hollow-btn {
                &:active {
                    background-color: $colorActive;
                    color: #fff;
                }
            }
        }

        .table-header {
            display: flex;
            align-items: center;

            .table-th {
                line-height: 0.3rem;
            }
        }
    }
</style>
