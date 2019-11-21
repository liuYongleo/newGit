// 定量
<template>
    <div class="project-manage"
        :class="[$store.state.barPosition]">
        <review-main class="qxx-review-modal"
            :title="title"
            v-bind="$attrs"
            v-on="$listeners">
            <!-- 同步 -->
            <template slot="content"
                v-if="$store.state.reviewType === 1">
                <!-- <h5 class="content-title">
                    <span>评审因素-</span>
                    <span class="strong-color">2</span>
                    <span>项</span>
                </h5>
                <div class="title-box">--定量评估--</div>
                <h6 class="content-sub-title">
                    <span class="strong-color">*</span>
                    <span>评审标准</span>
                </h6> -->
                <div class="introduce"
                    v-self-touch:swiperight="factorSwipeRight"
                    v-self-touch:swipeleft="factorSwipeLeft">
                    <div class="introduce-row">
                        <div class="introduce-title">
                            <p>评审因素</p>
                            <span class="introduce-score">{{reviewIndex + 1}}项<span class="introduce-unit">/{{reviewDataCopy.length}}项</span></span>
                        </div>
                        <div class="introduce-value text-success">
                            {{reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].ITEMNAME}}
                        </div>
                    </div>
                    <div class="introduce-row">
                        <div class="introduce-title">
                            <p>评审标准</p>
                            <p class="introduce-score">满分{{reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].HIGHSCORE}}分</p>
                        </div>
                        <div class="introduce-value introduce-standard">
                            {{reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].ITEMMEMO}}
                        </div>
                    </div>
                </div>
                <!-- <h6 class="content-sub-title">
                    <span class="strong-color">*</span>
                    <span>投标单位-</span>
                    <span class="strong-color">{{companyList.length}}</span>
                    <span>家</span>
                </h6> -->
                <div class="content-bottom">
                    <div>
                        <button v-show="formEditable"
                            class="hollow-btn"
                            @click="confirm($event, 1)">
                            提交结果
                        </button>
                    </div>
                    <div>
                        <button class="review-btn mr"
                            ref="lastBtn"
                            :class="[reviewIndex === 0 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeParam($event, -1)">
                            上一项
                        </button>
                        <button ref="nextBtn"
                            class="hollow-btn"
                            :class="[reviewIndex === reviewDataCopy.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeParam($event, 1)">
                            下一项
                        </button>
                        <!-- <button v-show="!formEditable"
                            class="hollow-btn"
                            @click="nextReview($event)">
                            下一评审环节
                        </button> -->
                    </div>
                </div>
                <div class="hs-table">
                    <div class="table-content-wrap">
                        <el-row v-for="(item,index) in companyListCopy"
                            :key="index"
                            class="content-row">
                            <el-col :span="1">
                                {{index + 1}}
                            </el-col>
                            <el-col :span="16">
                                <div class="text-overflow">
                                    {{item.name}}
                                </div>
                            </el-col>
                            <el-col :span="6"
                                :offset="1"
                                class="flex-end">
                                <review-score class="rpm-input"
                                    title="评分"
                                    inputTitle="分数"
                                    :isScore="true"
                                    :score.sync="item.Score"
                                    :reason.sync="item.Reason"
                                    :compName="item.name"
                                    :dataIndex="index"
                                    :maxScore="reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].HIGHSCORE"
                                    :formEditable="formEditable"
                                    @confirm="confirmParam"></review-score>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </template>
            <!-- 异步 -->
            <template slot="content"
                v-if="$store.state.reviewType === 2">
                <div class="async-cont">
                    <div class="comp-wrap">
                        <button class="comp-btn"
                            :class="[reviewComp === 0 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeComp($event, -1)">
                            上一家
                        </button>
                        <span class="comp-name text-overflow">{{companyListCopy[reviewComp] && companyListCopy[reviewComp].name}}</span>
                        <button class="comp-btn"
                            :class="[reviewComp === companyListCopy.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeComp($event, 1)">
                            下一家
                        </button>
                    </div>
                    <div class="content-bottom"
                        v-show="formEditable">
                        <button class="hollow-btn"
                            @click="confirm($event, 2)">
                            提交结果
                        </button>
                        <!-- <button v-show="confirmState === 2"
                            class="hollow-btn"
                            @click="!formEditable">
                            下一评审环节
                        </button> -->
                    </div>
                    <div class="async-introduce">
                        <div class="introduce"
                            :class="{'review-params-wrap': $store.state.reviewWinState === 3}"
                            v-for="(item, index) in reviewDataCopy"
                            :key="index">
                            <div :class="{'review-params-left': $store.state.reviewWinState === 3}">
                                <div class="introduce-row">
                                    <div class="introduce-title">
                                        <p>评审因素</p>
                                        <span class="introduce-score">{{index + 1}}项<span class="introduce-unit">/{{reviewDataCopy.length}}项</span></span>
                                    </div>
                                    <div class="introduce-value text-success">
                                        {{item.ITEMNAME}}
                                    </div>
                                </div>
                                <div class="introduce-row">
                                    <div class="introduce-title">
                                        <p>评审标准</p>
                                        <p class="introduce-score">满分10分</p>
                                    </div>
                                    <div class="introduce-value">
                                        {{item.ITEMMEMO}}
                                    </div>
                                </div>
                                <div class="introduce-row"
                                    v-show="$store.state.reviewWinState !== 3">
                                    <div class="introduce-title"></div>
                                    <div class="introduce-value"
                                        :class="{'align-right': $store.state.reviewWinState === 2}">
                                        <review-score class="rpm-input"
                                            title="评分"
                                            inputTitle="分数"
                                            :isScore="true"
                                            :score.sync="item.Score"
                                            :reason.sync="item.Reason"
                                            :compName="item.name"
                                            :dataIndex="index"
                                            :maxScore="item.HIGHSCORE"
                                            :formEditable="formEditable"
                                            @confirm="confirmParam"></review-score>
                                    </div>
                                </div>
                            </div>
                            <div class="review-btn"
                                v-show="$store.state.reviewWinState === 3">
                                <review-score class="rpm-input"
                                    title="评分"
                                    inputTitle="分数"
                                    :isScore="true"
                                    :score.sync="item.Score"
                                    :reason.sync="item.Reason"
                                    :compName="item.name"
                                    :dataIndex="index"
                                    :maxScore="item.HIGHSCORE"
                                    :formEditable="formEditable"
                                    @confirm="confirmParam"></review-score>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </review-main>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';
