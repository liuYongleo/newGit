<template>
    <div>
        <slot>
            <div class="select-field" @click="showPicker=true">
                {{selectedItem.text}}
            </div>
        </slot>
        <van-popup v-model="showPicker" position="bottom" :style="{ height: '40%' }">
            <van-picker ref="vanPiker"
                        show-toolbar
                        :columns="options"
                        :default-index="selectedIndex"
                        @cancel="onCancel"
                        @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'self-select',
    props: {
        options: {
            type: Array,
            require: true,
        },
        selectedValue: {
            default: 0,
        },
    },
    model: {
        prop: 'selectedValue', // 当前选中项的value
        event: 'setModel',
    },
    data () {
        return {
            showPicker: false,
        };
    },
    computed: {
        // 当前选中项的索引
        selectedIndex () {
            return this.options.map(item => item.value).indexOf(this.selectedValue);
        },
        // 当前选中项
        selectedItem () {
            return this.options[this.selectedIndex];
        },

    },
    methods: {
        onConfirm (optionItem, index) {
            this.showPicker = false;
            this.$emit('setModel', optionItem.value);
            this.$emit('change', optionItem.value, optionItem, index);
        },
        onCancel () {
            this.showPicker = false;
        },
    },
};
</script>

<style scoped lang="scss">
    .select-field {
        position: relative;
        display: inline-block;
        min-width: 2.22rem;
        height: 0.52rem;
        padding-left: 0.1rem;
        padding-right: 0.5rem;
        border: solid 1px #d0d0d0;

        &:after {
            content: '';
            position: absolute;
            display: inline-block;
            border-left: solid 0.08rem transparent;
            border-right: solid 0.08rem transparent;
            border-top: solid 0.11rem #666;
            border-bottom: solid 0 transparent;
            right: 0.15rem;
            top: 50%;
            transform: translate(0, -50%);
        }
    }

    /deep/ .van-picker__toolbar {
        padding-left: 3%;
        padding-right: 3%;
    }

    /deep/ .van-picker__cancel {
        font-size: 0.34rem;
        color: #6f6f6f;
    }

    /deep/ .van-picker__confirm {
        font-size: 0.34rem;
        color: $green;
    }

    /deep/ .van-picker-column__item {
        font-size: 0.34rem;
        color: #333;
    }
</style>
