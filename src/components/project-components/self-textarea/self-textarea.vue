<template>
    <div>
        <el-input ref="field" type="textarea" :placeholder="placeholder"
                  v-model="inputTextCopy" :rows="rows" @click.native="fieldClick">
        </el-input>
        <prompt-modal :modal.sync="modal" :value.sync="modalText" :rows="modalRows" :title="modalTitle"
                      @close="modalClose" :placeholder="placeholder" @confirm="confirm">
        </prompt-modal>
    </div>
</template>

<script>
import promptModal from '@/components/project-components/prompt-modal/prompt-modal';

export default {
    name: 'self-textarea',
    components: {
        promptModal,
    },
    props: {
        // 输入框文字
        value: {
            required: true,
        },
        // textarea文字行数
        rows: {
            default: 5,
        },
        // 模态框标题
        modalTitle: {
            default: ' ',
        },
        placeholder: {
            default: '请输入内容',
        },
        // 模态框textarea文字行数
        modalRows: {
            default: 7,
        },
    },
    computed: {
        inputTextCopy: {
            get () {
                return this.value;
            },
            set (newValue) {
                this.$emit('update:value', newValue);
            },
        },
    },
    data () {
        return {
            modal: false,
            modalText: '',
        };
    },
    methods: {
        fieldClick () {
            this.$refs.field.blur();
            this.modalText = this.inputTextCopy;
            this.modal = true;
        },
        modalClose () {
            this.inputTextCopy = this.modalText;
        },
        confirm () {
            this.inputTextCopy = this.modalText;
            this.modal = false;
        },
    },
};
</script>

<style scoped>

</style>
