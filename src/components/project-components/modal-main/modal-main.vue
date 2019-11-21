<!--模态框的样式模板，用于封装模态框-->
<template>
    <div class="modal-main">
        <div class="modal-header">
            <slot name="title">
                {{title}}
            </slot>
            <i class="close-icon iconfont icon-fork" @click="close"></i>
        </div>
        <div class="modal-content">
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-main',
    props: {
        title: {
            default: ' ',
        },
    },
    methods: {
        close () {
            this.$emit('close');
        },
    },
};
</script>

<style scoped lang="scss">
    .modal-main {
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.21rem;
            line-height: 1;
            font-size: 0.26rem;
            color: #fff;
            background-color: $green;

            .close-icon {
                font-size: 0.25rem;
            }
        }

        .modal-content {
            background-color: #fff;
            padding: 0.17rem 0.15rem 0 0.15rem;
            line-height: 1;
            font-size: $fontM;

            .footer {
                text-align: center;
                padding: 0 0 0.2rem;

                .ft-btn {
                    @include hollow-btn;
                    padding-left: 0.6rem;
                    padding-right: 0.6rem;

                    &:active {
                        background-color: $colorActive;
                        color: #fff;
                    }
                }
            }
        }

        .modal-form {
            padding: 0.06rem 0.1rem;
            background-color: #f2f2f2;

            .form-item {
                display: flex;
                padding: 0.13rem 0;

                .form-item-label {
                    width: 1.25rem;
                    padding-right: 0.15rem;
                    text-align: right;
                }

                .form-item-content {
                    flex-grow: 1;
                    color: #999;
                }

                &.them-text {
                    padding: 0.13rem 0;

                    .form-item-content {
                        color: #999;
                    }
                }
            }
        }
    }
</style>
