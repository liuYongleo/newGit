/*
 * 说明：
 * 1、路由页面需要的query、params统一在meta中配置key和初始值,便于维护
 * */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: resolve => {
            require([ '@/views/login.vue', ], resolve);
        },
    },
    // 项目列表
    {
        path: '/list',
        name: 'list',
        component: resolve => {
            require([ '@/views/list.vue', ], resolve);
        },
    },
    {
        path: '/',
        name: 'home',
        component: resolve => {
            require([ '@/views/home.vue', ], resolve);
        },
        children: [
            // 招标清单
            {
                path: 'zb-list',
                name: 'zb-list',
                component: resolve => {
                    require([ '@/views/home/zb-list.vue', ], resolve);
                },
            },

            // 投标清单
            {
                path: 'tb-list',
                name: 'tb-list',
                component: resolve => {
                    require([ '@/views/home/tb-list.vue', ], resolve);
                },
            },

            // 项目信息
            {
                path: 'project-info',
                name: 'project-info',
                component: resolve => {
                    require([ '@/views/home/project-info.vue', ], resolve);
                },
            },

            // 招标文件
            {
                path: 'zb-file',
                name: 'zb-file',
                component: resolve => {
                    require([ '@/views/home/zb-file.vue', ], resolve);
                },
            },

            // 评审项目
            {
                path: 'review-project',
                name: 'review-project',
                component: resolve => {
                    require([ '@/views/home/review-project.vue', ], resolve);
                },
            },

            // 投标构成
            {
                path: 'tb-composition',
                name: 'tb-composition',
                component: resolve => {
                    require([ '@/views/home/tb-composition.vue', ], resolve);
                },
            },

            // 附件
            {
                path: 'attachment',
                name: 'attachment',
                component: resolve => {
                    require([ '@/views/home/attachment.vue', ], resolve);
                },
            },

            // 投标明标
            {
                path: 'tbmb',
                name: 'tbmb',
                component: resolve => {
                    require([ '@/views/home/tbmb.vue', ], resolve);
                },
            },

            // 投标暗标
            {
                path: 'tbab',
                name: 'tbab',
                component: resolve => {
                    require([ '@/views/home/tbab.vue', ], resolve);
                },
            },

            // 开标一览表
            {
                path: 'kb-overview',
                name: 'kb-overview',
                component: resolve => {
                    require([ '@/views/home/kb-overview.vue', ], resolve);
                },
            },

            // 清标结果
            {
                path: 'qb-result',
                name: 'qb-result',
                component: resolve => {
                    require([ '@/views/home/qb-result.vue', ], resolve);
                },
            },

            // 答疑补遗文件
            {
                path: 'aq-file',
                name: 'aq-file',
                component: resolve => {
                    require([ '@/views/home/aq-file.vue', ], resolve);
                },
            },

            // 保证金缴纳情况
            {
                path: 'deposit',
                name: 'deposit',
                component: resolve => {
                    require([ '@/views/home/deposit.vue', ], resolve);
                },
            },

            // 评审澄清问题-编辑
            {
                path: 'review-clarify-edit',
                name: 'review-clarify-edit',
                component: resolve => {
                    require([ '@/views/home/review-clarify-edit.vue', ], resolve);
                },
            },

            // 评审澄清问题-查看
            {
                path: 'review-clarify-view',
                name: 'review-clarify-view',
                component: resolve => {
                    require([ '@/views/home/review-clarify-view.vue', ], resolve);
                },
            },

            // 发起否决投标
            {
                path: 'initiate-veto',
                name: 'initiate-veto',
                component: resolve => {
                    require([ '@/views/home/initiate-veto.vue', ], resolve);
                },
            },

            // 响应否决投标
            {
                path: 'response-veto',
                name: 'response-veto',
                component: resolve => {
                    require([ '@/views/home/response-veto.vue', ], resolve);
                },
            },

            // 查看评审结果汇总
            {
                path: 'result-summary',
                name: 'result-summary',
                component: resolve => {
                    require([ '@/views/home/result-summary.vue', ], resolve);
                },
            },

            // 查看价格评审
            {
                path: 'review-price-view',
                name: 'review-price-view',
                component: resolve => {
                    require([ '@/views/home/review-price-view.vue', ], resolve);
                },
            },

            // 评标报告
            {
                path: 'pb-report',
                name: 'pb-report',
                component: resolve => {
                    require([ '@/views/home/pb-report.vue', ], resolve);
                },
            },
        ],
    },
];

let router = new Router({
    routes: routes,
    mode: 'hash',
});

export { router, };
