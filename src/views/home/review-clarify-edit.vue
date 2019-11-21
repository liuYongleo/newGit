<template>
    <div class="review-clarify">
        <h3>
            编辑评标澄清问题
        </h3>
        <div class="content-box part-wrap">
            <div class="left-part">
                <div class="search-tool">
                    <div class="filed-item">
                        <label>
                            组织机构代码
                        </label>
                        <div class="filed-item-content">
                            <el-input class="default" v-model="searchParams.organizationCode"></el-input>
                        </div>
                    </div>
                    <div class="filed-item">
                        <label>
                            单位名称
                        </label>
                        <div class="filed-item-content">
                            <el-input class="default" v-model="searchParams.unitName"></el-input>
                        </div>
                    </div>
                    <button class="search-btn" @click="search">查询</button>
                </div>
                <div class="part-content" style="margin-bottom: 0">
                    <self-table :data="organizationTableOrgin" :maxRow="9" highlightCurrentRow
                            @rowClick="rowClick" :loading="leftTableLoading">
                        <el-table-column
                            label="序号"
                            :width="$store.state.indexCellWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="ENTPRSCODE"
                            label="组织机构代码">
                        </el-table-column>
                        <el-table-column
                            prop="ENTPRSNAME"
                            label="投标单位">
                        </el-table-column>
                    </self-table>
                </div>
            </div>
            <div class="right-part">
                <div class="clarify-edit-form">
                    <el-row>
                        <el-col :span="12">
                            <div class="form-item">
                                <label class="form-item-label">流程阶段</label>
                                <div class="form-item-content">
                                    <!-- <self-select v-model="editForm.unitName"
                                                 :options="editForm.unitSelectorOption"></self-select> -->
                                    <p class="flow-name">{{currentFlowName || '-'}}</p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="form-item">
                                <label class="form-item-label">时间限定</label>
                                <div class="form-item-content">
                                    <el-input class="default small-input text-success" type="number"
                                              v-model="editForm.time"></el-input>
                                    <span class="default-font-color">分钟</span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="form-item">
                        <label class="form-item-label">澄清问题</label>
                        <div class="form-item-content line-height_0 ">
                            <div @click="textareaClick(0)">
                                <self-textarea :value.sync="editForm.clarifyText" modal-title="澄清问题">
                                </self-textarea>
                            </div>
                        </div>
                    </div>
                    <div class="submit-btn-wrap">
                        <button class="hollow-btn submit-btn" @click="addProblem">发出评标澄清问题</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'review-clarify-view',
    data () {
        return {
            textareaModal: true,
            textareaText: '',
            searchParams: {
                organizationCode: '',
                unitName: '',
            },

            // 组织机构table
            organizationTableOrgin: [],
            organizationTable: [],

            editForm: {
                clarifyText: '',
                time: 15,
            },
            selectedComp: {}, // 选中单位
            leftTableLoading: false,
        };
    },
    computed: {
        // 当前正在进行中的评审流程
        currentFlowName () {
            const flowList = this.$store.state.flowData || [];
            for (let item of flowList) {
                if ([ 'leader', 'pbbg', 'pbjs', ].indexOf(item.FlowId) === -1) {
                    if (item.EvalStatus_Flow === 4) {
                        // 正在进行中的评审环节
                        return item.FlowName;
                    }
                }
            }
            return false;
        },
    },
    methods: {
        search () {
            this.leftTableLoading = true;
            this.organizationTableOrgin = this.organizationTable.filter(item => {
                if (this.searchParams.unitName && this.searchParams.organizationCode) {
                    if (item.ENTPRSNAME.indexOf(this.searchParams.unitName) !== -1 && item.ENTPRSCODE.indexOf(this.searchParams.organizationCode) !== -1) {
                        return true;
                    }
                } else if (this.searchParams.unitName) {
                    if (item.ENTPRSNAME.indexOf(this.searchParams.unitName) !== -1) {
                        return true;
                    }
                } else if (this.searchParams.organizationCode) {
                    if (item.ENTPRSCODE.indexOf(this.searchParams.organizationCode) !== -1) {
                        return true;
                    }
                } else {
                    return true;
                }
            });
            if (this.organizationTableOrgin[0]) {
                this.selectedComp = this.organizationTableOrgin[0] || {};
                // this.getCqProblemList();
            }
            this.leftTableLoading = false;
        },
        textareaClick (num) {
            this.test += num;
        },
        async getCompList () {
            this.leftTableLoading = true;
            const flowData = this.$store.state.currentFlow || {};
            if (flowData.FlowName) {
                const res = await this.portService.getTbComp(flowData.FlowName);
                // console.log('投标单位', res.data.value);
                this.organizationTableOrgin = res.data.value;
                this.organizationTable = res.data.value;
                this.selectedComp = this.organizationTableOrgin[0] || {};
                // this.getCqProblemList();
            }
            this.leftTableLoading = false;
        },
        async addCqProblem () {
            const res = await this.portService.addCqProblem(this.selectedComp.ENTPRSCODE, this.editForm.clarifyText, this.editForm.time);
            this.alert({content: res.data.value || '发起成功！', });
        },
        addProblem () {
            if (!this.currentFlowName) {
                return this.alert({content: '评审已结束，不能发出评标澄清问题', });
            }
            if (this.editForm.time === '') {
                return this.alert({content: '请输入时间限定！', });
            }
            if (this.editForm.time <= 0 || !/^[0-9]+$/.test(this.editForm.time)) {
                return this.alert({content: '请输入大于0的正整数', });
            }
            if (this.editForm.clarifyText.trim() === '') {
                return this.alert({content: '请输入澄清问题！', });
            }
            this.addCqProblem();
        },
        async getCqProblemList () {
            const res = await this.portService.getCqProblemList(this.selectedComp.ENTPRSCODE);
            console.log('list', res.data.value);
        },
        rowClick (row) {
            if (this.selectedComp.ENTPRSCODE !== row.ENTPRSCODE) {
                this.selectedComp = row;
                // this.getCqProblemList();
            }
        },
    },
    mounted () {
        this.getCompList();
        this.$store.dispatch('getFlowData');
    },
};
</script>

<style scoped lang="scss">
    .clarify-edit-form {
        padding: 0.2rem 0;
        background-color: #f6f6f6;

        .form-item {
            display: flex;
            align-items: flex-start;
            padding-bottom: 0.26rem;
            font-size: 0.26rem;

            .form-item-label {
                width: 1.2rem;
                padding-right: 0.15rem;
                line-height: 0.52rem;
                text-align: right;
                color: #333;
                vertical-align: top;
            }

            .form-item-content {
                flex-grow: 1;
                line-height: 0.52rem;
                color: #666;
                vertical-align: top;

                .flow-name {
                    padding: 0 .15rem;
                    border: 1px solid #c0c0c0;
                    margin-right: .2rem;
                }
            }
        }

        .submit-btn-wrap {
            display: flex;
            justify-content: center;
            margin-top: 0.2rem;

            .submit-btn:active {
                @include btn-active;
            }
        }

        /deep/ .text-success .el-input__inner {
            color: $colorActive;
        }
    }
</style>
