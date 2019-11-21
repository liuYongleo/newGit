import api from './api';
import $ from 'jquery';
import commonFilter from '@/assets/js/filters/zl-filter/zl-filter';
import utils from '@/assets/js/utils/project-utils/utils';
import store from '@/store/store';
import g from '@/assets/js/const/global-const';
import Qs from 'qs';

const userHttp = {
    login: function (EnumUserType, UserCode, Password) {
        const url = '/api/oauth/getoauth1';

        let params = {
            EnumUserType: EnumUserType, // 用户类型（1：评委登录，2：工作人员账号登录，3：工作人员CA登录，4：代理账号登录，5：代理CA登录）
            UserCode: UserCode,
            Password: Password,
        };

        return api.get(url, params, {authorization: -1, });
    },

    // 获取评委评标工程项目
    getPwBidProjects: function (ProjCode = '') {
        const url = '/api/pb/getpwbidprojs';

        let params = {
            BidStatus: 3, // 评标状态（0：未开标，1：开标中，2：开标完，3：评标中，4：评标完，5：已流标，6：资审中）
            OpenBidDate: '', // 开标日期
            ProjName: '', // 项目名称
            ProjCode: ProjCode, // 项目编号
            PBType: '', // 专业类别
        };
        return api.get(url, params, {
            authorization: store.state.userAuthorization,
        });
    },

    // 通过用户Guid、项目GUID、数据库GUID获取到authorization
    getoauth2: function (PwGuid, BidProjGuid, DbGUID = '') {
        const url = '/api/oauth/getoauth2';
        let params = {
            PwGuid: PwGuid,
            BidProjGuid: BidProjGuid,
            DbGUID: DbGUID,
        };
        return api.get(url, params, {
            authorization: store.state.userAuthorization,
        });
    },

    // 初始化评委评审表
    initEvalItem: function () {
        const url = '/api/pb_local/initevalitem';
        return api.post(url);
    },

    // 修改用户信息
    saveUserInfo: function (params) {
        let obj = {
            PwName: params.PwName, // 姓名
            PersonIc: params.PersonIc, // 身份证号码
            Enterprise: params.Enterprise, // 企业
        };
        const url = `/api/pb_local/editpw`;
        return api.post(url, obj);
    },

    // 根据条件查找推选评委组长
    getTeamLeader: function (PWRoleType = 7) {
        let params = {
            PWRoleType: PWRoleType,
        };
        const url = '/api/pb/getpwvoteteamleader1';
        return api.get(url, params);
    },

    // 检查是否产生组长
    getVoteLeaderStatus: function () {
        const url = '/api/pb/checkisconfirmteamleader';
        return api.get(url, {});
    },

    // 推选组长
    saveVoteLeader: function (TeamleaderId, PWRoleType = 7) {
        let obj = {
            TeamleaderId: TeamleaderId, // 组长id
            PWRoleType: PWRoleType, // 评委角色
        };

        const url = '/api/pb/editvoteteamleader1';
        return api.post(url, obj);
    },

    /**
     * 获取流程数据
     *
     * 返回数据
     * @FlowName 流程名称
     * @FlowPSType 流程类型 1定性评审 2定量评审 3报价评审 6定性合格制
     * @EvalStatus_Flow 流程状态 0未开始评标 1准备就绪 2评审结束 3跳过评审 4正在进行
     * @IsOpen 是否为明标 true明标 false暗标
     * @指标类型 0:一般指标；1:重要指标
     */
    getFlowData: function () {
        const url = '/api/pb/getbidflows';
        return api.get(url, {});
    },

    /**
     * 获取投标单位信息
     * @param {string} FlowName 评审流程名称
     * @param {any} OrderString 排序规则（SQL）
     *
     */
    getTbComp: function (FlowName, OrderString) {
        const url = '/api/pb/getbidfilebycondition2';
        return api.get(url, {FlowName, OrderString, });
    },

    /**
     * 获取评审因素
     * @param {string} FlowName 评审流程名称
     *
     * return {
     *  ID: 评审因素id
     *  ITEMMEMO: 评审标准
     *  ITEMNAME: 评审因素
     *  ItemTypeName: 评审流程名称
     *  HIGHSCORE: 满分
     *  ScoreMin: 最低分
     *  ShowOnly: 只读
     * }
     */
    getReviewParams: function (FlowName) {
        const url = '/api/pb/getevalitembycondition2';
        return api.get(url, {FlowName, });
    },

    /**
     * 获取评委当前评审流程的评审信息
     * @param {string} FlowName 评审流程名称
     * @param {string} OrderString 排序规则（SQL）
     *
     * return {
     *  PublicId: 提交评审用到的id
     *  Score: 得分/定性（1合格 0不合格 2不可以评审）
     *  BidFileGuid: 企业信息
     *  ItemId: 评审因素id
     *  ItemTypeName: 评审流程名称
     * }
     */
    getCurrentReviewData: function (FlowName, OrderString) {
        const url = '/api/pb/getscorepublicbycondition4';
        return api.get(url, {FlowName, OrderString, }, );
    },

    /**
     * 检查前一阶段是否评审完成，通过后才可进入选择的流程
     * @param {string} FlowName 要去的流程名
     *
     */
    checkCanGoFlow: function (FlowName) {
        const url = '/api/pb/jianchaqianyijieduanshifoupingshenwancheng';
        return api.get(url, {FlowName, });
    },

    /**
     * 修改合格与不合格状态（定性）
     * @param {string} PublicId 评委评审Id
     * @param {string} Score 1合格/0不合格
     * @param {string} Reason 理由
     *
     */
    editDx: function (PublicId, Score, Reason = '') {
        const url = '/api/pb/editscore_public_hegezhuangtai';
        if (Score !== 0) {
            Reason = '';
        }
        return api.post(url, {PublicId, Score, Reason, });
    },

    /**
     * 修改评审得分（定量）
     * @param {string} PublicId 评委评审Id
     * @param {string} Score 1合格/0不合格
     * @param {string} Reason 理由
     *
     */
    editDl: function (PublicId, Score, Reason = '') {
        const url = '/api/pb/EditPingShenDeFen2';
        return api.post(url, {PublicId, Score, Reason, });
    },

    /**
     * 提交评审
     * @param {string} FlowName 评审流程名称
     * @param {string} FlowPSType 评审方式（获取流程数据时返回的FlowPSType）
     *
     */
    submitPb: function (FlowName, FlowPSType) {
        const url = '/api/pb/pingweitijiapingshen2';
        return api.post(url, {FlowName, FlowPSType, });
    },

    /**
     *判断用户某个评审流程是否提交数据
     *@param {string} FlowName 流程名字
     *
     */
    checkStageCommit: function (FlowName) {
        const url = `/api/pb/checkdangqianzhuanjiashifoutijiaopingshen?FlowName=${FlowName}`;
        return api.get(url);
    },

    /**
     * 计算投标报价得分
     *
     */
    calPrice: function () {
        const url = '/api/pb_local/calculatepricescore';
        return api.post(url);
    },

    /**
     * 计算排名
     *
     */
    calOrder: function () {
        const url = '/api/pb_local/calculatescoreorder';
        return api.post(url);
    },

    /**
     * 获取价格评审相关数据
     * @param {string} FlowName 评审流程名称
     *
     * data:
     * isEvalTotalPrice true 有效评标价均值 false有效投标报价均值
     * isTopPrice true控制价 false控制价相应价格
     * isDiYuChengBen true第一二条都显示 false都不显示
     * isDiYuChengBenDiYiTiao true显示第一条 false
     * isDiYuChengBenPingShenZiDongFeiBiao 是否自动废标 false手动废标
     * TopPriceN 控制价百分比  TopPrice_N 百分比值
     * TopPriceN2 控制价相应价格百分比 TopPrice_N2 百分比值
     * TopPrice 控制价
     * AvgEvalTotalPrice 有效投标报价均值
     * AvgEvalTotalPriceM 有效投标报价均值百分比 AvgEvalTotalPrice_M 百分比值
     * BaseTotalPrice 基准价
     * 是否价格或费率
     *
     * table:
     * AQWMSGF 安全文明措施费
     * AvgEvalTotalPriceM 有效投标报价均值百分比值
     * BIDFILEID 废标传的id
     * BUSISCORE 得分合计
     * PriceScore 评标价得分
     * BaseTotalPrice 基准价（无清单）
     * ENTPRSNAME 投标单位
     * EvalTotalPrice 评标价
     * IsGreaterThanTopPrice 是否高于控制价
     * IsLessThanTopPriceN 是否低于控制价
     * SCOREORDER 排名
     * TOTALPRICE 投标报价/费率
     * Is_BadBid 是否废标
     * BadBidNote 废标理由
     *
     */
    getPriceViewData: function (FlowName = '价格评审') {
        const url = '/api/pb_local/getjiagepingshen';
        return api.get(url, {FlowName, });
    },

    /**
     * 低于成本废标
     * @param {string} BidFileId 投标单位Id
     * @param {boolean} IsBadBid 是否废标 true废标
     * @param {string} Reason 废标理由
     *
     */
    invalidBid: function (BidFileId, IsBadBid, Reason) {
        const url = '/api/pb_local/diyuchengbenfeibiao';
        return api.post(url, {BidFileId, IsBadBid, Reason, });
    },

    /**
     * 评委提交评审
     * @param {string} FlowId 评审流程Id
     * @param {string} FlowName 评审流程名称
     *
     */
    submitPriceOrSummary: function (FlowId, FlowName) {
        const url = '/api/pb_local/pingweitijiapingshen';
        return api.post(url, {FlowId, FlowName, });
    },

    /**
     * 计算评审汇总总分、排名
     * @param {string} FlowName 评审流程名称
     *
     */
    calSummaryScore: function (FlowName) {
        const url = '/api/pb_local/calscoreorder';
        return api.post(url, {FlowName, });
    },

    /**
     * 获取评审汇总列表数据
     *
     * TOTALSCORE 总得分
     * ENTPRSNAME 投标单位
     * SCOREORDER 排名
     * TOTALPRICE 投标报价
     * 修改排名原因
     *
     */
    getSummaryViewData: function () {
        const url = '/api/pb/getpingbiaohuizong';
        return api.get(url, {});
    },

    /**
     * 修改评审汇总排名
     * @param {string} BidFileId 投标单位Id
     * @param {number} ScoreOrder 排名
     * @param {string} Reason 原因
     *
     */
    editSummaryRank: function (BidFileId, ScoreOrder, Reason) {
        const url = '/api/pb_local/editscoreorder';
        return api.post(url, {BidFileId, ScoreOrder, Reason, });
    },

    /**
     * 修改评审汇总排名
     * @param {string} BidFileId 投标单位Id
     * @param {boolean} Is_Elected 排名
     *
     */
    editElected: function (BidFileId, isElected) {
        const url = '/api/pb_local/editelected';
        return api.post(url, {BidFileId, Is_Elected: isElected, });
    },

    /**
     * 定性汇总 获取评审汇总情况
     * @param {string} BidFileId 投标单位Id
     * @param {boolean} FlowName 评审流程名称
     *
     */
    getDxPcSummary: function (BidFileId, FlowName) {
        const url = '/api/pb/GetSumPublicByBidFileId';
        return api.get(url, {BidFileId, FlowName, });
    },

    /**
     * 定性汇总 根据评审因素获取评审汇总情况
     * @param {string} BidFileId 投标单位Id
     * @param {string} ItemId 评审因素Id
     * @param {boolean} FlowName 评审流程名称
     *
     */
    getDxParamsSummary: function (BidFileId, ItemId, FlowName) {
        const url = '/api/pb/GetSumPublicByBidFileIdAndItemId';
        return api.get(url, {BidFileId, ItemId, FlowName, });
    },

    /**
     * 定量评审汇总 获取评审汇总情况-按评委汇总
     * @param {string} BidFileId 投标单位Id
     * @param {boolean} FlowName 评审流程名称
     *
     */
    getDlPcSummary: function (BidFileId, FlowName) {
        const url = '/api/pb/GetSumPublicByBidFileId_AnPingWeiHuiZong';
        return api.get(url, {BidFileId, FlowName, });
    },

    /**
     * 定量评审汇总 获取评委评审某一单位信息-当前评委
     * @param {string} BidFileId 投标单位Id
     * @param {boolean} FlowName 评审流程名称
     *
     */
    getDlParamsSummary: function (BidFileId, FlowName) {
        const url = '/api/pb/getscorepublicbycondition5';
        return api.get(url, {BidFileId, FlowName, });
    },

    /**
     * 获取最新消息
     *
     * 返回数据
     * 0 普通消息（查看）
     * 1 否决投标（打开否决投标 - 响应页面）
     * 7 流程控制窗体信息（打开竞争有效性判断窗口）
     *
     */
    getMessage: function () {
        const url = '/api/pb/GetNewBidMessage';
        return api.get(url, {});
    },

    /**
     * 把消息状态至为已读
     * @param {string} Id 消息Id
     *
     */
    readMessage: function (Id) {
        const url = '/api/pb/readmessage';
        return api.post(url, {Id, });
    },

    /**
     * 修改评委评审流程状态记录-竞争有效性判断
     * @param {boolean} IsContinue 是否继续
     * @param {String} FlowName 评审流程名称
     * @param {String} Reason 理由
     *
     */
    editCompete: function (IsContinue, FlowName, Reason = '') {
        IsContinue = IsContinue === 1;
        const url = '/api/pb_local/EditCompetitiveEffectiveJudgment';
        return api.post(url, {IsContinue, FlowName, Reason, });
    },

    /**
     * 获取评委评审流程状态记录-竞争有效性判断
     * @param {String} FlowName 评审流程名称
     *
     * 返回数据
     *
     */
    getCompete: function (FlowName) {
        const url = '/api/pb_local/GetCompetitiveEffectiveJudgment';
        return api.get(url, {FlowName, });
    },

    /**
     * 界面上清标报告的显示
     *
     * 返回数据
     *
     */
    getQbTotalCheck: function () {
        const url = '/api/pb_local/showpreevalreport';
        return api.get(url, {});
    },

    /**
     * 获取所有进入评标系统的投标单位信息
     *
     * 返回数据
     *
     */
    getQbTotalCheckData: function () {
        const url = '/api/pb/GetBidFileByCondition1';
        return api.get(url, {});
    },

    /**
     * 清标-获取标书硬件信息
     *
     * 返回数据
     * @Memo_PC 单位名称
     * @CPU_SN 芯片批次号
     * @IDE_SN 硬盘序列号
     * @CDSN 网卡序列号
     *
     */
    getQbPcData: function () {
        const url = '/api/pb/getbiaoshuyingjianxinxi';
        return api.get(url, {});
    },

    /**
     * 增加问题澄清
     * @param {string} Entprscode 企业编号
     * @param {String} Question 问题（多个问题用‘；’分开）
     * @param {Datetime} HuiFuEndTime 恢复截止时间
     *
     */
    addCqProblem: async function (Entprscode, Question, HuiFuEndTime) {
        // const res = await this.getserverdatetime();
        // console.log('serverTime', res.data.value);
        // const serverTime = res.data.value;
        const serverTime = new Date().getTime();
        let endTime = commonFilter.date(new Date(serverTime).setMinutes(new Date(serverTime).getMinutes() + parseInt(HuiFuEndTime)), 'yyyy-MM-dd hh:mm:ss');
        // console.log('endTime', endTime);

        const url = '/api/pb_local/AddWenTiChengQing';
        return api.post(url, {Entprscode, Question, HuiFuEndTime: endTime, });
    },

    /**
     * 获取已确认澄清问题投标人
     *
     * 返回数据
     *
     */
    getCqProblem: function () {
        const url = '/api/pb_local/GetYiQueRenChengQingWenTiTouBiaoRen';
        return api.get(url, {});
    },

    /**
     * 获取澄清问题列表-指定投标人
     * @param {String} Entprscode 企业编号
     *
     * 返回数据
     *
     */
    getCqProblemList: function (Entprscode) {
        const url = '/api/pb_local/GetChengQingWenTiLieBiao';
        return api.get(url, {Entprscode, });
    },

    /**
     * 获取服务器时间（yyyy-MM-dd HH:mm:ss）
     *
     */
    getserverdatetime: function () {
        const url = '/api/pb/getserverdatetime';
        return api.get(url, {});
    },

    // 获取发起否决投标单位列表
    // FlowName: 评审流程名称; OrderString: 排序规则;
    getInitiateVoteList: function (FlowName, OrderString) {
        let params = {
            FlowName: FlowName,
            OrderString: OrderString,
        };
        const url = '/api/pb/GetBidFile_FouJueTouBiao';
        return api.get(url, params);
    },


    // 获取否决投标状态
    getVoteList: function () {
        const url = '/api/pb/getfoujuetoubiaobybidproj';
        return api.get(url);
    },

    // 发起否决投标
    // BidFileId : 投标单位ID; FlowID: 流程ID; FouJueTouBiaoYuanYin: 否决投标原因
    postVote: function (BidFileId, FlowID, FouJueTouBiaoYuanYin) {
        let params = {
            BidFileId: BidFileId,
            FlowID: FlowID,
            FouJueTouBiaoYuanYin: FouJueTouBiaoYuanYin,
        };
        const url = '/api/pb/faqifoujuetoubiao';
        return api.post(url, params);
    },

    /** 响应否决投标_保存提交结果**/
    // id: 选择项Id（否决投标Id)
    // FouJueTouBiaoYuanYin: 否决投标原因
    // FouJueTouBiaoJieGuo: 否决投标结果(0不同意废标, 1同意, 2复核);
    responseVote: function (Id, FouJueTouBiaoYuanYin, FouJueTouBiaoJieGuo) {
        let params = {
            Id: Id,
            FouJueTouBiaoYuanYin: FouJueTouBiaoYuanYin,
            FouJueTouBiaoJieGuo: FouJueTouBiaoJieGuo,
        };
        const url = '/api/pb/xiangyingfoujuetoubiao_baocunbingtijiaojie';
        return api.post(url, params);
    },

    // 获取当前专家对某个投标人的否决响应
    getPwVote: function (BidFileId) {
        let params = {
            BidFileId: BidFileId,
        };
        const url = '/api/pb/getfoujuetoubiaobybidprojandbidfileidandpwid1';
        return api.get(url, params);
    },

    // 获取响应否决投标单位数据
    getVoteResponse () {
        const url = '/api/pb/getfoujuetoubiaobybidprojandpwid';
        return api.get(url);
    },
};

