<template>
    <div>
        <h3>
            <ul class="step-nav">
                <li v-for="item in stepList" :key="item.index" class="step-item" @click="activeStep = item.index"
                    :class="{'active' : activeStep >= item.index}">
                    <div class="item-inner-wrap">
                        <span>{{item.index}}</span>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </ul>
        </h3>
        <div class="main">
            <div v-if="activeStep === 1">
                <!--评标概况-->
                <div class="report-form-wrap">
                    <h4>评标概况</h4>
                    <div class="report-form">
                        <div class="form-item">
                            <label class="form-item-label">工程名称：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">招标范围：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">评标时间：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">评标地点：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">评标标准和方法：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <!--评标委员会组成-->
                <div class="report-form-wrap">
                    <h4>评标概况</h4>
                    <div class="report-sub-tittle">
                        <h5>
                            评委一
                        </h5>
                        <div class="dotted-line-x"></div>
                    </div>
                    <div class="report-form">
                        <div class="form-item">
                            <label class="form-item-label">姓名：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">工作单位：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">专业：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">承担工作：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="report-sub-tittle">
                        <h5>
                            评委二
                        </h5>
                        <div class="dotted-line-x"></div>
                    </div>
                    <div class="report-form">
                        <div class="form-item">
                            <label class="form-item-label">姓名：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">工作单位：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">专业：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-item-label">承担工作：</label>
                            <div class="form-item-content">
                                <el-input class="default" v-model="baz"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <!--投标人及重大情况-->
                <div class="report-form-wrap">
                    <h4>投标人及重大情况</h4>

                    <self-table class="params-table"
                                :data="tbrTable"
                                :highlightCurrentRow="true"
                                :rowHeight="0.5"
                                :maxRow="4"
                    >
                        <el-table-column
                            label="序号"
                            :width="$store.state.indexCellWidth">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="投标人名称"
                            prop="name">
                        </el-table-column>
                        <el-table-column
                            label="综合评分热门"
                            prop="score">
                        </el-table-column>
                    </self-table>


                </div>
            </div>
            <div v-if="activeStep === 2">
                2
            </div>
            <div v-if="activeStep === 3">
                3
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pb-report',
    data () {
        return {
            baz: 'asdsa',
            activeStep: 1, // 1: 选择否决单位; 2: 响应否决投标; 3: 查看否决结果;
            stepList: [
                {
                    text: '编辑报告封面',
                    index: 1,
                },
                {
                    text: '生成报表',
                    index: 2,
                },
                {
                    text: '查看评标报告',
                    index: 3,
                },
            ],
            tbrTableLoading: true,
            tbrTable: [
                {
                    name: '筑龙测试机构xffa1',
                    score: 99,
                    rank: 1,
                },
                {
                    name: '筑龙测试机构xffa1',
                    score: 89,
                    rank: 2,
                },
            ],
            zbrTab: [
                {
                    name: '小青蛙集团',
                    price: 8000454.22,
                },
                {
                    name: '小青蛙集团',
                    price: 8000454.22,
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
    .main {
        margin-left: auto;
        margin-right: auto;
        width: 9.6rem;

        .report-form-wrap {
            h4 {
                margin: 0.3rem 0;
                padding-left: 10px;
                font-size: 0.26rem;
                border-left: solid 4px $green;
            }

            .report-sub-tittle {
                h5 {
                    display: block;
                    margin: 0.2rem 0;
                    padding-left: 14px;
                    color: #999;
                    font-size: $fontM;
                }

                .dotted-line-x {
                    background-size: 6px 1px;
                }
            }

            .report-form {
                .form-item {
                    display: flex;
                    margin: 0.3rem 0;
                    align-items: center;

                    .form-item-label {
                        width: 2rem;
                        text-align: right;
                    }

                    .form-item-content {
                        flex-grow: 1;

                        /deep/ .el-input {
                            width: 100%;
                        }
                    }
                }
            }
        }


    }
</style>
