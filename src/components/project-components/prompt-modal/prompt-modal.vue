<template>
    <el-dialog
        :visible.sync="modalCopy"
        :close-on-click-modal="false"
        append-to-body
        width="40%">
        <modal-main @close="close">
            <template slot="title">
                <div><slot name="title">{{title}}</slot></div>
            </template>
            <div slot="content" class="prompt-modal-content">
                <el-input ref="textarea" type="textarea" :placeholder="placeholder"
                          v-model="textareaValueCopy" :rows="rows" @keydown.native.enter="enterKeyDown">
                </el-input>
            </div>
            <div slot="footer" class="footer">
                <button class="ft-btn"
                    @click="confirm">确定</button>
            </div>
        </modal-main>
    </el-dialog>
</template>

<script>
import modalMain from '@/components/project-components/modal-main/modal-main';

export default {
    name: 'prompt-modal',
    props: {
        // 模态框visible
        modal: {
            required: true,
            type: Boolean,
        },
        // 输入框文字
        value: {
            required: true,
        },
        // 标题
        title: {
            default: ' ',
        },
        placeholder: {
            default: '请输入内容',
        },
        // textarea文字行数
        rows: {
            default: 7,
        },

    },
    data () {
        return {
            dialogVisible: true,
        };
    },
    components: {
        modalMain,
    },
    computed: {
        modalCopy: {
            get () {
                return this.modal;
            },
            set (value) {
                this.$emit('update:modal', value);
            },
        },
        textareaValueCopy: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('update:value', value);
            },
        },
    },
    watch: {
        modal (value) {
            if (value) {
                this.$nextTick(() => {
                    this.$refs.textarea.focus();
                });
            }
        },
    },
    mounted () {

    },
    methods: {
        close () {
            this.modalCopy = false;
            this.$emit('close');
        },
        enterKeyDown () {
            // this.close();
        },
        confirm () {
            this.$emit('confirm');
        },
    },
};
</script>

<style scoped lang="scss">
    /deep/ .el-dialog__header {
        display: none !important;
    }

    /deep/ .el-dialog__body {
        padding: 0;
    }

    .prompt-modal-content {
        padding-bottom: 0.24rem;
    }

</style>
