<template>
    <div class="summary-main">
        <review-main class="review-modal"
            :title="'评审汇总'"
            v-bind="$attrs"
            v-on="$listeners">
            <template slot="content">
                <!-- <h6 class="content-sub-title">
                    <span>投标单位-</span>
                    <span class="strong-color">{{companyList.length}}</span>
                    <span>家</span>
                </h6> -->
                <div class="hs-table">
                    <div class="table-header-wrap">
                        <el-row class="table-header">
                            <el-col :span="14">
                                <div>单位名称</div>
                            </el-col>
                            <el-col :span="10">
                                <div class="align-center">{{projectPbType}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="table-content-wrap">
                        <el-row v-for="(item,index) in companyList"
                            :key="index"
                            class="content-row">
                            <el-col :span="1">
                                {{index + 1}}
                            </el-col>
                            <el-col :span="13">
                                <div class="text-overflow">
                                    {{item.ENTPRSNAME}}
                                </div>
                            </el-col>
                            <el-col :span="10"
                                class="switch-wrap">
                                <el-switch class="project-switch"
                                    :value.sync="item.Is_Elected"
                                    :inputValue.sync="item.BadBidNote"
                                    active-color="#00bb8e"
                                    active-text="是"
                                    inactive-text="否"
                                    :dataIndex="index"
                                    :width="0.85 * $store.state.rem"
                                    @change="bidding($event, index)">
                                </el-switch>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="content-bottom" v-if="formEditable">
                    <button class="hollow-btn"
                        @click="confirm">
                        提交结果
                    </button>
                </div>
            </template>
        </review-main>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';

export default {
    name: 'review-summary',
    props: {
        stepIndex: {
            type: Number,
            require: true,
        },
    },
    data () {
        return {
            formSubmitted: true, // 用户是否提交过该阶段得表单
        };
    },
    computed: {
        projectPbType () {
            let projectData = this.$store.state.project || {};
            return projectData.PBType === 16 ? '是否中标候选人' : projectData.PBType === 8 ? '是否通过资格审查' : '';
        },
        companyList () {
            let list = this.$store.state.summaryReviewData || [];
            // list.length && list.forEach(item => {
            //     if (projectData.PBType === 16) {
            //         this.$set(item, 'checked', item['是否中标候选人']);
            //     } else if (projectData.PBType === 8) {
            //         this.$set(item, 'checked', item['是否通过资格审查']);
            //     }
            // });
            return list;
        },
        // 表单是否可编辑
        formEditable () {
            const flowData = this.selectedReviewData || {};
            return [ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1 && !this.formSubmitted;
        },
    },
    components: {
        reviewMain,
    },
    methods: {
        // 点击中标候选人
        async bidding (value, index) {
            if (!this.formEditable) {
                return this.alertCanNotEdit();
            }
            if (!this.$store.state.isLeader) {
                return this.alertOnlyLeader();
            }
            let data = this.companyList[index];
            const res = await this.portService.editElected(data.BIDFILEID, value);
            if (res.code === 200) {
                data.Is_Elected = value;
            }
        },
        // 提交结果
        confirm () {
            if (!this.$store.state.isLeader) {
                return this.alertOnlyLeader();
            }
            let num = 0;
            this.companyList.forEach(item => {
                if (item.Is_Elected) {
                    num += 1;
                }
            });
            this.$confirm('请确认排名是否正确', '提示', {
                customClass: 'dy-msg-box',
                confirmButtonClass: 'el-button--success',
            }).then(() => {
                this.$confirm(`推荐中标候选人数量为${num}，提交后将不能修改！确定提交吗？`, '提示', {
                    customClass: 'dy-msg-box',
                    confirmButtonClass: 'el-button--success',
                }).then(() => {
                    this.portService.submitPriceOrSummary(this.selectedReviewData.FlowId, this.selectedReviewData.FlowName).then(res => {
                        if (res.code === 200) {
                            this.formSubmitted = true;
                            this.selectedReviewData.EvalStatus_Flow = 2;
                            // 提交结果刷新下流程
                            this.$store.dispatch('getFlowData');
                            this.alert({content: '评审结果已提交成功！', });
                        }
                    });
                });
            });
        },
        // 判断用户当前流程是否提交了数据
        async checkCommit () {
            const flowData = this.selectedReviewData || {};
            if ([ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                let res = await this.portService.checkStageCommit(flowData.FlowName);
                // console.log(res);
                this.formSubmitted = res.data.value;
            }
        },
    },
    mounted () {
        this.checkCommit();
    },
};
</script>

<style lang="scss" scoped>
    .summary-main {
        width: 100%;
        padding-bottom: 0.4rem;
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

            .switch-wrap {
                display: flex;
                justify-content: center;
            }
        }

        .content-bottom {
            padding-top: 0.5rem;
            text-align: center;

            .hollow-btn {
                &:active {
                    background-color: $colorActive;
                    color: #fff;
                }
            }
        }
    }
</style>
