<template>
    <div>
        <el-switch class="project-switch"
            :value="value"
            active-color="#00bb8e"
            active-text="是"
            inactive-text="否"
            :disabled="disabled"
            :width="0.85 * $store.state.rem"
            @change="change">
        </el-switch>
        <prompt-modal :modal.sync="modal"
            :value.sync="modalText"
            :rows="modalRows"
            :title="modalTitle"
            :placeholder="placeholder"
            @confirm="confirm">
        </prompt-modal>
    </div>
</template>

<script>
import promptModal from '@/components/project-components/prompt-modal/prompt-modal';

export default {
    name: 'modal-switch',
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
        // 是否可改
        disabled: {
            default: false,
        },
        // 选中index
        dataIndex: {
            required: true,
        },
        // 是否可编辑
        formEditable: {
            defalut: true,
        },
        // 只有组长可以编辑
        onlyLeader: {
            defalut: false,
        },
    },
    data () {
        return {
            modal: false,
            modalText: '',
        };
    },
    methods: {
        change (value) {
            if (!this.formEditable) {
                this.modal = false;
                this.alertCanNotEdit();
            } else {
                if (this.onlyLeader) {
                    if (!this.$store.state.isLeader) {
                        return this.alertOnlyLeader();
                    }
                }
                if (value) {
                    this.modalText = this.inputTextCopy;
                    this.modal = true;
                } else {
                    const data = {
                        checked: value,
                        reason: '',
                        dataIndex: this.dataIndex,
                    };
                    this.$emit('confirm', data);
                }
            }
        },
        confirm () {
            const data = {
                checked: true,
                reason: this.modalText,
                dataIndex: this.dataIndex,
            };
            if (data.reason && data.reason !== '') {
                // console.log(data.reason);
                this.modal = false;
                this.$emit('confirm', data);
            } else {
                this.alert({content: '请填写废标理由！', });
            }
        },
    },
};
</script>

<style scoped>
</style>