const xeFileHttp = {
    /**
     * 获取清单tree数据
     *
     * @param guid 工程id
     * @param name projTree.json(招标清单树结构)、
     * @param type 3(招标清单树结构)
     *
     * 返回数据:
     */
    getListTree: function (guid, name = 'projTree.json', type = 3) {
        const url = '/xe-file-nginx/download.php';
        return api.get(url, {guid, name, type, }, {baseURL: '/zb', });
    },

    /**
     * 获取清单tree数据
     *
     * @param guid 工程id
     * @param name projTree.json(招标清单树结构)、
     * @param type 4(招标清单树结构)
     * @param entCode 表示企业（投标人）社会信用代码
     *
     * 返回数据:
     */
    getTbListTree: function (guid, entCode, name = 'projTree.json', type = 4) {
        const url = '/xe-file-nginx/download.php';
        return api.get(url, {guid, name, type, entCode, }, {baseURL: '/zb', });
    },

    /**
     * 点击清单tree节点时，获取相应数据标签
     *
     * @param name 项目类型_行业类型_节点位置(项目类型:1:招标， 2:投标 行业类型:10:建设工程，20:公路工程, 30:国土工程, 40:水利工程 节点位置： 1级, 2级, 3级)
     * @param type 5(代表清单工程数据配置文件)
     * @param nodeLevel
     *
     * 返回数据:
     */
    getListNav: function (name, type = 5, nodeLevel = 0) {
        const url = '/xe-file-nginx/download.php';
        return api.get(url, {name, type, nodeLevel, }, {baseURL: '/zb', });
    },

    /**
     * 点击标签，获取相应标签列表数据(招标)
     *
     * @param guid 工程id
     * @param name 标签数据的yeqian_key + .json
     * @param type 3
     * @param nodeName 根节点文件夹：1 根节点下的第一子节点文件夹：1-1 根节点下的第二子节点文件夹：1-2
     * @param entCode 表示企业（投标人）社会信用代码
     *
     * 返回数据:
     */
    getListTable: function (guid, name, nodeName, type = 3) {
        const url = '/xe-file-nginx/download.php';
        return api.get(url, {guid, name, type, nodeName, }, {baseURL: '/zb', });
    },

    /**
     * 点击标签，获取相应标签列表数据(投标)
     *
     * @param guid 工程id
     * @param name 标签数据的yeqian_key + .json
     * @param type 4
     * @param nodeName 根节点文件夹：1 根节点下的第一子节点文件夹：1-1 根节点下的第二子节点文件夹：1-2
     * @param entCode 表示企业（投标人）社会信用代码
     *
     * 返回数据:
     */
    getTbListTable: function (guid, name, nodeName, entCode, type = 4) {
        const url = '/xe-file-nginx/download.php';
        return api.get(url, {guid, name, type, nodeName, entCode, }, {baseURL: '/zb', });
    },

    // 获取保证金缴纳情况
    getDepositList: function () {
        const url = '/api/pb_local/GetBaoZhengJinDiJiaoQingKuangLieBiao';
        return api.get(url);
    },

    // 获取补遗文件
    getAQList: function () {
        const url = '/api/pb_local/getdayibuyiwenjianliebiao';
        return api.get(url);
    },

    // 获取主动澄清列表
    getClarifyList: function () {
        const url = '/api/pb_local/GetZhuDongChengQingLieBiao';
        return api.get(url);
    },

    // 获取主动澄清列表
    getQuestionAnswerList: function () {
        const url = '/api/pb_local/GetChengQingWenTiDaFuLieBiao';
        return api.get(url);
    },



};

const portService = {
    ...userHttp,
    ...xeFileHttp,
};

export default portService;
