<template>
    <div>
        <h3>
            查看补遗与答疑文件
        </h3>
        <h4>
            补遗文件
        </h4>
        <div class="content-box">
            <self-table
                :data="addendumTable">
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="file"
                    label="文件名">
                    <template slot-scope="scope">
                        <a :href="scope.row.URL">
                            <span>{{scope.row.FILE_NAME}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="发布时间">
                    <template slot-scope="scope">
                        {{scope.row.FILE_UPLOADTIME}}
                    </template>
                </el-table-column>
            </self-table>
        </div>
        <h4>
            主动澄清
        </h4>
        <div class="content-box">
            <self-table
                :data="activelyClarifyTable">
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BIAOTI"
                    label="主动澄清标题">
                </el-table-column>
                <el-table-column
                    prop="NEIRONG"
                    label="主动澄清内容">
                </el-table-column>
                <el-table-column
                    prop="WENJIANNAME"
                    label="文件名">
                    <template slot-scope="scope">
                        <a :href="scope.row.WENJIAN_URL">
                            <span>{{scope.row.WENJIANNAME}}</span>
                        </a>
                    </template>
                </el-table-column>
            </self-table>
        </div>
        <h4>
            问题澄清回复
        </h4>
        <div class="content-box">
            <self-table
                :data="questionAnswerTable">
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="BIAOTI"
                    label="澄清问题标题">
                </el-table-column>
                <el-table-column
                    prop="NEIRONG"
                    label="澄清问题内容">
                </el-table-column>
                <el-table-column
                    label="澄清问题文件">
                    <template slot-scope="scope">
                        <a :href="scope.row.WENJIAN_URL">
                            <span>{{scope.row.WENJIANNAME}}</span>
                        </a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="DAFUTITLE"
                    label="澄清回复标题">
                </el-table-column>
                <el-table-column
                    prop="DAFUCONTENT"
                    label="澄清回复内容">
                </el-table-column>
                <el-table-column
                    label="澄清回复文件">
                    <template slot-scope="scope">
                        <a :href="scope.row.DAFUWENJIAN_URL">
                            <span>{{scope.row.DAFUWENJIANNAME}}</span>
                        </a>
                    </template>
                </el-table-column>

            </self-table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'aq-file',
    data () {
        return {
            // 补遗表格
            addendumTable: [
                {
                    file: 'ff00421x-file',
                    time: '2999-11-14',
                },
                {
                    file: 'ff00001x-file',
                    time: '1997-05-14',
                },
                {
                    file: 'ff00004x-file',
                    time: '1997-09-14',
                },
            ],

            // 主动澄清表格
            activelyClarifyTable: [],

            // 问题澄清回复
            questionAnswerTable: [],

        };
    },
    created () {
        this.getAQList();
        this.getClarifyList();
        this.getQuestionAnswerList();
    },
    methods: {
        // 获取补遗列表
        async getAQList () {
            let res = await this.portService.getAQList();
            this.addendumTable = res.data.value;
            // console.log('获取补遗列表', res);
        },

        // 获取主动澄清列表
        async getClarifyList () {
            let res = await this.portService.getClarifyList();
            this.activelyClarifyTable = res.data.value;
            // console.log('获取主动澄清列表', res);
        },

        // 获取问题澄清回复列表
        async getQuestionAnswerList () {
            let res = await this.portService.getQuestionAnswerList();
            this.questionAnswerTable = res.data.value;
            console.log('获取问题澄清回复列表', res);
        },
    },
};
</script>

<style scoped>

</style>
