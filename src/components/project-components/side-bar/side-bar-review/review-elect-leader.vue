<template>
    <div class="elect-leader"
         :class="[$store.state.barPosition]">
        <review-main :title="'推选组长'"
                     v-bind="$attrs"
                     v-on="$listeners">
            <template slot="content">
                <!--推选组长table-->
                <div class="hc-table elect-table">
                    <div class="table-header-wrap">
                        <el-row class="table-header">
                            <el-col :span="4">
                                <div>序号</div>
                            </el-col>
                            <el-col :span="6">
                                <div>评委姓名</div>
                            </el-col>
                            <el-col :span="8">
                                <div>评委编号</div>
                            </el-col>
                            <el-col :span="6">
                                <div>推选组长</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="table-content-wrap">
                        <el-row class="content-row"
                                v-for="(item,index) in judgeList"
                                :key="index">
                            <!--                                <span @click="voteLeader(item)">wwwwwe</span>-->
                            <el-col :span="4">
                                <div>{{index + 1}}</div>
                            </el-col>
                            <el-col :span="6">
                                <div>{{item.PWName}}</div>
                            </el-col>
                            <el-col :span="8">
                                <div>{{item.PWCode}}</div>
                            </el-col>
                            <el-col :span="6">
                                <span class="elect-btn"
                                      @click="voteLeader(item)"
                                      :class="{'active': item.elected}">
                                    <i></i>
                                    <span class="text">推荐</span>
                                </span>
                            </el-col>
                        </el-row>
                    </div>

                </div>

                <!--组长推选结果-->
                <div class="elect-result">
                    <h6>组长推选结果</h6>
                    <div class="leader-box" v-if="$store.state.leaderId">
                        <div class="leader-avatar"></div>
                        <div class="leader-info">
                            <p>{{leader.PWName}}</p>
                            <div class="info">
                                <span>组长</span>
                                <span>{{leader.PWCode}}</span>
                            </div>
                        </div>
                        <div class="badge"></div>
                    </div>
                    <div v-else>
                        评选组长中...
                    </div>
                </div>
            </template>
        </review-main>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';

export default {
    name: 'elect-leader',
    components: {
        reviewMain,
    },
    props: {
        stepIndex: {
            type: Number,
            require: true,
        },
    },
    data () {
        return {
            leaderId: '',
            judgeList: [],
        };
    },
    created () {
        this.getJudgeList();
        // this.getVoteLeaderStatus();
    },
    computed: {
        voteDisabled () {
            return this.$store.state.leaderId || this.judgeList.some(item => item.elected);
        },
        leader () {
            let leader = {};
            this.judgeList.forEach(judge => {
                if (judge.ID == this.$store.state.leaderId) {
                    leader = judge;
                }
            });
            return leader;
        },
    },
    mounted () {

    },
    methods: {
        // 获取专家列表
        async getJudgeList () {
            let res = await this.portService.getTeamLeader();
            let data = res.data.value;
            this.judgeList = data;
            this.judgeList.forEach(item => {
                item.elected = !!item.Is_TeamLeader;
            });
        },

        // 选举投票组长
        async voteLeader (item) {
            if (this.voteDisabled) {
                return false;
            }
            let res = await this.portService.saveVoteLeader(item.ID);
            if (res.code === 200) {
                this.judgeList = this.judgeList.map(judge => {
                    judge.elected = judge.ID === item.ID;
                    return judge;
                });
            }
        },

    },
};
</script>

<style scoped lang="scss">
    .elect-leader {
        width: 100%;
        padding-bottom: 0.32rem;
    }

    .elect-table {
        .table-content-wrap {
            max-height: 3.18rem;
            overflow: auto;
        }
    }

    .elect-btn {
        display: inline-block;
        height: 0.4rem;
        line-height: 0.35rem;
        width: 1.04rem;
        text-align: center;
        color: $green;
        border: solid 1px $green;
        border-radius: 0.2rem;

        i {
            display: inline-block;
            margin-right: 0.07rem;
            width: 0.22rem;
            height: 0.21rem;
            vertical-align: middle;
            background-image: url('../../../../../static/img/side-bar/zici-icon.png');
            background-size: 0.22rem 0.21rem;
        }

        span {
            vertical-align: middle;
        }

        &.active {
            background-color: $green;
            color: #f7f7f7;
            border: solid 1px transparent;

            i {
                background-image: url('../../../../../static/img/side-bar/zici-icon-active.png');
            }
        }
    }

    .elect-result {
        & > h6 {
            padding: 0.2rem 0;
            font-size: 0.26rem;
            color: #666;
        }

        .leader-box {
            display: flex;
            align-items: center;
            height: 1.25rem;
            padding-left: 0.24rem;
            border-bottom: solid #f2f2f2 1px;
            background-color: #f7f7f7;

            .leader-avatar {
                width: 0.9rem;
                height: 0.9rem;
                background: url('../../../../../static/img/side-bar/leader-avatar.png') no-repeat;
                background-size: 0.9rem 0.9rem;
            }

            .leader-info {
                flex-grow: 1;
                padding-left: 0.22rem;

                & > p {
                    font-size: $fontXL;
                    padding-bottom: 0.15rem;
                }

                .info {
                    span {
                        display: inline-block;
                        padding: 0.04rem 0.14rem;
                        min-width: 0.7rem;
                        color: #ffa200;
                        background-color: #ededed;
                        border-radius: 0.15rem;

                        & + span {
                            margin-left: 0.1rem;
                        }
                    }
                }
            }

            .badge {
                align-self: flex-start;
                width: 0.59rem;
                height: 0.56rem;
                background: url('../../../../../static/img/side-bar/leader-badge.png') no-repeat;
                background-size: 0.59rem 0.56rem;
            }
        }
    }
</style>
