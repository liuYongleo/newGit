<template>
    <!-- 招标清单 -->
    <div class="ztb-list-main">
        <aside class="ztb-list-nav">
            <el-tree :data="treeDataCopy"
                :highlight-current="true"
                :indent="0.16 * $store.state.rem"
                :render-content="renderTreeContent"
                :default-expand-all="true"
                :expand-on-click-node="false"
                :current-node-key="currentKey"
                node-key="id"
                @node-click="clickNode"></el-tree>
        </aside>
        <section class="ztb-list-con"
            :class="['side-bar-' + $store.state.selectedMenu]">
            <nav class="ztb-nav">
                <ul class="ztb-nav-list">
                    <li class="ztb-nav-item"
                        v-for="item in navData"
                        v-if="item.is_show"
                        :key="item.yeqian_key"
                        @click="selectNav(item)">
                        <p class="ztb-nav-title"
                            :class="{'active': selectedNav === item.yeqian_key}">{{item.yeqian_name}}</p>
                        <i class="active-icon"></i>
                    </li>
                </ul>
            </nav>
            <nav class="ztb-nav-sec"
                v-if="navSecData.length">
                <ul class="ztb-nav-sec-list">
                    <li class="ztb-nav-sec-item"
                        :class="{'active': selectedNavSec === item.yeqian_key}"
                        v-for="item in navSecData"
                        :key="item.yeqian_key"
                        @click="selectNavSec(item)">{{item.yeqian_name}}
                    </li>
                </ul>
            </nav>
            <section class="table-wrap">
                <template v-if="hangye === 10">
                    <!-- 单位工程 其他项目 房建  国土  水利-->
                    <self-table v-if="selectedName === 'qtxm'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.row.itemCode}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="项目名称"
                            min-width="59%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="内容"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zlje'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmmc"
                            label="项目名称"
                            min-width="49%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="暂列金额（元）"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="内容"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <!-- 其他项目  材料（工程设备）暂估价 -->
                    <self-table v-if="selectedName === 'clzgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="招标编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="材料名称"
                            min-width="44%"></el-table-column>
                        <el-table-column prop="xhgg"
                            label="规格、型号"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="暂估单价（元）"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="暂估数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <!-- 其他项目  专业工程暂估价  -->
                    <self-table v-if="selectedName === 'zygczgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="招标编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="工程名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="工程内容"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <!-- 其他项目  计日工  -->
                    <self-table v-if="selectedName === 'jrg'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="招标编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="itemName"
                            label="名称"
                            min-width="40%"></el-table-column>
                        <el-table-column prop="unit"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="数量"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="fl"
                            label="费率（%）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <!-- 其他项目  总承包服务费 -->
                    <self-table v-if="selectedName === 'zcbfwf'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="招标编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="flzjP"
                            label="费率组价"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目价值"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="服务内容"
                            min-width="25%"></el-table-column>
                        <el-table-column prop="btPercent"
                            label="费率或者单价（%、元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="金额（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <!--单位工程 分类分项工程量清单-->
                    <self-table v-if="selectedName === 'flfxgclqd'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.row.xh}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sysCode"
                            label="自定义编号"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="userDefCode"
                            label="编号"
                            min-width="4%"></el-table-column>
                        <el-table-column prop="sysName"
                            label="项目名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目特征"
                            min-width="5%">
                            <template slot-scope="scope">
                                <button class="detail-btn"
                                    @click="showDetail(scope.row.itemName)">查看</button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zyjstkbm"
                            label="主要技术条款编码"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="计量单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="工程数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="bhclzgj"
                            label="包含材料暂估价"
                            min-width="8%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="17%"></el-table-column>
                    </self-table>
                </template>
                <template v-if="hangye === 20">
                    <self-table v-if="selectedName === 'flfxgclqd'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.row.xh}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sysCode"
                            label="自定义编号"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="userDefCode"
                            label="编号"
                            min-width="4%"></el-table-column>
                        <el-table-column prop="sysName"
                            label="项目名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目特征"
                            min-width="5%">
                            <template slot-scope="scope">
                                <button class="detail-btn"
                                    @click="showDetail(scope.row.itemName)">查看</button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zyjstkbm"
                            label="主要技术条款编码"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="计量单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="工程数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="bhclzgj"
                            label="包含材料暂估价"
                            min-width="8%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="17%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'qtxm'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.row.xhQ}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="项目名称"
                            min-width="59%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="说明"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zlje'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="项目名称"
                            min-width="50%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="暂列金额（元）"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'clzgj' || selectedName === 'gcsbzgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="60%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="15%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zygczgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmmc"
                            label="专业工程名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="工程内容"
                            min-width="40%"></el-table-column>
                        <el-table-column prop="price"
                            label="金额"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'jrg'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="编号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.row.codeText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="子目名称"
                            min-width="50%"></el-table-column>
                        <el-table-column prop="unit"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="暂定数量"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                </template>
                <template v-if="hangye === 30">
                    <self-table v-if="selectedName === 'zcbfwf'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmmc"
                            label="项目名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目价值"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="服务内容"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="btPercent"
                            label="费率（%）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="金额（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'flfxgclqd'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.row.xh}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sysCode"
                            label="自定义编号"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="userDefCode"
                            label="编号"
                            min-width="4%"></el-table-column>
                        <el-table-column prop="sysName"
                            label="项目名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目特征"
                            min-width="5%">
                            <template slot-scope="scope">
                                <button class="detail-btn"
                                    @click="showDetail(scope.row.itemName)">查看</button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zyjstkbm"
                            label="主要技术条款编码"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="计量单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="工程数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="bhclzgj"
                            label="包含材料暂估价"
                            min-width="8%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="17%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'qtxm'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.row.itemCode}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="项目名称"
                            min-width="59%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="内容"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zlje'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="50%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="暂列金额（元）"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'clzgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="44%"></el-table-column>
                        <el-table-column prop="xhgg"
                            label="规格型号"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zygczgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="工程名称"
                            min-width="30%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="工程内容"
                            min-width="30%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="计算基数"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'jrg'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="编号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.row.codeText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="名称"
                            min-width="45%"></el-table-column>
                        <el-table-column prop="xhgg"
                            label="型号规格"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                </template>
                <template v-if="hangye === 40">
                    <self-table v-if="selectedName === 'zcbfwf'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="项目名称"
                            min-width="30%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目价值"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="服务内容"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="btPercent"
                            label="费率（%）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="金额（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'flfxgclqd'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.row.xh}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sysCode"
                            label="清单系统码"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="seqCodeText"
                            label="顺序码"
                            min-width="4%"></el-table-column>
                        <el-table-column prop="sysName"
                            label="项目名称"
                            min-width="35%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="项目特征"
                            min-width="5%">
                            <template slot-scope="scope">
                                <button class="detail-btn"
                                    @click="showDetail(scope.row.itemName)">查看</button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zyjstkbm"
                            label="主要技术条款编码"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="计量单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="工程数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="bhclzgj"
                            label="包含材料暂估价"
                            min-width="8%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="17%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'qtxm'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.row.itemCode}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="项目名称"
                            min-width="59%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="内容"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zlje'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="6%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="50%"></el-table-column>
                        <el-table-column prop="dw"
                            label="计量单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="暂列金额（元）"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="20%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'clzgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="4%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="名称"
                            min-width="44%"></el-table-column>
                        <el-table-column prop="xhgg"
                            label="规格型号"
                            min-width="15%"></el-table-column>
                        <el-table-column prop="dw"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="7%"></el-table-column>
                        <el-table-column prop="gcl"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'zygczgj'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="序号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="codeText"
                            label="编码"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="xmmc"
                            label="工程名称"
                            min-width="30%"></el-table-column>
                        <el-table-column prop="gcnr"
                            label="工程内容"
                            min-width="30%"></el-table-column>
                        <el-table-column prop="basePrice"
                            label="计算基数"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                    <self-table v-if="selectedName === 'jrg'"
                        :key="selectedName"
                        class="ztb-table"
                        :data="tableData"
                        :maxRow="17"
                        :rowHeight="0.48">
                        <el-table-column label="编号"
                            min-width="5%">
                            <template slot-scope="scope">
                                {{scope.row.codeText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="itemName"
                            label="名称"
                            min-width="45%"></el-table-column>
                        <el-table-column prop="xhgg"
                            label="型号规格"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="unit"
                            label="单位"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="number"
                            label="数量"
                            min-width="5%"></el-table-column>
                        <el-table-column prop="unitPrice"
                            label="单价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="price"
                            label="合价（元）"
                            min-width="10%"></el-table-column>
                        <el-table-column prop="remark"
                            label="备注"
                            min-width="10%"></el-table-column>
                    </self-table>
                </template>
                <!-- 其他项目  其他-->
                <self-table v-if="selectedName === 'qt'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="4%">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="pxxh"
                        label="排序号"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="xmmc"
                        label="项目名称"
                        min-width="30%"></el-table-column>
                    <el-table-column prop="dw"
                        label="计量单位"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="jsjc"
                        label="计算公式"
                        min-width="30%"></el-table-column>
                    <el-table-column prop="price"
                        label="金额"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="bjPercent"
                        label="费率"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="costKind"
                        label="费用类别"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="10%"></el-table-column>
                </self-table>
                <!-- 工程信息-->
                <!-- 群体工程 招标接口单项工程信息-->
                <!--单体工程 招标接口单项工程信息-->
                <!-- 单体工程 单项工程造价汇总 -->
                <self-table v-if="selectedName === 'gcxx' || selectedName === 'zbjkgc' || selectedName === 'zbjkdxgc' || selectedName === 'zbjkdwgcxx' || selectedName === 'qunti12'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name"
                        label="名称"
                        min-width="45%"></el-table-column>
                    <el-table-column prop="value"
                        label="内容"
                        min-width="50%"></el-table-column>
                </self-table>
                <!-- 群体工程 需评审材料及设备汇总 -->
                <self-table v-if="selectedName === 'psclsbhz'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.xh}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="zbbm"
                        label="招标编码"
                        min-width="4%"></el-table-column>
                    <el-table-column prop="matCode"
                        label="关联材料代码"
                        min-width="7%"></el-table-column>
                    <el-table-column prop="matName"
                        label="材料名称"
                        min-width="20%"></el-table-column>
                    <el-table-column prop="rate"
                        label="材料单价"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="typeSpec"
                        label="型号规格"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="number"
                        label="数量"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="pz"
                        label="品种"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="zldc"
                        label="质量档次"
                        min-width="10%"></el-table-column>
                    <el-table-column prop="cd"
                        label="产地"
                        min-width="10%"></el-table-column>
                    <el-table-column prop="cj"
                        label="厂家"
                        min-width="10%"></el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="10%"></el-table-column>
                </self-table>
                <!--单位工程 分部分项清单-->
                <self-table v-if="selectedName === 'fbfxqd'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.xh}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sysCode"
                        label="项目编码"
                        min-width="7%"></el-table-column>
                    <el-table-column prop="seqCodeText"
                        label="顺序码"
                        min-width="4%"></el-table-column>
                    <el-table-column prop="sysName"
                        label="项目名称"
                        min-width="39%"></el-table-column>
                    <el-table-column label="项目特征"
                        min-width="5%">
                        <template slot-scope="scope">
                            <button class="detail-btn"
                                @click="showDetail(scope.row.itemName)">查看</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit"
                        label="计量单位"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="number"
                        label="工程数量"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="isBHZGJ"
                        label="包含材料暂估价"
                        min-width="8%">
                        <template slot-scope="scope">
                            {{scope.row.isBHZGJ | stringText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="isGLSGFS"
                        label="关联施工方式方法"
                        min-width="8%">
                        <template slot-scope="scope">
                            {{scope.row.isGLSGFS | stringText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="15%"></el-table-column>
                </self-table>
                <!-- 单位工程 总价措施项目 -->
                <self-table v-if="selectedName === 'zjcsxm'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.ord}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemCode"
                        label="项目编码"
                        min-width="8%"></el-table-column>
                    <el-table-column prop="itemName"
                        label="项目名称"
                        min-width="44%"></el-table-column>
                    <el-table-column prop="zbfl"
                        label="费率%"
                        min-width="5%"></el-table-column>
                    <el-table-column prop="basePrice"
                        label="金额（元）"
                        min-width="8%">
                        <template slot-scope="scope">
                            {{scope.row.basePrice}}
                        </template>
                    </el-table-column>
                    <el-table-column label="不可竞争费"
                        min-width="5%">
                        <template slot-scope="scope">
                            {{scope.row.isunCompItem | bolText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="25%"></el-table-column>
                </self-table>
                <!-- 单位工程 单价措施项目 -->
                <self-table v-if="selectedName === 'djcsxm'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.ord}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemCode"
                        label="项目编码"
                        min-width="8%"></el-table-column>
                    <el-table-column prop="itemName"
                        label="项目名称"
                        min-width="53%"></el-table-column>
                    <el-table-column label="项目特征"
                        min-width="5%">
                        <template slot-scope="scope">
                            <button class="detail-btn"
                                @click="showDetail(scope.row.xmtz)">查看</button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="number08"
                        label="数量"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="20%"></el-table-column>
                </self-table>
                <!--单位工程  发包人供应材料和工程设备-->
                <self-table v-if="selectedName === 'fbrclhesb'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.no}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="matName"
                        label="材料（工程设备）名称"
                        min-width="50%"></el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="number"
                        label="数量"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="unitPrice"
                        label="单价（元）"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="jhfs"
                        label="交货方式"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="sddd"
                        label="送达地点"
                        min-width="10%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="15%"></el-table-column>
                </self-table>
                <!-- 单位工程 承包人提供主要材料和工程设备 -->
                <self-table v-if="selectedName === 'cbrclhsb'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.no}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="matName"
                        label="名称、规格、型号"
                        min-width="44%"></el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="number"
                        label="数量"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="fxxs"
                        label="风险系数(%)"
                        min-width="7%">
                    </el-table-column>
                    <el-table-column prop="unitPrice"
                        label="基准单价(元)"
                        min-width="7%">
                    </el-table-column>
                    <el-table-column prop="unitPrice2"
                        label="投标单价(元)"
                        min-width="7%">
                    </el-table-column>
                    <el-table-column prop="fbdj"
                        label="发承包人确认单价(元)"
                        min-width="10%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="10%"></el-table-column>
                </self-table>
                <!-- 单位工程 规费项目 -->
                <self-table v-if="selectedName === 'gfxm'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.bh}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fymc"
                        label="费用名称"
                        min-width="35%"></el-table-column>
                    <el-table-column prop="fysm"
                        label="计算基础"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column prop="basePrice"
                        label="计算基础数值定额人工费"
                        min-width="11%">
                    </el-table-column>
                    <el-table-column prop="fl"
                        label="费率(%)"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="fysz"
                        label="费用数值"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="fysm"
                        label="备注"
                        min-width="20%"></el-table-column>
                </self-table>
                <!-- 单位工程 造价汇总 dataDwZjhz-->
                <self-table v-if="selectedName === 'zjhz'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="6%">
                        <template slot-scope="scope">
                            {{scope.row.ord}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fymc"
                        label="名称"
                        min-width="35%"></el-table-column>
                    <el-table-column prop="bh"
                        label="编码"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="jsjc"
                        label="计算基础"
                        min-width="10%">
                    </el-table-column>
                    <el-table-column prop="fl"
                        label="费率(%)"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="fysz"
                        label="费用数值"
                        min-width="5%">
                        <template slot-scope="scope">
                            {{scope.row.basePrice * scope.row.fl/100}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="fysm"
                        label="备注"
                        min-width="35%"></el-table-column>
                </self-table>
                <!-- 单位工程 工程量清单 -->
                <self-table v-if="selectedName === 'gclqd'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="4%">
                        <template slot-scope="scope">
                            {{scope.row.xh}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="seqCodeText"
                        label="顺序码"
                        min-width="4%"></el-table-column>
                    <el-table-column prop="itemCode"
                        label="项目编码"
                        min-width="7%">
                    </el-table-column>
                    <el-table-column prop="sysCode"
                        label="子目号"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="sysName"
                        label="子目名称"
                        min-width="45%">
                    </el-table-column>
                    <el-table-column prop="zjid"
                        label="所属章节"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="number"
                        label="数量"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="bhclzgj"
                        label="包含材料暂估价"
                        min-width="8%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="12%"></el-table-column>
                </self-table>
                <!-- 单位工程 措施项目清单 -->
                <self-table v-if="selectedName === 'csxmqd'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="5%">
                        <template slot-scope="scope">
                            {{scope.row.ord}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemCode"
                        label="项目编码"
                        min-width="7%">
                    </el-table-column>
                    <el-table-column prop="itemName"
                        label="项目名称"
                        min-width="45%">
                    </el-table-column>
                    <el-table-column prop="zbgcl"
                        label="工程量"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="unit"
                        label="单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="bkjzf"
                        label="不可竞争费"
                        min-width="8%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="15%"></el-table-column>
                </self-table>
                <!-- 单位工程 招标人提供材料价格 -->
                <self-table v-if="selectedName === 'zbrcljg'"
                    :key="selectedName"
                    class="ztb-table"
                    :data="tableData"
                    :maxRow="17"
                    :rowHeight="0.48">
                    <el-table-column label="序号"
                        min-width="5%">
                        <template slot-scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="itemName"
                        label="材料名称"
                        min-width="40%">
                    </el-table-column>
                    <el-table-column prop="spec"
                        label="型号规格"
                        min-width="20%">
                    </el-table-column>
                    <el-table-column prop="unit"
                        label="计量单位"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="price"
                        label="供应价（元）"
                        min-width="5%">
                    </el-table-column>
                    <el-table-column prop="supplyCost"
                        label="供应条件"
                        min-width="10%">
                    </el-table-column>
                    <el-table-column prop="remark"
                        label="备注"
                        min-width="10%"></el-table-column>
                </self-table>
                <div v-if="selectedName === 'tbxz'">
                    {{tableData.fillNeedKnown}}
                </div>
                <div v-if="selectedName === 'zsm'">
                    {{tableData.totalNote}}
                </div>
                <!-- pdf -->
                <!-- 投标承诺书 -->
                <div v-if="selectedName === 'tbcnh'"
                    class="iframe-wrap">
                    <iframe :src="pdfSrc"></iframe>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
// 将获取的树结构数据处理为element tree的格式
function dealTreeData (treeData) {
    let tree = JSON.parse(JSON.stringify(treeData));
    let eTree = [];
    tree.forEach((item, index) => {
        let treeItem = {
            id: item.id,
            label: item.projName,
            pid: item.pid,
            pos: index + 1, // 位置
        };
        if (item.lsPro && item.lsPro.length) {
            treeItem.children = dealTreeData(item.lsPro);
        }
        eTree.push(treeItem);
    });
    return eTree;
}

export default {
    name: 'tbList',
    data () {
        return {
            treeData: [],
            navData: [],
            navSecData: [],
            tableData: [],
            selectedNav: '',
            selectedNavSec: '',
            currentKey: 1, // 当前选中节点
            hangye: null, // 行业类型
            nodeName: '', // 当前选中树结构的节点位置
            selectedName: '', // 当前选中文件名
        };
    },
    filters: {
        stringText: function (value) {
            return value === 'false' ? 'x' : value === 'true' ? '√' : '-';
        },
        bolText: function (value) {
            return value ? 'x' : '√';
        },
    },
    computed: {
        treeDataCopy () {
            const tree = this.treeData || {};
            let treeData = [];
            if (tree.id) {
                treeData = [ tree, ];
                treeData = dealTreeData(treeData);
            }
            return treeData;
        },
        guid () {
            const project = this.$store.state.project || {};
            return project.BidProjGuid || '';
            // return 'baa57908-ee50-4e43-8cb3-e964bdafac78';
        },
    },
    methods: {
        // 点击标签栏
        selectNav (item) {
            console.log('label', item);
            if (this.selectedNav !== item.yeqian_key) {
                this.selectedNav = item.yeqian_key;
                this.selectedName = item.yeqian_key;
                let parameter = '';
                if (item.yeqian_key === 'tbcnh') {
                    parameter = encodeURIComponent('download.php?name=TBH.pdf' + '&guid=' + this.guid + '&type=1');
                    this.pdfSrc = this.$store.state.pdfHttp + parameter;
                    return;
                }
                if (item.yeqian_key === 'qtxm') {
                    // 其他项目显示二级标签栏
                    this.navSecData = item.yeqianList || [];
                    this.selectedNavSec = '';
                } else {
                    this.navSecData = [];
                }
                this.getTable();
            }
        },
        // 点击二级标签栏
        selectNavSec (item) {
            if (this.selectedNavSec !== item.yeqian_key) {
                this.selectedNavSec = item.yeqian_key;
                this.selectedName = item.yeqian_key;
                this.getTable();
            }
        },
        renderTreeContent (h, { node, data, store, }) {
            // console.log(node);
            if (node.isLeaf) {
                return (
                    <span class="custom-tree-node">
                        <img class="node-img" src="../../../static/img/tree/tree-3.png" />
                        <span class="node-text">{node.label}</span>
                    </span>
                );
            } else {
                if (node.expanded) {
                    return (
                        <span class="custom-tree-node">
                            <img class="node-img" src="../../../img/tree/tree-2.png" />
                            <span class="node-text">{node.label}</span>
                        </span>
                    );
                } else {
                    return (
                        <span class="custom-tree-node">
                            <img class="node-img" src="../../../static/img/tree/tree-1.png" />
                            <span class="node-text">{node.label}</span>
                        </span>
                    );
                }
            }
        },
        // 点击树节点
        clickNode (data, node) {
            // console.log(data, node);
            this.navSecData = [];
            let suffix = '';
            let pData = node;
            for (let i = 0; i < node.level - 1; i++) {
                pData = pData.parent;
                suffix += `${pData.data.pos}-`;
            }
            this.nodeName = suffix + data.pos;
            data.level = node.level;
            this.getNav(data);
        },
        getData () {
            this.getTree();
        },
        // 获取左侧树结构
        async getTree () {
            const res = await this.portService.getListTree(this.guid);
            // console.log('projTree', res);
            if (res.hangye) {
                this.hangye = res.hangye;
            }
            this.treeData = res;
            if (this.treeData.id) {
                this.nodeName = '1';
                this.treeData.level = 1;
                this.getNav(this.treeData);
            }
        },
        // 获取相应数据标签
        async getNav (data) {
            // console.log(data);
            let name = `1_${this.hangye}_${data.level}.json`;
            const res = await this.portService.getListNav(name);
            // console.log('nav', res);
            let list = (res[0] && (res[0].yeQianList || [])) || [];
            let navData = [];
            for (let item of list) {
                if (item.is_show && item.yeqian_key !== 'baobiao' && item.yeqian_key !== 'tbh') {
                    navData.push(item);
                }
            }
            this.navData = navData;
            this.selectedNav = '';
            this.selectedName = '';
            for (let item of this.navData) {
                if (item.is_show) {
                    this.selectedNav = item.yeqian_key;
                    this.selectedName = item.yeqian_key;
                    this.getTable();
                    break;
                }
            }
        },
        // 点击标签获取列表数据
        async getTable () {
            this.tableData = [];
            // console.log(data);
            const res = await this.portService.getListTable(this.guid, `${this.selectedName}.json`, this.nodeName);
            // console.log('table', res);
            if (Array.isArray(res)) {
                this.tableData = res;
            } else if (typeof res === 'object') {
                // 对象类型数据
                this.dealObjectData(res);
            } else {
                this.tableData = [];
            }
        },
        dealObjectData (object) {
            if (this.selectedName === 'gcxx') {
                let table = [
                    { name: '招标编号', value: object.zbbh, },
                    { name: '标段', value: object.bdmc, },
                    { name: '项目名称', value: object.xmmc, },
                    { name: '招标人', value: object.inviteBid, },
                    { name: '法定代表人', value: object.legalRepre, },
                    { name: '编制单位', value: object.agent, },
                ];
                if (object.projName) {
                    if (this.hangye === 30 || this.hangye === 40) {
                        table = table.concat([
                            { name: '工程名称', value: object.projName, },
                            { name: '序列号', value: object.xlh, },
                            { name: '合同编号', value: object.htbh, },
                        ]);
                    } else {
                        table = table.concat([
                            { name: '工程名称', value: object.projName, },
                            { name: '序列号', value: object.xlh, },
                        ]);
                    }
                } else {
                    if (this.hangye === 30 || this.hangye === 40) {
                        table = table.concat([
                            { name: '序列号', value: object.xlh, },
                            { name: '合同编号', value: object.htbh, },
                        ]);
                    } else {
                        table = table.concat([
                            { name: '序列号', value: object.xlh, },
                        ]);
                    }
                }
                this.tableData = table;
            } else if (this.selectedName === 'tbxz' || this.selectedName === 'zsm') {
                this.tableData = object;
            }
        },
        // 点击查看
        showDetail (content) {
            this.$confirm(content || '无', '提示', {
                customClass: 'dy-msg-box',
                confirmButtonClass: 'el-button--success',
                showCancelButton: false,
            }).catch(() => { });
        },
    },
    mounted () {
        this.getData();
    },
};
</script>

<style lang="scss" scoped>
    $asideWidth: 3rem;
    .ztb-list-main {
        display: flex;

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
                                    content: "";
                                    position: absolute;
                                    top: 0;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    width: 0;
                                    height: 0;
                                    border: 0.07rem solid;
                                    border-color: $colorActive transparent
                                        transparent transparent;
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

        .detail-btn {
            @include hollow-btn;
            padding: 0 0.1rem;
            height: 0.3rem;
            font-size: $fontXS;
        }
    }

    /deep/ .ztb-list-nav {
        // 更改默认树样式
        .el-tree {
            background-color: transparent;
        }
        .el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content {
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
