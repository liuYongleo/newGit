<template>
    <div>
        <h3>
            发起否决投标
        </h3>
        <div class="content-box">
            <ul class="step-nav">
                <li v-for="item in stepList" :key="item.index" class="step-item" @click="activeStep = item.index"
                    :class="{'active' : activeStep >= item.index}">
                    <div class="item-inner-wrap">
                        <span>{{item.index}}</span>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="activeStep === 1" class="content-box">
            <self-table
                :data="voteTable"
                border>
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ENTPRSCODE"
                    label="投标单位编号">
                </el-table-column>
                <el-table-column
                    prop="ENTPRSNAME"
                    label="投标单位">
                </el-table-column>
                <el-table-column
                    label="选择否决单位">
                    <template slot-scope="scope">
                        <button @click="voteBtnClick(scope.row)" class="hollow-btn"
                                :class="{'active' : scope.row.voted}">
                            否决
                        </button>
                    </template>
                </el-table-column>
            </self-table>
        </div>

        <div v-if="activeStep === 2" class="initiate-form">
            <div class="form-item">
                <label class="form-item-label">投标单位编号:</label>
                <div class="form-item-content">{{voteForm.ENTPRSCODE}}</div>
            </div>

            <div class="form-item">
                <label class="form-item-label">投标单位名称:</label>
                <div class="form-item-content">{{voteForm.ENTPRSNAME}}</div>
            </div>

            <div class="form-item">
                <label class="form-item-label">流程阶段:</label>
                <div class="form-item-content">
                    {{$store.state.currentFlow.FlowName}}
                </div>
            </div>

            <div class="form-item">
                <label class="form-item-label">否决投标原因:</label>
                <div class="form-item-content line-height_0 ">
                    <div>
                        <self-textarea :value.sync="voteForm.reasonText" modal-title="否决投标原因">
                        </self-textarea>
                    </div>
                </div>
            </div>

            <div class="submit-button-wrap">
                <button @click="postVote" class="hollow-btn">发起否决投标</button>
            </div>

        </div>

    </div>
</template>

<script>
import textArea from '@/components/project-components/self-textarea/self-textarea';

export default {
    name: 'initiate-veto',
    component: {
        textArea,
    },
    data () {
        return {
            activeStep: 1,
            stepList: [
                {
                    text: '选择否决单位',
                    index: 1,
                },
                {
                    text: '发起否决投标',
                    index: 2,
                },
            ],
            voteTable: [],
            voteForm: {
                ENTPRSCODE: '',
                ENTPRSNAME: '',
                reasonText: ``,
            },

        };
    },
    computed: {
        // 清标开始到价格评审完成之前这个阶段才能发起否决
        editable () {
            return 123;
        },

    },
    created () {
        // 获取单位列表
        this.getTbComp();
        // 获取否决单位数据
        this.getVoteList();
    },
    methods: {

        // 获取单位列表
        async getTbComp () {
            await this.$store.dispatch('getFlowData');
            let res = await this.portService.getInitiateVoteList(this.$store.state.currentFlow.FlowName);

            this.voteTable = res.data.value.map(item => {
                item.voted = item['Is_发起否决投标'];
                return item;
            });

            console.log('awsl', res);
            //
            // let [ tbrRes, voteRes, ] = [
            //     await this.portService.getTbComp(this.$store.state.currentFlow.FlowName),
            //     await this.portService.getVoteList(),
            // ];
            // console.log(tbrRes);
            // console.log(voteRes);
            // let tbrList = tbrRes.data.value;
            // let voteList = voteRes.data.value;
            // // console.log(tbrList);
            // this.voteTable = tbrList.map(item => {
            //     return {
            //         ...item,
            //         voted: (() => {
            //             return voteList.some(voteItem => {
            //                 return item.ENTPRSCODE === voteItem.EntprsCode && this.$store.state.currentFlow.FlowName === voteItem.FlowName;
            //             });
            //         })(),
            //     };
            // });


            // console.log(this.voteTable);
        },

        // 获取否决单位数据
        async getVoteList () {
            // let res = ;

            // console.log(res);
        },

        // @callback 点击否决按钮
        voteBtnClick (tbr) {
            if (tbr.voted) {
                this.alert({
                    content: '该单位否决投标已发起!',
                });
            } else {
                this.activeStep = 2;
                this.voteForm = {
                    ...tbr,
                };
                this.$set(this.voteForm, 'reasonText', '');
            }
        },

        // @callback 发起否决投标
        async postVote () {
            let res = await this.portService.postVote(this.voteForm.BIDFILEID, this.$store.state.currentFlow.FlowId, this.voteForm.reasonText);
        },

    },
};
</script>

<style scoped lang="scss">
    .initiate-form {
        margin: 0.5rem auto;
        width: 9.6rem;
        /*padding: 0.3rem 0.28rem;*/
        /*background-color: #f6f6f6;*/

        .form-item {
            display: flex;
            align-items: flex-start;
            padding-bottom: 0.26rem;
            font-size: 0.26rem;

            .form-item-label {
                width: 1.9rem;
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

                /deep/ .select-field {
                    background-color: #f6f6f6;
                }

                /deep/ .el-textarea {
                    background-color: #f6f6f6;
                }
            }
        }

        .submit-button-wrap {
            padding-top: 0.1rem;
            text-align: center;
        }
    }

</style>
