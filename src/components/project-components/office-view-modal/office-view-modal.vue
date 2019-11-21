<!--查看office文件-->
<!--微软api https://www.microsoft.com/en-us/microsoft-365/blog/2013/04/10/office-web-viewer-view-office-documents-in-a-browser/?eu=true-->
<!--注意，这个地址必须为域名，不可为ip,否则无法提取。-->

<template>
    <el-dialog
        class="user-edit-modal"
        :visible.sync="modal"
        :close-on-click-modal="false"
        append-to-body>
        <modal-main @close="close" title="文件名.sadsaasd23eere">
            <div slot="content" class="iframe-wrap">
<!--                <iframe-->
<!--                    src='https://view.officeapps.live.com/op/view.aspx?src=http://xefile.jiaoyi365.com/downloadFile?fileId=00b304fe-b3a3-45a0-8f83-d5eb991ffe1f'></iframe>-->
                <iframe
                    src='http://xepb.jiaoyi365.com/xe-file-nginx/viewer.html?file=download.php%3Fname%3D28ea955b-2ab4-4f04-8fcd-9498d4eaf0ca.PDF%26guid%3D28ea955b-2ab4-4f04-8fcd-9498d4eaf0ca%26type%3D1'></iframe>
            </div>
        </modal-main>
    </el-dialog>
</template>


<script>
import modalMain from '@/components/project-components/modal-main/modal-main';

export default {
    name: 'office-view-modal',
    components: {
        modalMain,
    },
    computed: {
        modal: {
            get () {
                return this.$store.state.officeViewModalShow;
            },
            set (value) {
                this.$store.commit('save', {
                    path: 'officeViewModalShow',
                    data: value,
                });
            },
        },
    },
    methods: {
        close: function () {
            this.modal = false;
        },
    },
};
</script>

<style scoped lang="scss">
    .user-edit-modal {
        /deep/ .el-dialog {
            margin: 0 0 0 $sideBarWidth/2 !important;
            width: 90% !important;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        /deep/ .el-dialog__header {
            display: none !important;
        }

        /deep/ .el-dialog__body {
            padding: 0;
        }

        /deep/ .modal-content {
            padding: 0;
            height: 85vh;

            .iframe-wrap {
                width: 100%;
                height: 100%;

                iframe {
                    width: 100%;
                    height: 100%;
                }
            }

        }

    }


</style>
