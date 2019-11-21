export default {
    computed: {
        // 当前选择的评审框的数据
        selectedReviewData () {
            // return this.$store.state.flowDataPicker[this.$store.state.reviewStep - 1] || {};
            return this.$store.state.flowData[this.$store.state.reviewStep - 1] || {};
        },
    },
    methods: {
        // 保留原有的路由参数，进行路由跳转。routeObj: $router.push(obj) 接收的参数
        routerSavePush: function (routeObj) {
            let queryCopy = JSON.parse(JSON.stringify(this.$route.query));
            let paramsCopy = JSON.parse(JSON.stringify(this.$route.params));
            for (let i in routeObj.query) {
                queryCopy[i] = routeObj.query[i];
            }
            for (let i in routeObj.params) {
                paramsCopy[i] = routeObj.params[i];
            }
            this.$router.push({
                name: routeObj.name,
                query: queryCopy,
                params: paramsCopy,
            });
        },

        // 保留原有的路由参数，进行路由替换
        routerSaveReplace: function (routeObj) {
            let queryCopy = JSON.parse(JSON.stringify(this.$route.query));
            let paramsCopy = JSON.parse(JSON.stringify(this.$route.params));
            for (let i in routeObj.query) {
                queryCopy[i] = routeObj.query[i];
            }
            for (let i in routeObj.params) {
                paramsCopy[i] = routeObj.params[i];
            }
            this.$router.replace({
                name: routeObj.name,
                query: queryCopy,
                params: paramsCopy,
            });
        },

        // 手动加按钮激活样式
        activeBtn: function (e) {
            this.$nextTick(() => {
                e.target.classList.add('btn-active');
                setTimeout(() => {
                    e.target.classList.remove('btn-active');
                }, 100);
            });
        },

        // 根据评审环节跳转页面
        reviewJump: function (item) {
            if (item.FlowName === '清标评审') {
                // 清标评审
                this.$router.push({ name: 'qb-result', });
            } else if (item.FlowName === '评审汇总') {
                // 评审结果汇总
                this.$router.push({ name: 'result-summary', });
            } else if (item.FlowName === '价格评审') {
                // 价格评审
                this.$router.push({ name: 'review-price-view', });
            } else if (item.FlowName === '评标报告') {
                this.$router.push({ name: 'pb-report', });
            }
        },

        // 显示个人信息编辑弹框
        showUserEditModal () {
            this.$store.commit('save', {
                path: 'userEditModalShow',
                data: true,
            });
        },

        // 消息弹窗
        alert ({title = '提示', content, duration = 2000, options = {}, cb, }) {
            let defaultOptions = {
                customClass: 'dy-msg-box',
                showConfirmButton: false,
                closeOnClickModal: false,
                dangerouslyUseHTMLString: true,
            };
            this.$alert(content, title, this.$_.merge(defaultOptions, options)).catch(() => {
                clearTimeout(this.alertTimer);
                this.alertTimer = null;
                cb && cb();
            });
            if (!this.alertTimer) {
                this.alertTimer = setTimeout(() => {
                    this.$msgbox.close();
                    this.alertTimer = null;
                    cb && cb();
                }, duration);
            } else {
                this.$msgbox.close();
                clearTimeout(this.alertTimer);
                this.alertTimer = null;
            }
        },

        // 点击进入流程提醒
        flowAlert () {
            let flowNow = this.$store.state.flowDataPicker[this.$store.state.reviewStep];
            let content = (flowNow && flowNow.FlowName) + '环节评审未完成，不能进入该评审环节';
            this.alert({content, });
        },

        // 点击一下评审环节按钮
        flowBtnAlert (msg) {
            let content = `<p>${this.$store.state.project.PWNAME}专家</p>`;
            content += `<p>${msg}</p>`;
            this.alert({content, });
        },

        // 不能编辑
        alertCanNotEdit () {
            this.alert({content: '你已提交结果，不能编辑！', });
        },

        // 只有组长可以编辑
        alertOnlyLeader () {
            this.alert({content: '只有组长可以编辑！', });
        },
    },
};