import reviewScore from '@/components/project-components/side-bar/side-bar-review/review-score';

export default {
    name: 'review-dl',
    components: {
        reviewMain,
        reviewScore,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            companyList: [],
            reviewData: [],
            pwData: [],
            reviewIndex: 0, // 评审因素index
            reviewComp: 0, // 评审企业index
            confirmState: 0, // 提交状态 0-未提交 1-提交中 2-已提交
            formSubmitted: true, // 用户是否提交过该阶段得表单
        };
    },
    watch: {
        '$store.state.reviewStep' (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getData();
            }
        },
        '$store.state.reviewType' (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.getData();
            }
        },
    },
    computed: {
        companyListCopy () {
            const flowData = this.selectedReviewData || {};
            let data = [];
            let reviewData = this.reviewData[this.reviewIndex];
            if (this.companyList.length) {
                data = this.companyList.map(item => {
                    if (flowData.IsOpen) {
                        this.$set(item, 'name', item.ENTPRSNAME);
                    } else {
                        this.$set(item, 'name', item['暗标名称']);
                    }
                    for (let pw of this.pwData) {
                        if (pw.BidFileGuid === item.BidFileGuid && reviewData && reviewData.ID && pw.ItemId === reviewData.ID) {
                            // item.Score = pw.Score;
                            item.PublicId = pw.PublicId;
                            // item.Reason = pw.Reason;
                            this.$set(item, 'Score', pw.Score);
                            this.$set(item, 'Reason', pw.Reason);
                            break;
                        }
                    }
                    return item;
                });
            }
            return data;
        },
        reviewDataCopy () {
            let data = [];
            let compData = this.companyList[this.reviewComp];
            if (this.reviewData.length) {
                data = this.reviewData.map(item => {
                    for (let pw of this.pwData) {
                        if (pw.ItemId === item.ID && compData && compData.BidFileGuid && pw.BidFileGuid === compData.BidFileGuid) {
                            // item.Score = pw.Score;
                            item.PublicId = pw.PublicId;
                            // item.Reason = pw.Reason;
                            this.$set(item, 'Score', pw.Score);
                            this.$set(item, 'Reason', pw.Reason);
                            break;
                        }
                    }
                    return item;
                });
            }
            return data;
        },
        // 表单是否可编辑
        formEditable () {
            const flowData = this.selectedReviewData || {};
            return [ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1 && !this.formSubmitted;
        },
    },
    methods: {
        // -1上/1下项
        changeParam (e, num) {
            // 现评审因素上一项大于0，或者现评审因素下一项小于数组长度
            if (this.reviewIndex + num < this.reviewData.length && this.reviewIndex + num >= 0) {
                this.reviewIndex = this.reviewIndex + num;
                if (e) {
                    this.activeBtn(e);
                }
            }
        },
        // -1上/1下一家
        changeComp (e, num) {
            console.log(num);
            if (this.reviewComp + num < this.companyList.length && this.reviewComp + num >= 0) {
                this.reviewComp = this.reviewComp + num;
                this.activeBtn(e);
            }
        },
        // 提交结果
        async confirm (e, type) {
            let flag = true;
            if (type === 1) {
                // 同步
                this.companyListCopy.forEach(item => {
                    if (item.Score === '') {
                        flag = false;
                    }
                });
            } else {
                // 异步
                this.reviewDataCopy.forEach(item => {
                    if (item.Score === '') {
                        flag = false;
                    }
                });
            }
            if (flag) {
                this.activeBtn(e);
                const flowData = this.selectedReviewData || {};
                const res = await this.portService.submitPb(flowData.FlowName, flowData.FlowPSType);
                if (res.code === 200) {
                    // 提交结果刷新下流程
                    this.$store.dispatch('getFlowData');
                    this.alert({ content: '评审结果已提交成功！', });
                }
            } else {
                this.alert({ content: '您还未完成全部评审，不可提交！', });
            }
        },
        // 下一评审环节
        async nextReview (e) {
            this.activeBtn(e);
            let flag = true;
            let reviewStep = this.$store.state.reviewStep;
            const res = await this.portService.checkCanGoFlow(this.$store.state.flowDataPicker[reviewStep + 1].FlowName);
            flag = res.data.value;
            if (flag.Result) {
                this.$store.commit('save', { path: 'reviewStep', data: reviewStep + 1, });
                this.reviewJump(this.$store.state.flowDataPicker[reviewStep]);
            } else {
                this.flowBtnAlert();
            }
        },
        // 因素区域右滑，上一项
        factorSwipeRight () {
            this.changeParam(null, -1);
        },
        // 因素区域左滑，下一项
        factorSwipeLeft () {
            this.changeParam(null, 1);
        },
        // 获取企业数据
        async getComps () {
            const flowData = this.selectedReviewData || {};
            const res = await this.portService.getTbComp(flowData.FlowName);
            this.companyList = res.data.value;
        },
        // 获取评审因素
        async getParams () {
            const flowData = this.selectedReviewData || {};
            const res = await this.portService.getReviewParams(flowData.FlowName);
            this.reviewData = res.data.value;
        },
        // 获取评委的评审数据
        async getCurrentReviewData () {
            const flowData = this.selectedReviewData || {};
            const res = await this.portService.getCurrentReviewData(flowData.FlowName);
            this.pwData = res.data.value;
            console.log('pwData', this.pwData);
        },
        // 判断用户当前流程是否提交数据
        async checkCommit () {
            const flowData = this.selectedReviewData || {};
            if ([ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                let res = await this.portService.checkStageCommit(flowData.FlowName);
                this.formSubmitted = res.data.value;
            }
        },
        // 修改评分
        async confirmParam ({ score, reason, index, }) {
            let data = null;
            if (this.$store.state.reviewType === 1) {
                // 同步
                data = this.companyListCopy[index];
            } else {
                // 异步
                data = this.reviewDataCopy[index];
            }
            const res = await this.portService.editDl(data.PublicId, score, reason);
            if (res.code === 200) {
                data.Reason = reason;
                data.Score = score;
                this.getCurrentReviewData();
            }
        },
        // 获取数据
        getData () {
            this.getCurrentReviewData();
            this.getParams();
            this.getComps();
            this.checkCommit();
        },
    },
    mounted () {
        this.getData();
    },
};
</script>

<style scoped lang="scss">
    .project-manage {
        width: 100%;
        padding-bottom: 0.28rem;

        /deep/ .qxx-review-modal input {
            width: 1.4rem;
            height: 0.4rem;
            padding: 0;
            border: solid 1px #999;
            font-size: $fontL;
            color: #666;
            text-align: center;
        }
    }
</style>
