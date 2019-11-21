<template>
    <div class="project-manage"
        :class="[$store.state.barPosition]">
        <review-main class="qxx-review-modal"
            :title="'项目管理机构'"
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
                            <span class="introduce-score">{{reviewIndex + 1}}项<span class="introduce-unit">/{{reviewData.length}}项</span></span>
                        </div>
                        <div class="introduce-value text-success">
                            {{reviewData[reviewIndex].param}}
                        </div>
                    </div>
                    <div class="introduce-row">
                        <div class="introduce-title">
                            <p>评审标准</p>
                            <p class="introduce-score">满分10分</p>
                        </div>
                        <div class="introduce-value introduce-standard">
                            {{reviewData[reviewIndex].standard}}
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
                        <button v-show="confirmState !== 2"
                            :class="[reviewIndex === reviewData.length - 1 ? 'hollow-btn' : 'gray-btn']"
                            @click="confirm($event)">
                            提交结果
                        </button>
                    </div>
                    <div>
                        <button class="review-btn"
                            ref="lastBtn"
                            v-show="confirmState === 0"
                            :class="[reviewIndex === 0 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeParam($event, -1)">
                            上一项
                        </button>
                        <button v-show="confirmState === 0"
                            ref="nextBtn"
                            class="hollow-btn"
                            :class="[reviewIndex === reviewData.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeParam($event, 1)">
                            下一项
                        </button>
                        <button v-show="confirmState === 2"
                            class="hollow-btn"
                            @click="nextReview($event)">
                            下一评审环节
                        </button>
                    </div>
                </div>
                <div class="hs-table">
                    <div class="table-content-wrap">
                        <el-row v-for="(item,index) in companyList"
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
                                :offset="1">
                                <review-score class="rpm-input"
                                    :score.sync="item.score"
                                    :reason.sync="item.reason"
                                    title="评分"
                                    :compName="item.name"
                                    placeholder="请输入得分"
                                    @confirm="scoreConfirm"></review-score>
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
                        <span class="comp-name text-overflow">{{companyList[reviewComp].name}}</span>
                        <button class="comp-btn"
                            :class="[reviewComp === companyList.length - 1 ? 'gray-btn' : 'hollow-btn']"
                            @click="changeComp($event, 1)">
                            下一家
                        </button>
                    </div>
                    <div class="content-bottom">
                        <button v-show="confirmState !== 2"
                            :class="[reviewIndex === reviewData.length - 1 ? 'hollow-btn' : 'gray-btn']"
                            @click="confirm($event)">
                            提交结果
                        </button>
                    </div>
                    <div class="async-introduce">
                        <div class="introduce"
                            v-for="(item, index) in reviewData"
                            :key="index">
                            <div class="introduce-row">
                                <div class="introduce-title">
                                    <p>评审因素</p>
                                    <span class="introduce-score">{{index + 1}}项<span class="introduce-unit">/{{reviewData.length}}项</span></span>
                                </div>
                                <div class="introduce-value text-success">
                                    {{item.param}}
                                </div>
                            </div>
                            <div class="introduce-row">
                                <div class="introduce-title">
                                    <p>评审标准</p>
                                    <p class="introduce-score">满分10分</p>
                                </div>
                                <div class="introduce-value">
                                    {{item.standard}}
                                </div>
                            </div>
                            <div class="introduce-row">
                                <div class="introduce-title"></div>
                                <div class="introduce-value">
                                    <review-score class="rpm-input"
                                        :score.sync="item.score"
                                        :reason.sync="item.reason"
                                        modal-title="评分"
                                        placeholder="请输入得分"></review-score>
                                </div>
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
    name: 'project-manage',
    components: {
        reviewMain,
        reviewScore,
    },
    data () {
        return {
            companyList: [
                {
                    name: '寰宇',
                    score: '',
                    reason: '',
                },
                {
                    name: '北京筑龙信息信息信息信息技术有限责任有限公司',
                    score: '',
                    reason: '',
                },
                {
                    name: '上海筑龙信息信息信息信息技术有限责任有限公司',
                    score: '',
                    reason: '',
                },
                {
                    name: '重庆筑龙公司',
                    score: '',
                    reason: '',
                },
                {
                    name: '澳门筑龙信息技术有限责任有限公司',
                    score: '',
                    reason: '',
                },
                {
                    name: '深圳筑龙',
                    score: '',
                    reason: '',
                },
            ],
            reviewData: [
                {
                    param: '评审因素1',
                    standard:
                        '内容编制全面,有针对性,措施完善得5-6分良得3-4分；措施一般1-2分;考虑全面,有针对性,措施完善得5-6分;良得3-4分;措施一般1-2分;',
                    checked: 1,
                },
                {
                    param: '评审因素2',
                    standard:
                        '内容编制全面,有针对性,措施完善得5-6分良得3-4分；措施一般1-2分;考虑全面,有针对性,措施完善得5-6分;良得3-4分;措施一般1-2分;',
                    checked: 1,
                },
                {
                    param: '评审因素3',
                    standard:
                        '内容编制全面,有针对性,措施完善得5-6分良得3-4分；措施一般1-2分;考虑全面,有针对性,措施完善得5-6分;良得3-4分;措施一般1-2分;',
                    checked: 1,
                },
                {
                    param: '评审因素3',
                    standard:
                        '内容编制全面,有针对性,措施完善得5-6分良得3-4分；措施一般1-2分;考虑全面,有针对性,措施完善得5-6分;良得3-4分;措施一般1-2分;',
                    checked: 1,
                },
            ],
            reviewIndex: 0, // 评审因素index
            reviewComp: 0, // 评审企业index
            confirmState: 0, // 提交状态 0-未提交 1-提交中 2-已提交
        };
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
        // 评审因素 合格/不合格 state:1(合格) 0(不合格)
        reviewParam (item, state) {
            item.checked = state;
        },
        // 提交结果
        confirm (e) {
            if (this.reviewIndex !== this.reviewData.length - 1) return;
            this.activeBtn(e);
            this.confirmState = 2;
        },
        // 下一评审环节
        nextReview (e) {
            this.activeBtn(e);
        },
        // 因素区域右滑，上一项
        factorSwipeRight () {
            this.changeParam(null, -1);
        },
        // 因素区域左滑，下一项
        factorSwipeLeft () {
            this.changeParam(null, 1);
        },
        scoreConfirm ({ score, reason, }) {
            console.log(score, reason);
        },
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
