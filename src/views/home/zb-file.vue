<template>
    <!-- 招标清单 -->
    <div class="ztb-list-main">
        <company-select theme="light" position="top"></company-select>
        <aside class="ztb-list-nav">
            <el-tree :data="treeData"
                     :highlight-current="true"
                     :render-content="renderTreeContent"></el-tree>
        </aside>
        <section class="ztb-list-con"
                 :class="['side-bar-' + $store.state.selectedMenu]">
            <nav class="ztb-nav">
                <ul class="ztb-nav-list">
                    <li class="ztb-nav-item"
                        v-for="item in navData"
                        :key="item.id"
                        @click="selectNav(item)">
                        <p class="ztb-nav-title"
                           :class="{'active': selectedNav === item.id}">{{item.name}}</p>
                        <i class="active-icon"></i>
                    </li>
                </ul>
            </nav>
<!--            <nav class="ztb-nav-sec">-->
<!--                <ul class="ztb-nav-sec-list">-->
<!--                    <li class="ztb-nav-sec-item"-->
<!--                        :class="{'active': selectedNavSec === item.id}"-->
<!--                        v-for="item in navSecData"-->
<!--                        :key="item.id"-->
<!--                        @click="selectNavSec(item)">{{item.name}}-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </nav>-->
            <section class="table-wrap">
                <self-table class="ztb-table"
                            :data="tableData"
                            :maxRow="15"
                            :rowHeight="0.48">
                    <el-table-column prop="index"
                                     label="序号"
                                     min-width="6%"></el-table-column>
                    <el-table-column prop="name"
                                     label="名称"
                                     min-width="47%"></el-table-column>
                    <el-table-column prop="cont"
                                     label="内容"
                                     min-width="47%"></el-table-column>
                </self-table>
            </section>
        </section>
        <hello-modal></hello-modal>
    </div>
</template>

<script>
import companySelect from '@/components/project-components/company-select/company-select';
import helloModal from '@/components/project-components/hello-modal/hello-modal';

export default {
    name: 'tbList',
    data () {
        return {
            treeData: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1',
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
            ],
            navData: [
                {
                    id: 1,
                    name: '工程信息',
                },
                {
                    id: 2,
                    name: '填表须知',
                },
                {
                    id: 3,
                    name: '总说明',
                },
                {
                    id: 4,
                    name: '需评审的材料及设备汇总',
                },
                {
                    id: 5,
                    name: '造价汇总',
                },
                {
                    id: 6,
                    name: '投标文件编制附件',
                },
                {
                    id: 7,
                    name: '投标函',
                },
            ],
            // navSecData: [
            //     {
            //         id: 1,
            //         name: '暂列金额',
            //     },
            //     {
            //         id: 2,
            //         name: '材料（工程设备）暂估价',
            //     },
            //     {
            //         id: 3,
            //         name: '专业工程暂估价',
            //     },
            //     {
            //         id: 4,
            //         name: '计日工',
            //     },
            //     {
            //         id: 5,
            //         name: '总承包服务费',
            //     },
            //     {
            //         id: 6,
            //         name: '其他',
            //     },
            // ],
            tableData: [
                {
                    index: 1,
                    name: '招标编号',
                    cont: '',
                },
                {
                    index: 2,
                    name: '标段',
                    cont: '一标段',
                },
                {
                    index: 3,
                    name: '项目名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
                {
                    index: 4,
                    name: '工程名称',
                    cont: '测试',
                },
            ],
            selectedNav: 1,
            selectedNavSec: 1,
        };
    },
    methods: {
        selectNav (item) {
            if (this.selectedNav !== item.id) this.selectedNav = item.id;
        },
        selectNavSec (item) {
            if (this.selectedNavSec !== item.id) this.selectedNavSec = item.id;
        },
        renderTreeContent (h, {node, data, store, }) {
            // console.log(node);
            if (node.isLeaf) {
                return (
                    <span class="custom-tree-node">
                        <img class="node-img" src="../../../static/img/tree/tree-3.png"/>
                        <span class="node-text">{node.label}</span>
                    </span>
                );
            } else {
                if (node.expanded) {
                    return (
                        <span class="custom-tree-node">
                            <img class="node-img" src="../../../static/img/tree/tree-2.png"/>
                            <span class="node-text">{node.label}</span>
                        </span>
                    );
                } else {
                    return (
                        <span class="custom-tree-node">
                            <img class="node-img" src="../../../static/img/tree/tree-1.png"/>
                            <span class="node-text">{node.label}</span>
                        </span>
                    );
                }
            }
        },
    },
    components: {
        companySelect,
        helloModal,
    },
    computed: {
        // maxRow () {
        //     if (this.$store.state.selectedMenu === 2 || this.$store.state.selectedMenu === 3) {
        //         // 打开菜单
        //         return 16;
        //     } else {
        //         return 17;
        //     }
        // },
    },
};
</script>

<style lang="scss" scoped>
    $asideWidth: 3rem;
    .ztb-list-main {
        display: flex;
        padding-top: $companySelectHeight;
        background-color: #f2f5fa;
        // 左侧树
        .ztb-list-nav {
            width: $asideWidth;
            background-color: #ebf7f4;
        }

        // 右侧内容
        .ztb-list-con {
            padding-top: 0.2rem;

            // 一级菜单
            .ztb-nav {
                margin: 0 0.3rem 0.22rem;
                color: #333;
                font-size: $fontM;

                .ztb-nav-list {
                    width: auto;
                    overflow-x: scroll;
                    overflow-y: hidden;
                    white-space: nowrap;

                    .ztb-nav-item {
                        display: inline-block;

                        .ztb-nav-title {
                            margin-right: 0.1rem;
                            background-color: #f1f1f1;
                            padding: 0.14rem 0.2rem;

                            &.active {
                                background-color: $colorActive;
                                color: #fff;
                            }

                            &.active + .active-icon {
                                position: relative;
                                display: block;
                                height: 0.08rem;

                                &::after {
                                    content: '';
                                    position: absolute;
                                    top: 0;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    width: 0;
                                    height: 0;
                                    border: 0.07rem solid;
                                    border-color: $colorActive transparent transparent transparent;
                                }
                            }
                        }
                    }
                }
            }

            // 二级菜单
            .ztb-nav-sec {
                margin: 0 0.47rem 0.26rem;
                color: #666;
                font-size: 0.2rem;

                .ztb-nav-sec-list {
                    width: auto;
                    overflow-x: auto;
                    white-space: nowrap;

                    .ztb-nav-sec-item {
                        display: inline-block;
                        margin-right: 0.42rem;

                        &.active {
                            color: $colorActive;
                        }
                    }
                }
            }

            // 表格
            .table-wrap {
                margin: 0 0.2rem 0;

                .ztb-table {
                    border: 1px solid #95b8e6;
                }
            }
        }

        .side-bar-0,
        .side-bar-1 {
            width: $sideBar1 - $asideWidth;
        }

        .side-bar-2 {
            width: $sideBar2 - $asideWidth;
        }

        .side-bar-3 {
            width: $sideBar3 - $asideWidth;
        }
    }

    /deep/ .ztb-list-nav {
        // 更改默认树样式
        .el-tree {
            background-color: transparent;
        }

        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
            background-color: #ffe48d;
        }

        .el-tree-node__content:hover {
            background-color: transparent;
        }

        .custom-tree-node {
            line-height: 0.1rem;

            .node-text {
                font-size: 0.14rem;
                margin-left: 0.05rem;
            }
        }

        .node-img {
            width: 0.14rem;
            height: 0.14rem;
        }

        .el-tree-node__content {
            height: 0.26rem;
        }
    }
</style>
