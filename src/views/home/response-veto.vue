<template>
    <div>
        <h3>
            响应投标否决
        </h3>
        <div class="content-box">
            <ul class="step-nav">
                <li v-for="item in stepList" :key="item.index" class="step-item" @click="stepChange(item.index)"
                    :class="{'active' : activeStep >= item.index}">
                    <div class="item-inner-wrap">
                        <span>{{item.index}}</span>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="content-box" v-if="activeStep === 1">
            <self-table
                :data="chooseUnitTable">
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="PWName"
                    label="发起评委">
                </el-table-column>
                <el-table-column
                    prop="FlowName"
                    label="流程阶段">
                </el-table-column>
                <el-table-column
                    prop="EntprsName"
                    label="投标单位">
                </el-table-column>
                <el-table-column
                    label="选择否决单位">
                    <template slot-scope="scope">
                        <button @click="chooseBtnClick(scope.row)" class="hollow-btn">
                            选择
                        </button>
                    </template>
                </el-table-column>
            </self-table>
        </div>
        <div class="content-box" v-if="activeStep === 2">
            <div class="response-form">
                <div class="form-item">
                    <label class="form-item-label">
                        流程阶段:
                    </label>
                    <div class="form-item-content">
                        {{responseForm.FlowName}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        投标单位编号:
                    </label>
                    <div class="form-item-content">
                        {{responseForm.EntprsCode}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        投标单位名称:
                    </label>
                    <div class="form-item-content">
                        {{responseForm.EntprsName}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        发起评委编号:
                    </label>
                    <div class="form-item-content">
                        {{responseForm.PWId}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        发起评委姓名:
                    </label>
                    <div class="form-item-content">
                        {{responseForm.PWName}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        发起评委否决投标原因:
                    </label>
                    <div class="form-item-content">
                        {{responseForm['发起评委不合格原因']}}
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        当前专家否决投标:
                    </label>
                    <div class="form-item-content">
                        <el-radio v-model="responseForm.vote"
                                  :label="1">同意
                        </el-radio>
                        <el-radio v-model="responseForm.vote"
                                  :label="0">不同意废标
                        </el-radio>
                    </div>
                </div>

                <div class="form-item">
                    <label class="form-item-label">
                        当前专家不同意废标原因:
                    </label>
                    <div class="form-item-content textarea-content">
                        <self-textarea :value.sync="responseForm.reasonText" modal-title="评分"
                                       :placeholder="reasonPlaceholder">
                        </self-textarea>
                    </div>
                </div>
                <div class="submit-btn-wrap">
                    <button @click="postResponse" class="hollow-btn">保存并提交结果</button>
                </div>


            </div>
        </div>
        <div class="content-box" v-if="activeStep === 3">
            <self-table
                :data="resultTable">
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="PWName"
                    label="发起评委">
                </el-table-column>
                <el-table-column
                    prop="FlowName"
                    label="流程阶段">
                </el-table-column>
                <el-table-column
                    prop="EntprsName"
                    label="投标单位"
                    min-width="200">
                </el-table-column>

                <el-table-column
                    label="是否产生结论">
                    <span slot-scope="scope"
                          :class="{'green-color': scope.row['Is产生结论'],'red-color': !scope.row['Is产生结论']}">
                        {{scope.row['Is产生结论']?'是':'否'}}
                    </span>
                </el-table-column>

                <el-table-column
                    label="否决投标结论">
                    <template slot-scope="scope">
                        {{scope.row['结论']|empty}}
                    </template>
                </el-table-column>
            </self-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'response-veto',
    data () {
        return {
            activeStep: 1, // 1: 选择否决单位; 2: 响应否决投标; 3: 查看否决结果;
            stepList: [
                {
                    text: '选择否决单位',
                    index: 1,
                },
                {
                    text: '响应否决投标',
                    index: 2,
                },
                {
                    text: '查看否决结果',
                    index: 3,
                },
            ],
            // 选择否决单位table
            chooseUnitTable: [],

            // 当前选中编辑的投标人
            currResponseTbr: {},
            // 当前选中编辑的投标人的响应否决的表单
            responseForm: {
                reasonText: '',
                vote: '',
            },

            // 查看否决结果table
            resultTable: [],
        };
    },
    computed: {
        reasonPlaceholder () {
            if (this.responseForm.vote === 1) {
                return '请输入同意废标原因';
            } else if (this.responseForm.vote === 0) {
                return '请输入不同意废标原因';
            } else {
                return '请输入原因';
            }
        },
    },
    created () {
        this.getVoteList();
    },
    methods: {
        // 获取否决单位列表
        async getVoteList () {
            await this.$store.dispatch('getFlowData');
            let res = await this.portService.getVoteList();
            // console.log('xyliebiuai', res);
            this.chooseUnitTable = res.data.value.filter(item => item.FlowName === this.$store.state.currentFlow.FlowName);
            // console.log(this.chooseUnitTable);
        },

        // @callback 选择否决单位
        chooseBtnClick (tbr) {
            if (tbr['发起评委Id'] === this.$store.state.project.PWId) {
                return this.alert({content: '不可响应自己发起的投标否决', });
            }
            this.currResponseTbr = tbr;
            this.stepChange(2);
        },

        // @callback 发起否决响应
        async postResponse () {
            let res = await this.portService.responseVote(this.responseForm.Id, this.responseForm.reasonText, this.responseForm.vote);
            console.log('responseForm', res);
            if (res.data.value.Result) {
                return this.alert({content: '响应否决投标成功！', });
            }
        },

        async stepChange (tabIndex) {
            this.activeStep = tabIndex;
            if (this.activeStep === 2) {
                let pwVoteRes = await this.portService.getPwVote(this.currResponseTbr.BidFileId);
                let pwVoteData = pwVoteRes.data.value[0] || {};
                this.responseForm = {
                    ...pwVoteData,
                    vote: (pwVoteData.Is_BadBid != null && pwVoteData.Is_BadBid !== '') ? pwVoteData.Is_BadBid : -1,
                    reasonText: (pwVoteData['不合格原因'] != null && pwVoteData['不合格原因'] !== '') ? pwVoteData['不合格原因'] : '',
                };
            }
            if (this.activeStep === 3) {
                this.activeStep = tabIndex;
                let res = await this.portService.getVoteResponse();
                this.resultTable = res.data.value;
                console.log('fffs', this.resultTable);
            }
        },

    },
};
</script>

<style scoped lang="scss">
    .response-form {
        margin: 0 auto;
        width: 9.6rem;
        padding-top: 0.3rem;

        .form-item {
            display: flex;
            align-items: flex-start;
            padding-bottom: 0.12rem;

            .form-item-label {
                width: 2.53rem;
                padding-right: 0.33rem;
                font-size: $fontL;
                line-height: 0.44rem;
                text-align: right;
                letter-spacing: 0.07em;
                color: #666;
            }

            .form-item-content {
                flex-grow: 1;
                font-size: $fontL;
                line-height: 0.44rem;
                vertical-align: top;
                letter-spacing: 0.07em;
                color: #999;

                &.textarea-content {
                    color: #666;
                }
            }
        }

        .submit-btn-wrap {
            padding-top: 0.3rem;
            padding-bottom: 1rem;
            text-align: center;
        }
    }
</style>
