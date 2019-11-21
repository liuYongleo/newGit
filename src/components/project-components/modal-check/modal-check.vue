<template>
    <div>
        <el-checkbox class="dy-check"
            :checked="value"
            @change="checkChange"></el-checkbox>
        <prompt-modal :modal.sync="modal"
            :value.sync="modalText"
            :rows="modalRows"
            :title="modalTitle"
            @close="modalClose"
            :placeholder="placeholder">
        </prompt-modal>
    </div>
</template>

<script>
import promptModal from '@/components/project-components/prompt-modal/prompt-modal';

export default {
    name: 'modal-check',
    components: {
        promptModal,
    },
    props: {
        value: {
            required: true,
        },
        // 输入框文字
        inputValue: {
            required: true,
        },
        // 模态框标题
        modalTitle: {
            default: '',
        },
        placeholder: {
            default: '',
        },
        // 模态框textarea文字行数
        modalRows: {
            default: 7,
        },
    },
    computed: {
        inputTextCopy: {
            get () {
                return this.inputValue;
            },
            set (newValue) {
                this.$emit('update:inputValue', newValue);
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
        checkChange (value) {
            if (value) {
                this.modalText = this.inputTextCopy;
                this.modal = true;
            } else {
                this.$emit('update:inputValue', '');
                this.modal = false;
            }
        },
        modalClose () {
            this.inputTextCopy = this.modalText;
        },
    },
};
</script>

<style scoped>
</style>
