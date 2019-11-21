<template>
    <div class="flow"
        :class="[$store.state.barPosition]">
        <i class="el-icon-close side-bar-close-icon" :class="[$store.state.barPosition]" @click="closeBar"></i>
        <ul class="flow-list">
            <li class="flow-item"
                :class="[item.EvalStatus_Flow === 4 ? 'active' : item.EvalStatus_Flow === 2 ? 'done' : '']"
                v-for="(item, index) in $store.state.flowData"
                :key="index"
                @click="selectFlow(item, index)">
                <div class="flow-num-wrap"><span class="flow-num">{{index+1}}</span></div>
                <div class="flow-data">
                    <p class="flow-title">{{item.FlowName}}</p>
                    <p class="flow-state">{{item.EvalStatus_Flow | stateText}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'side-bar-flow',
    filters: {
        stateText: function (state) {
            const stateText = [ '未开始', '未开始', '已完成', '跳过评审', '正在进行', ];
            return stateText[state];
        },
    },
    methods: {
        // 选择流程
        selectFlow (item, index) {
            this.$emit('selectFlow', item, index);
        },
        closeBar () {
            this.$emit('closeBar');
        },
    },
};
</script>

<style lang="scss" scoped>
    $flowNumSize: 0.48rem;
    $flowNumWrapWidth: 0.85rem;

    .flow {
        background-color: $flowBgColor;
        width: $flowWidth;
        height: 100%;
        overflow: auto;
        box-shadow: 0 -2px 4px 0 #cbcbcb;

        .el-icon-close {
            z-index: 1;
        }
    }

    .flow-list {
        margin: 0.6rem 0 0;
    }

    .flow-item {
        position: relative;
        display: flex;
        padding-bottom: 0.7rem;

        &::after {
            content: '';
            position: absolute;
            left: $flowNumWrapWidth / 2;
            height: 100%;
            width: 0.02rem;
            background-color: #e9e9e9;
        }

        &:last-child::after {
            display: none;
        }

        &.done {
            .flow-num {
                background-color: #fff;
                border: 2px solid $colorActive;
                color: $colorActive;
            }

            .flow-title {
                color: #333;
                font-weight: 700;
            }

            .flow-state {
                color: inherit;
            }

            &::after {
                background-color: $colorActive;
            }
        }

        &.active {
            .flow-num {
                background-color: $colorActive;
            }
            .flow-title {
                color: $colorActive;
                font-weight: 700;
            }
            .flow-state {
                color: $colorActive;
            }
        }

        .flow-num-wrap {
            width: $flowNumWrapWidth;
            z-index: 1;
        }

        .flow-num {
            display: block;
            margin: 0 auto;
            width: $flowNumSize;
            height: $flowNumSize;
            line-height: $flowNumSize;
            background-color: #c7c7c7;
            color: #fff;
            font-size: $fontXL;
            text-align: center;
            border-radius: 50%;
        }

        .flow-data {
            flex: 1;
            padding-right: 0.15rem;
        }

        .flow-title {
            font-size: $fontL;
            color: #9b9b9b;
            margin-bottom: 0.08rem;
        }

        .flow-state {
            font-size: $fontS;
            color: #c3cac8;
        }
    }
</style>
