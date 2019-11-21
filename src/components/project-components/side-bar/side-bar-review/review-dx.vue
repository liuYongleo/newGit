// 定性
<template>
    <div class="qb-main">
        <review-main class="qxx-review-modal"
            :title="title"
            v-bind="$attrs"
            v-on="$listeners">
            <!-- 同步 -->
            <template slot="content"
                v-if="$store.state.reviewType === 1">
                <div class="introduce"
                    v-self-touch:swiperight="factorSwipeRight"
                    v-self-touch:swipeleft="factorSwipeLeft">
                    <div class="introduce-row">
                        <div class="introduce-title">
                            <p>评审因素</p>
                            <span class="introduce-score">{{reviewIndex + 1}}项<span class="introduce-unit">/{{reviewData.length}}项</span></span>
                        </div>
                        <div class="introduce-value text-success">
                            {{reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].ITEMNAME}}
                        </div>
                    </div>
                    <div class="introduce-row">
                        <div class="introduce-title">
                            <p>评审标准</p>
                        </div>
                        <div class="introduce-value introduce-standard">
                            {{reviewDataCopy[reviewIndex] && reviewDataCopy[reviewIndex].ITEMMEMO}}
                        </div>
                    </div>
                </div>
                <div class="content-bottom">
                    <button v-show="judgeConfirmed"
                        class="hollow-btn btn-click-active"
                        @click="getCompete">
                        竞争有效性判断汇总
                    </button>
                    <div class="content-bottom-inner"
                        :class="{'flex-end': !formEditable || !submitBtnShow}">
                        <button v-show="formEditable && submitBtnShow"
                            class="hollow-btn"
                            @click="confirm($event, 1)">
                            提交结果
                        </button>
                        <button v-show="formEditable"
                            class="hollow-btn"
                            :class="{'mr': !submitBtnShow}"
                            @click="checkAll($event, 1)">
                            全部合格
                        </button>
                        <button class="review-btn"
                            ref="lastBtn"
                            :class="[reviewIndex === 0 ? 'gray-btn' : 'hollow-btn', !formEditable ? 'mr' : '', !submitBtnShow ? 'mr' : '']"
                            @click="changeParam($event, -1)">
                            上一项
                        </button>
                        <button ref="nextBtn"
                            class="hollow-btn"
                            :class="[reviewIndex === reviewData.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeParam($event, 1)">
                            下一项
                        </button>
                    </div>
                </div>
                <div class="hs-table">
                    <div class="table-content-wrap">
                        <el-row v-for="(item, index) in companyListCopy"
                            :key="index"
                            class="content-row">
                            <el-col :span="1">
                                {{index + 1}}
                            </el-col>
                            <el-col :span="13">
                                <div class="text-overflow">
                                    {{item.name}}
                                </div>
                            </el-col>
                            <el-col :span="9"
                                :offset="1"
                                class="flex-end">
                                <button class="qualify-btn"
                                    :class="{'active': item.checked === 1}"
                                    :disabled="item.checked === 2"
                                    @click="confirmParam(index, {checked: 1})">
                                    合格
                                </button>
                                <!-- <button class="qualify-btn"
                                    :class="{'active': item.checked === 2}"
                                    @click="reviewCompany(item, 2)">
                                    不合格
                                </button> -->
                                <modal-btn :checked.sync="item.checked"
                                    :value.sync="item.Reason"
                                    :dataIndex="index"
                                    :disabled="item.checked === 2"
                                    modalTitle="不合格原因"
                                    :formEditable="formEditable"
                                    @confirm="confirmParam"></modal-btn>
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
                        <span class="comp-name text-overflow">{{companyListCopy[reviewComp] && companyListCopy[reviewComp].name | empty}}</span>
                        <button class="comp-btn"
                            :class="[reviewComp === companyListCopy.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeComp($event, 1)">
                            下一家
                        </button>
                    </div>
                    <div class="content-bottom"
                        v-show="formEditable">
                        <button v-show="submitBtnShow" class="hollow-btn mr"
                            @click="confirm($event, 2)">
                            提交结果
                        </button>
                        <button class="hollow-btn"
                            @click="checkAll($event, 2)">
                            全部合格
                        </button>
                        <!-- <button v-show="confirmState === 2"
                            class="hollow-btn"
                            @click="nextReview($event)">
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
                                        <span class="introduce-score">{{index + 1}}项<span class="introduce-unit">/{{reviewData.length}}项</span></span>
                                    </div>
                                    <div class="introduce-value text-success">
                                        {{item.ITEMNAME}}
                                    </div>
                                </div>
                                <div class="introduce-row">
                                    <div class="introduce-title">
                                        <p>评审标准</p>
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
                                        <button class="qualify-btn"
                                            :class="{'active': item.checked === 1}"
                                            :disabled="item.checked === 2"
                                            @click="confirmParam(index, {checked: 1})">
                                            合格
                                        </button>
                                        <modal-btn class="qualify-btn-wrap"
                                            :checked.sync="item.checked"
                                            :value.sync="item.Reason"
                                            :dataIndex="index"
                                            modalTitle="不合格原因"
                                            :disabled="item.checked === 2"
                                            :formEditable="formEditable"
                                            @confirm="confirmParam"></modal-btn>
                                    </div>
                                </div>
                            </div>
                            <div class="review-btn"
                                v-show="$store.state.reviewWinState === 3">
                                <button class="qualify-btn"
                                    :class="{'active': item.checked === 1}"
                                    :disabled="item.checked === 2"
                                    @click="confirmParam(index, {checked: 1})">
                                    合格
                                </button>
                                <modal-btn class="qualify-btn-wrap"
                                    :checked.sync="item.checked"
                                    :value.sync="item.Reason"
                                    :dataIndex="index"
                                    modalTitle="不合格原因"
                                    :disabled="item.checked === 2"
                                    :formEditable="formEditable"
                                    @confirm="confirmParam"></modal-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </review-main>
        <compete-judge :visible.sync="judgeVisible"
            @submit="competeSubmit"></compete-judge>
        <compete-result :visible.sync="resultVisible"
            :tableData="resultTableData"
            :loading="resultLoading"></compete-result>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';
