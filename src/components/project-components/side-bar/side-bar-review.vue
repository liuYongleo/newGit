<template>
    <div :style="{ width: containerWidth }" class="review-wrap">
        <div class="review" v-if="$store.state.flowDataPicker.length" :class="{'height-all': $store.state.reviewWinState !== 1}">
            <!--推荐组长-->
            <review-elect-leader v-if="$store.state.reviewStep === 1" @close="close" @showPicker="showPicker">
            </review-elect-leader>
            <!--价格评审-->
            <review-price v-else-if="$store.state.reviewStep === $store.state.flowDataPicker.length - 2" @close="close"
                @showPicker="showPicker">
            </review-price>
            <!--评审汇总-->
            <review-summary v-else-if="$store.state.reviewStep === $store.state.flowDataPicker.length - 1" @close="close"
                @showPicker="showPicker">
            </review-summary>
            <!--评标报告-->
            <review-report v-else-if="$store.state.reviewStep === $store.state.flowDataPicker.length" @close="close"
                            @showPicker="showPicker">
            </review-report>
            <template v-else>
                <!--定性评审-->
                <review-dx v-if="$store.state.flowDataPicker[$store.state.reviewStep - 1].FlowPSType === 1"
                    :title="$store.state.flowDataPicker[$store.state.reviewStep - 1].FlowName" @close="close"
                    @showPicker="showPicker"></review-dx>
                <!--定量评审-->
                <review-dl v-if="$store.state.flowDataPicker[$store.state.reviewStep - 1].FlowPSType === 2"
                    :title="$store.state.flowDataPicker[$store.state.reviewStep - 1].FlowName" @close="close"
                    @showPicker="showPicker"></review-dl>
            </template>
            <!-- 评审选择框 -->
            <div class="reivew-picker">
                <van-picker v-show="pickerVisible" show-toolbar title="流程选择" :columns="reviewFlow"
                    :default-index="$store.state.reviewStep - 1" :item-height="0.44 * $store.state.rem"
                    @cancel="onCancel" @confirm="onConfirm" />
            </div>
        </div>
    </div>
</template>

<script>
import reviewElectLeader from '@/components/project-components/side-bar/side-bar-review/review-elect-leader';
import reviewPrice from '@/components/project-components/side-bar/side-bar-review/review-price';
import reviewSummary from '@/components/project-components/side-bar/side-bar-review/review-summary';
import reviewReport from '@/components/project-components/side-bar/side-bar-review/review-Report';
import reviewDx from '@/components/project-components/side-bar/side-bar-review/review-dx';
import reviewDl from '@/components/project-components/side-bar/side-bar-review/review-dl';

export default {
    name: 'side-bar-review',
    components: {
        reviewElectLeader,
        reviewPrice,
        reviewSummary,
        reviewReport,
        reviewDx,
        reviewDl,
    },
    computed: {
        containerWidth () {
            // if ([ this.$store.state.flowData.length - 2, ].indexOf(this.$store.state.reviewStep) !== -1) {
            //     return '6.3rem';
            // } else {
            //     return '6.3rem';
            // }
            if (this.$store.state.reviewWinState === 1) {
                return '6.3rem';
            } else if (this.$store.state.reviewWinState === 2) {
                return '9.6rem';
            } else if (this.$store.state.reviewWinState === 3) {
                return '18.45rem';
            }
        },
        reviewFlow () {
            let data = this.$store.state.flowDataPicker.map((item, index) => {
                return index + 1 + '.' + item.FlowName;
            });
            return data;
        },
    },
    data () {
        return {
            currStepIndex: 1, // 1: 选择否决单位; 2: 响应否决投标; 3: 查看否决结果;
            pickerVisible: false,
        };
    },
    methods: {
        close () {
            this.$store.commit('save', { path: 'selectedMenu', data: 0, });
        },
        // 显示评审选择框
        showPicker () {
            this.pickerVisible = true;
        },
        onCancel () {
            this.pickerVisible = false;
        },
        // 选择流程框确定
        async onConfirm (value, index) {
            let flag = {Result: true, };
            if (index !== 0 && (index !== this.$store.state.flowDataPicker.length - 1) && this.$store.state.reviewStep !== index + 1) {
                const res = await this.portService.checkCanGoFlow(this.$store.state.flowDataPicker[index].FlowName);
                flag = res.data.value;
            }
            if (flag.Result) {
                this.pickerVisible = false;
                this.$store.commit('save', { path: 'reviewStep', data: index + 1, });
                this.reviewJump(this.$store.state.flowDataPicker[index]);
            } else {
                this.flowBtnAlert(flag.ResultMessage);
            }
        },
    },
};
</script>

<style scoped lang="scss">
    // 居中
    .review-wrap {
        display: flex;
        align-items: center;
    }
    .review {
        position: absolute;
        overflow: hidden;
        // bottom: 0;
        width: inherit;
        background-color: #fff;
        border-radius: 0 0.05rem 0 0;
        box-shadow: 2px 0 4px 0 #cbcbcb;

        &.height-all {
            height: 100%;
        }

        .reivew-picker {
            position: absolute;
            top: 0.8rem;
            left: 0.2rem;
            width: 3.2rem;
            box-shadow: 0 0 4px 0 #cbcbcb;
        }

        /deep/ .reivew-picker {
            .van-picker__cancel,
            .van-picker__confirm {
                color: #333;
                font-size: $fontM;
            }

            .van-picker__toolbar {
                background-color: #ededed;
                height: 0.44rem;
                line-height: 0.44rem;
            }

            .van-picker__title {
                color: #999;
                font-size: $fontM;
            }

            .van-picker-column__item {
                font-size: $fontM;
            }

            .van-picker__mask {
                background-image: linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.99),
                        rgba(255, 255, 255, 0.5)
                    ),
                    linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.99),
                        rgba(255, 255, 255, 0.5)
                    );
            }
        }
    }
</style>
