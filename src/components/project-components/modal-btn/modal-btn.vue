<template>
    <div>
        <button class="qualify-btn"
            :class="{'active': checked === 0}"
            :disabled="disabled"
            @click="reviewCompany">
            不合格
        </button>
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
    name: 'modal-btn',
    components: {
        promptModal,
    },
    props: {
        value: {
            required: true,
        },
        checked: {
            required: true,
        },
        // 点击数据index
        dataIndex: {
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
        // 是否可选
        disabled: {
            default: false,
        },
        // 是否可编辑
        formEditable: {
            default: true,
        },
    },
    watch: {
        modal (value) {
            if (value) {
                if (!this.formEditable) {
                    this.modal = false;
                    this.alertCanNotEdit();
                } else {
                    this.modalText = this.value;
                }
            }
        },
    },
    data () {
        return {
            modal: false,
            modalText: '',
        };
    },
    methods: {
        reviewCompany () {
            this.modal = true;
        },
        confirm () {
            const data = {
                checked: 0,
                reason: this.modalText,
            };
            if (data.reason && data.reason !== '') {
                // console.log(data.reason);
                this.modal = false;
                this.$emit('confirm', this.dataIndex, data);
            } else {
                this.alert({content: '请填写不合格理由！', });
            }
        },
    },
};
</script>

<style scoped lang="scss">
    .qxx-review-modal .qualify-btn:first-child {
        margin-right: 0;
    }
</style>