import competeJudge from '@/components/project-components/compete/compete-judge';
import competeResult from '@/components/project-components/compete/compete-result';

export default {
    name: 'review-dx',
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
            formSubmitted: true, // 用户是否提交过该阶段得表单
            judgeVisible: false,
            resultVisible: false,
            resultLoading: false,
            resultTableData: [], // 竞争有效性数据
            judgeConfirmed: false, // 是否提交了竞争有效性判断
        };
    },
    components: {
        reviewMain,
        competeJudge,
        competeResult,
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
        '$store.state.competeVisible' (value) {
            if (value) {
                this.showCompeteModal();
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
                            this.$set(item, 'checked', pw.Score);
                            item.PublicId = pw.PublicId;
                            item.Reason = pw.Reason;
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
                            this.$set(item, 'checked', pw.Score);
                            item.PublicId = pw.PublicId;
                            item.Reason = pw.Reason;
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
        // 所有评审因素都评审后才显示提交按钮
        submitBtnShow () {
            const type = this.$store.state.reviewType;
            let flag = true;
            if (type === 1) {
                // 同步
                for (let item of this.companyListCopy) {
                    if ([ 0, 1, 2, ].indexOf(item.checked) === -1) {
                        flag = false;
                        break;
                    }
                }
            } else if (type === 2) {
                // 异步
                for (let item of this.reviewDataCopy) {
                    if ([ 0, 1, 2, ].indexOf(item.checked) === -1) {
                        flag = false;
                        break;
                    }
                }
            }
            return flag;
        },
    },
    methods: {
        // 企业 合格/不合格 state:1(合格) 0(不合格)
        reviewCompany (item, state) {
            item.checked = state;
        },
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
            if (this.reviewComp + num < this.companyList.length && this.reviewComp + num >= 0) {
                this.reviewComp = this.reviewComp + num;
                this.activeBtn(e);
            }
        },
        // 评审因素 合格/不合格 state:1(合格) 0(不合格)
        reviewParam (item, state) {
            item.checked = state;
        },
        // 提交结果
        async confirm (e, type) {
            let flag = true;
            if (type === 1) {
                // 同步
                this.companyListCopy.forEach(item => {
                    if (![ 0, 1, 2, ].indexOf(item.checked) === -1) {
                        flag = false;
                    }
                });
            } else {
                // 异步
                this.reviewDataCopy.forEach(item => {
                    if (![ 0, 1, 2, ].indexOf(item.checked) === -1) {
                        flag = false;
                    }
                });
            }
            if (flag) {
                this.activeBtn(e);
                const flowData = this.selectedReviewData || {};
                const res = await this.portService.submitPb(flowData.FlowName, flowData.FlowPSType);
                if (res.code === 200) {
                    this.formSubmitted = true;
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
                this.activeBtn(e);
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
        },
        // 判断用户当前流程是否提交了数据
        async checkCommit () {
            const flowData = this.selectedReviewData || {};
            if ([ 1, 4, ].indexOf(flowData.EvalStatus_Flow) !== -1) {
                let res = await this.portService.checkStageCommit(flowData.FlowName);
                this.formSubmitted = res.data.value;
            }
        },
        // 修改合格/不合格
        async confirmParam (index, { checked, reason, }) {
            if (!this.formEditable) {
                return this.alertCanNotEdit();
            }
            let data = null;
            if (this.$store.state.reviewType === 1) {
                // 同步
                data = this.companyListCopy[index];
            } else {
                // 异步
                data = this.reviewDataCopy[index];
            }
            if (data.checked !== checked) {
                const res = await this.portService.editDx(data.PublicId, checked, reason);
                if (res.code === 200) {
                    data.checked = checked;
                    data.Reason = reason;
                    this.getCurrentReviewData();
                }
            }
        },
        // 点击全部合格 type 1同步 2异步
        async checkAll (e, type) {
            this.activeBtn(e);
            let data = null;
            if (type === 1) {
                // 同步
                data = this.companyListCopy;
            } else {
                // 异步
                data = this.reviewDataCopy;
            }
            for (let item of data) {
                if (item.checked !== 1) {
                    const res = await this.portService.editDx(item.PublicId, 1);
                    if (res.code === 200) {
                        item.checked = 1;
                        item.Reason = '';
                        this.getCurrentReviewData();
                    }
                }
            }
        },
        // 获取数据
        getData () {
            this.getCurrentReviewData();
            this.getParams();
            this.getComps();
            this.checkCommit();
        },
        // 弹出竞争有效性判断窗口
        showCompeteModal () {
            this.judgeVisible = true;
        },
        // 竞争有效性判断提交
        async competeSubmit ({ isContinue, advice, }) {
            const res = await this.portService.editCompete(isContinue, this.selectedReviewData.FlowName, advice);
            if (res.code === 200) {
                this.alert({ content: '提交成功', });
                this.judgeVisible = false;
                this.judgeConfirmed = true;
                this.$store.commit('save', {path: 'competeVisible', data: false, });
            }
            // console.log('compete', res);
        },
        // 获取竞争有效性汇总
        async getCompete () {
            this.resultLoading = true;
            this.resultVisible = true;
            const res = await this.portService.getCompete(this.selectedReviewData.FlowName);
            this.resultLoading = false;
            this.resultTableData = res.data.value;
        },
    },
    mounted () {
        this.getData();
        // this.showCompeteModal();
        if (this.$store.state.competeVisible) {
            this.showCompeteModal();
        }
    },
};
</script>

<style lang="scss" scoped>
    .qb-main {
        width: 100%;
        padding-bottom: 0.28rem;
    }
</style>
