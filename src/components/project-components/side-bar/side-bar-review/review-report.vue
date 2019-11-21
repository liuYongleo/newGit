<template>
    <div class="elect-leader"
         :class="[$store.state.barPosition]">
        <review-main :title="'评标报告'"
                     v-bind="$attrs"
                     v-on="$listeners">
            <template slot="content">
                <div style="height: 400px;">
                    pppp
                </div>
            </template>
        </review-main>
    </div>
</template>

<script>
import reviewMain from '@/components/project-components/side-bar/side-bar-review/review-main';

export default {
    name: 'review-report',
    components: {
        reviewMain,
    },
};
</script>

<style scoped>

</style>
