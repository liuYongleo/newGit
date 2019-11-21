<template>
    <div class="bar-menu"
        :class="[$store.state.barPosition]">
        <i class="el-icon-close side-bar-close-icon" :class="[$store.state.barPosition]" @click="closeBar"></i>
        <ul class="bar-menu-wrap">
            <li class="bar-menu-list"
                v-if="item.show"
                v-for="item in menuData"
                :key="item.id">
                <div class="title-box">
                    <span class="title">{{item.title}}</span>
                    <i class="line"></i>
                </div>
                <div class="content">
                    <span class="item-wrap"
                        v-for="subItem in item.list"
                        :key="subItem.id">
                        <span class="item"
                            :class="{'active': selectedMenu === subItem.id}"
                            @click="selectMenu(subItem)">{{subItem.name}}</span>
                    </span>
                </div>
            </li>
            <li class="bar-menu-list">
                <div class="title-box">
                    <span class="title">个人中心</span>
                    <i class="line"></i>
                </div>
                <div class="content">
                    <span class="item-wrap">
                        <span class="item"
                            @click="selectMenu({sideBarModal: 1})">个人中心</span>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'side-bar-menu',
    data () {
        return {
            menu: [
                {
                    id: 'qdwj',
                    title: '清单文件',
                    list: [ { name: '招标清单', id: 'zb-list', }, { name: '投标清单', id: 'tb-list', }, ],
                    show: true,
                },
                {
                    id: 'zbwj',
                    title: '招标文件',
                    list: [
                        { name: '项目信息', id: 'project-info', },
                        { name: '招标文件', id: 'zb-file', },
                        { name: '评审项目', id: 'review-project', },
                        { name: '投标构成', id: 'tb-composition', },
                        { name: '附件', id: 'attachment', },
                    ],
                    show: true,
                },
                {
                    id: 'tbwj1',
                    title: '投标文件',
                    list: [ { name: '投标明标', id: 'tbmb', }, ],
                    show: true,
                },
                {
                    id: 'tbwj2',
                    title: '投标文件',
                    list: [ { name: '投标明标', id: 'tbmb', }, { name: '投标暗标', id: 'tbab', }, ],
                    show: true,
                },
                {
                    id: 'kbylb',
                    title: '开标一览表',
                    list: [ { name: '开标一览表', id: 'kb-overview', }, ],
                    show: true,
                },
                {
                    id: 'dbywj',
                    title: '答补遗文件',
                    list: [ { name: '答补遗文件', id: 'aq-file', }, ],
                    show: true,
                },
                {
                    id: 'bzj',
                    title: '保证金缴纳情况',
                    list: [ { name: '保证金缴纳情况', id: 'deposit', }, ],
                    show: true,
                },
                {
                    id: 'psqwt',
                    title: '评审澄清问题',
                    list: [ { name: '编辑', id: 'review-clarify-edit', }, { name: '查看', id: 'review-clarify-view', }, ],
                    show: true,
                },
                {
                    id: 'fjtb',
                    title: '否决投标',
                    list: [ { name: '发起', id: 'initiate-veto', }, { name: '响应', id: 'response-veto', }, ],
                    show: true,
                },
            ],
            selectedMenu: this.$route.name,
        };
    },
    computed: {
        menuData () {
            // 是否有清单
            let hasList = this.$store.state.project['需要清单'];
            let flowData = this.$store.state.flowDataPicker;
            // 是否有暗标
            let hasAb = false;
            for (let item of flowData) {
                if (item.IsOpen === false) {
                    hasAb = true;
                    break;
                }
            }
            let menu = [];
            this.menu.forEach(item => {
                if (hasList) {
                    if (item.id === 'kbylb') {
                        item.show = false;
                    }
                } else {
                    if (item.id === 'qdwj') {
                        item.show = false;
                    }
                }
                if (hasAb) {
                    if (item.id === 'tbwj1') {
                        item.show = false;
                    }
                } else {
                    if (item.id === 'tbwj2') {
                        item.show = false;
                    }
                }
                menu.push(item);
            });
            return menu;
        },
    },
    methods: {
        selectMenu (item) {
            if (item.id) {
                this.selectedMenu = item.id;
                this.$router.push({ name: item.id, });
                // this.$store.commit('save', { path: 'selectedMenu', data: 0 });
            }

            if (item.sideBarModal) {
                // this.$parent.selectMenu({id: item.sideBarModal, });
                this.$store.commit('save', { path: 'selectedMenu', data: 0, });
                this.$store.commit('save', { path: 'personalVisible', data: true, });
            }
        },
        closeBar () {
            this.$emit('closeBar');
        },
    },
};
</script>

<style lang="scss" scoped>
    .bar-menu {
        background-color: $menuBgColor;
        width: $menuWidth;
        overflow: auto;
        box-shadow: 0 -2px 4px 0 #cbcbcb;
    }

    .bar-menu-wrap {
        padding: 0.3rem 0.22rem 0 0.16rem;

        .bar-menu-list {
            .title-box {
                position: relative;
                color: #b2b2b2;
                font-size: $fontM;
                margin-bottom: 0.18rem;

                .title {
                    position: relative;
                    background-color: $menuBgColor;
                    padding-right: 0.1rem;
                    z-index: 1;
                }

                .line {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: #ebebeb;
                }
            }

            .content {
                color: #666;
                font-size: $fontL;

                .item-wrap {
                    display: inline-block;
                    min-width: 50%;

                    .item {
                        display: inline-block;
                        padding: 0 0.15rem;
                        margin-bottom: 0.17rem;
                        line-height: 0.36rem;
                    }
                }

                .item.active {
                    background-color: $colorActive;
                    border-radius: 0.2rem;
                    color: #fff;
                }
            }
        }
    }
</style>

