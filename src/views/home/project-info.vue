<template>
    <div>
        <h3>
            项目信息
        </h3>
        <div class="content-box">
            <self-table
                :data="tableData"
                border>
                <el-table-column
                    label="序号"
                    :width="$store.state.indexCellWidth">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="projectName"
                    label="投标人名称">
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="保证金交付金额（元）">
                </el-table-column>
            </self-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'project-info',
    data () {
        return {
            tableData: [
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
                {
                    projectName: '银河集会',
                    content: '银河贸易市场',
                },
            ],
        };
    },
    methods: {
        indexMethod (index) {
            return index * 2;
        },
    },
};
</script>

<style scoped>

</style>
