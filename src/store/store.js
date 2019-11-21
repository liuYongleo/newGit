import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import portService from '@/assets/js/http/http';

Vue.use(Vuex);

const flowReg = /^竞争/;

const store = new Vuex.Store({
    state: {
        barPosition: 'left', // 导航栏位置：left right
        reviewStep: 1, // 评审所处阶段 1:选组长; 2:清标评审; 3:形式评审; 4:项目管理机构; 5:价格评审; 6:评审结果汇总; 7:评标报告;
        rem: 100, // 1rem对应的px
        indexCellWidth: 80, // 表格index列的宽度
        selectedMenu: 0, // 导航栏选中标签 0:未选中 1:评审 2:菜单 3:流程
        reviewType: 1, // 评审模式 1:同步; 2:异步;
        personalVisible: false, // 显示个人中心
        userAuthorization: '',
        authorization: '',
        project: {}, // 当前的项目
        helloModalShow: false, // 显示欢迎模态框
        userEditModalShow: false, // 显示个人信息编辑弹框
        officeViewModalShow: false, // 查看office文件的弹框
        leaderId: '', // 组长id，为空时说明未选择组长
        isLeader: false, // 当前用户为组长
        flowData: [], // 流程数据
        currentFlow: {}, // 当前流程
        flowDataPicker: [], // 评审框选择流程数据
        priceReviewData: {}, // 价格评审数据
        summaryReviewData: {}, // 评审汇总数据
        reviewWinState: 1, // 评审框状态：1-默认 2-半屏 3-全屏
        competeVisible: false, // 是否显示竞争有效性判断框
        pdfHttp: 'http://xepb.jiaoyi365.com/xe-file-nginx/viewer.html?file=', // pdf查看地址
    },
    mutations: {
        // 统一设置state中的值
        // eg：
        // store.commit('save', {
        //             path: 'deviceId',
        //             data: ‘CXff-DDD-123456awl’,
        //         });
        save (state, {path, data, }) {
            if (!path) {
                throw new Error('need path');
            }
            const keyPath = path.split('.');
            let targetParent = state;
            for (let i = 0; i < keyPath.length - 1; i++) {
                targetParent = targetParent[keyPath[i]];
                if (!targetParent) {
                    throw new Error(`error path: ${keyPath[i]}`);
                }
            }

            if (targetParent.hasOwnProperty(keyPath[keyPath.length - 1])) {
                targetParent[keyPath[keyPath.length - 1]] = data;
            } else {
                throw new Error(
                    `state "${path}" should  been explicitly defined in store.state`
                );
            }
        },
    },
    actions: {
        // type 0 更新评审框选择流程数据 2更新流程数据
        async getFlowData ({commit, state, }, type = 0) {
            // 流程数据
            let flowData = [ {FlowId: 'leader', FlowName: '推荐组长', EvalStatus_Flow: state.leaderId !== '' ? 2 : 4, }, ];
            const res = await portService.getFlowData();
            if (res.data) {
                let data = res.data.value;
                // 过滤 竞争有效性 和 FlowPSType为6的
                data.forEach(item => {
                    if (!flowReg.test(item.FlowName) && item.FlowPSType !== 6) {
                        flowData.push(item);
                    }
                });
                flowData.push({FlowId: 'pbbg', FlowName: '评标报告', EvalStatus_Flow: 0, });
            }

            return new Promise(resolve => {
                commit('save', { path: 'flowDataPicker', data: flowData, });
                let flowDataClone = JSON.parse(JSON.stringify(flowData));
                flowDataClone.push({FlowId: 'pbjs', FlowName: '评标结束', EvalStatus_Flow: 0, });
                commit('save', {path: 'flowData', data: flowDataClone, });
                // 先临时写一个：获取到进行中的流程（EvalStatus_Flow === 4）
                commit('save', {path: 'currentFlow', data: flowDataClone.filter(item => item.EvalStatus_Flow === 4)[0], });

                resolve(true);
            });
        },

        async getLeader ({commit, }) {
            let res = await portService.getVoteLeaderStatus();
            return new Promise((resolve, reject) => {
                if (res.code === 200) {
                    let value = res.data.value;
                    // console.log(value.ResultMessage);
                    if (value.Result && (value.ResultMessage != null && value.ResultMessage !== '')) {
                        commit('save', {
                            path: 'leaderId',
                            data: value.ResultMessage,
                        });

                        commit('save', {
                            path: 'isLeader',
                            data: (store.state.project.PWId + '') === (value.ResultMessage + ''),
                        });

                        resolve(true);
                    }
                    resolve(false);
                }
                resolve(false);
            });
        },

    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            // 需要持久化存储在sessionStorage的数据在reducer中做配置
            reducer (state) {
                return {
                    userAuthorization: state.userAuthorization,
                    authorization: state.authorization,
                    flowData: state.flowData,
                    currentFlow: state.currentFlow,
                    flowDataPicker: state.flowDataPicker,
                    reviewStep: state.reviewStep,
                    project: state.project,
                    helloModalShow: state.helloModalShow,
                    leaderId: state.leaderId,
                    isLeader: state.isLeader,
                    reviewType: state.reviewType,
                    barPosition: state.barPosition,
                    reviewWinState: state.reviewWinState,
                };
            },
        }),
    ],
});

export default store;
