<template>
    <div>
        <el-input ref="field" :placeholder="placeholder"
                  v-model="inputTextCopy" @click.native="fieldClick">
        </el-input>
        <prompt-modal :modal.sync="modal" :value.sync="modalText" :rows="modalRows" :title="modalTitle"
                      @close="modalClose" :placeholder="placeholder">
        </prompt-modal>
    </div>
</template>

<script>
import promptModal from '@/components/project-components/prompt-modal/prompt-modal';

export default {
    name: 'modal-input',
    components: {
        promptModal,
    },
    props: {
        // 输入框文字
        value: {
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
    },
};
</script>

<style scoped>

</style>
