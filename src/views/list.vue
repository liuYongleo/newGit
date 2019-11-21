<template>
    <div class="main">
        <header class="top">交易365限额以下综合交易平台</header>
        <section class="list-content">
            <el-row>
                <el-col class="row-left"
                    :span="10">
                    <ul class="list">
                        <li class="list-item"
                            v-for="(item, index) in projectList"
                            :key="index">
                            <div class="title">
                                <span class="left">{{item.pjCategory}}</span>
                                <span class="right">{{item.zbWay}}</span>
                            </div>
                            <div class="body">
                                <p class="row"><span class="sub-title">标段名称：</span>{{item.BDMC}}</p>
                                <p class="row"><span class="sub-title">标段编号：</span>{{item.BDBH}}</p>
                                <p class="row"><span class="sub-title">项目类型：</span>{{item['项目类型']}}</p>
                                <p class="row"><span class="sub-title">招标类型：</span>{{item['招标类别']}}</p>
                                <p class="row"><span class="sub-title">招标方式：</span>{{item.BidStyle}}</p>
                                <p class="row"><span class="sub-title">评标办法：</span>{{item.EvalMethodName}}</p>
                                <p class="row"><span class="sub-title">是否有清单：</span>{{item['需要清单'] | isHaveList}}</p>
                                <p class="row zb-state"><i class="circle"></i>{{item.BIDSTATUS}}</p>
                                <div class="list-btn-wrap">
                                    <button class="list-btn"
                                        @click="review(item)">立即评审
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </el-col>
                <el-col class="row-right"
                    :span="14">
                    <div class="title">
                        <img class="title-img"
                            src="../../static/img/side-bar/icon-guide.png"
                            alt="">
                        操作指引
                    </div>
                    <div class="content"></div>
                </el-col>
            </el-row>
        </section>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data () {
        return {
            projectList: [],
        };
    },
    filters: {
        isHaveList: function (value) {
            if (value) {
                return '有';
            } else {
                return '无';
            }
        },
    },
    mounted () {
        this.getPwBidProjects();
    },
    methods: {
        // 获取项目列表
        async getPwBidProjects () {
            let res = await this.portService.getPwBidProjects();
            this.projectList = res.data.value;
        },

        // 获取authorization
        async review (project) {
            console.log(project);

            // 立即评审时重置下当前流程和打开菜单项
            this.$store.commit('save', { path: 'reviewStep', data: 1, });
            this.$store.commit('save', { path: 'selectedMenu', data: 0, });
            let res = await this.portService.getoauth2(project.PWGuid, project.BidProjGuid);

            this.$store.commit('save', {
                path: 'authorization',
                data: `Bearer ${res.data.value}`,
            });

            this.$store.commit('save', {
                path: 'project',
                data: project,
            });

            // 初始化评委评审表
            await this.portService.initEvalItem();

            // 获取流程数据
            this.$store.dispatch('getFlowData');
            this.$router.push({ name: 'zb-file', });
        },
    },
};
</script>
<style scoped lang="scss">
    .main {
        height: 100%;
        overflow: auto;
        background-color: #f5f5f5;
    }

    .top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.36rem;
        color: #333;
        background-color: #fff;
        font-size: 0.35rem;
        text-align: center;
        box-shadow: 0 1px 6px rgba(220, 220, 220, 0.5);
        z-index: 1;
    }

    .list-content {
        padding: 0.9rem 0.4rem 0;

        .row-left {
            height: 9.5rem;
            overflow: hidden;

            .list {
                display: flex;
                flex-wrap: wrap;
                align-content: flex-start;
                margin-top: 0.57rem;
                font-size: $fontM;
                color: #333;
                height: 8.83rem;
                overflow-y: auto;

                .list-item {
                    // display: inline-block;
                    width: 3.7rem;
                    background-color: #fff;
                    margin-right: 0.2rem;
                    margin-top: 0.4rem;

                    &:nth-of-type(2n) {
                        margin-right: 0;
                    }

                    &:nth-of-type(1),
                    &:nth-of-type(2) {
                        margin-top: 0;
                    }

                    .title {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #fff;
                        background-color: $colorActive;
                        padding: 0.14rem 0.11rem;

                        .left {
                            font-size: $fontL;
                        }

                        .right {
                            font-size: $fontS;
                        }
                    }

                    .body {
                        padding: 0.26rem 0.15rem 0.15rem;

                        .row {
                            line-height: 0.3rem;
                            margin-top: 0.12rem;

                            &:first-child {
                                margin-top: 0;
                            }
                        }

                        .sub-title {
                            color: #999;
                        }

                        .list-btn-wrap {
                            margin-top: 0.2rem;
                            text-align: center;
                        }

                        .list-btn {
                            @include hollow-btn;
                            height: 0.45rem;

                            &:active {
                                background-color: $colorActive;
                                color: #fff;
                            }
                        }

                        .zb-state {
                            color: #cbcbcb;
                        }

                        .circle {
                            display: inline-block;
                            width: 0.15rem;
                            height: 0.15rem;
                            background-color: #cbcbcb;
                            border-radius: 50%;
                            margin-right: 0.15rem;
                            margin-bottom: 0.01rem;
                        }
                    }
                }
            }
        }

        .row-right {
            padding-left: 0.2rem;

            .title {
                font-size: 0.26rem;
                color: $colorActive;
                margin: 0.18rem 0 0.11rem;

                .title-img {
                    width: 0.32rem;
                    height: 0.27rem;
                    margin-right: 0.12rem;
                    vertical-align: middle;
                }
            }

            .content {
                width: 100%;
                height: 8.83rem;
                background-color: #d4d4d4;
            }
        }
    }
</style>
