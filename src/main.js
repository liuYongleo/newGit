import Vue from 'vue';
import App from './App';
import { router, } from './router';
import portService from '@/assets/js/http/http';
import g from '@/assets/js/const/global-const';
import store from '@/store/store';
import commonFilter from '@/assets/js/filters/zl-filter/zl-filter';
import mixin from '@/assets/js/mixin/mixin';
import projectFilter from '@/assets/js/filters/project-filter/filter';
import * as zlUtils from '@/assets/js/utils/zl-utils/zl-utils';
import projectUtils from '@/assets/js/utils/project-utils/utils';
import dbClick from '@/assets/js/directive/zl-derective/doubleClick'; // 按钮防抖指令
import clickOut from '@/assets/js/directive/zl-derective/click-out'; // 点击元素外部指令
import lodash from 'lodash';
import {
    Button as vanButton,
    Popup as vanPopup,
    Picker as vanPicker,
} from 'vant';
import selfSelect from '@/components/project-components/self-select/self-select';
import selfTable from '@/components/project-components/self-table/self-table';
import selfTextarea from '@/components/project-components/self-textarea/self-textarea';
import modalInput from '@/components/project-components/modal-input/modal-input';
import modalCheck from '@/components/project-components/modal-check/modal-check';
import modalSwitch from '@/components/project-components/modal-switch/modal-switch';
import modalBtn from '@/components/project-components/modal-btn/modal-btn';

import selfTouch from '@/assets/js/directive/project-directive/self-touch'; // 自定义的移动端事件指令

import 'babel-polyfill';

Vue.config.productionTip = false;

Vue.prototype.portService = portService;

// 公共常量配置
Vue.prototype.$const = g;
// utils配置
Vue.prototype.utils = {};

Vue.prototype.$_ = lodash;

// 公用utils
Object.keys(zlUtils).forEach(key => {
    Vue.prototype.utils[key] = zlUtils[key];
});
// 项目特有的utils
Object.keys(projectUtils).forEach(key => {
    Vue.prototype.utils[key] = projectUtils[key];
});

// 定义filter(各项目间通用)
Object.keys(commonFilter).forEach(key => Vue.filter(key, commonFilter[key]));
// 定义filter(此项目特有)
Object.keys(projectFilter).forEach(key => Vue.filter(key, projectFilter[key]));

// filter挂在到原型便于通过js调用
Vue.prototype.$filter = {};
Object.keys(commonFilter).forEach(key => {
    Vue.prototype.$filter[key] = commonFilter[key];
});
Object.keys(projectFilter).forEach(key => {
    Vue.prototype.$filter[key] = projectFilter[key];
});

Vue.mixin(mixin);

// 防止重复点击指令
Vue.directive('dbClick', dbClick);
// 点击元素外部指令
Vue.directive('clickOut', clickOut);
// 移动端事件指令
Vue.directive('selfTouch', selfTouch);

// 全局常量
Vue.prototype.$g = g;

// 注册vant组件
Vue.component('vanButton', vanButton);
Vue.component('vanPopup', vanPopup);
Vue.component('vanPicker', vanPicker);

// 注册自定义组件
Vue.component('selfSelect', selfSelect);
Vue.component('selfTable', selfTable);
Vue.component('selfTextarea', selfTextarea);
Vue.component('modalInput', modalInput);
Vue.component('modalCheck', modalCheck);
Vue.component('modalSwitch', modalSwitch);
Vue.component('modalBtn', modalBtn);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App, },
    template: '<App/>',
});

router.beforeResolve((to, from, next) => {
    // 页面标题
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    let isQueryChange = false;
    // 设置默认query
    for (let i in to.meta.query) {
        if (to.query[i] === undefined) {
            if (
                to.meta.query[i] ||
                to.meta.query[i] === 0 ||
                to.meta.query[i] === false
            ) {
                to.query[i] = to.meta.query[i];
                isQueryChange = true;
            }
        }
    }

    // 默认params, query设置
    // 删掉meta里面值为undefined或者''的属性(不然url不好看，会像这样：xxx/xxx/xxx?keyword=&startTime=&endTime=)
    for (let i in to.query) {
        if (!to.query[i] && to.query[i] !== 0 && to.query[i] !== false) {
            delete to.query[i];
            isQueryChange = true;
        }
    }

    if (isQueryChange === true) {
        next({ name: to.name, params: to.params, query: to.query, });
    } else {
        next();
    }
});
