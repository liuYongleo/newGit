<template>
    <div class="pdf-page-wrap">
        <iframe
            src="http://xepb.jiaoyi365.com/xe-file-nginx/viewer.html?file=download.php%3Fname%3D28ea955b-2ab4-4f04-8fcd-9498d4eaf0ca.PDF%26guid%3D28ea955b-2ab4-4f04-8fcd-9498d4eaf0ca%26type%3D1">
        </iframe>
        <companySelect></companySelect>
    </div>

</template>

<script>
import companySelect from '@/components/project-components/company-select/company-select';

export default {
    name: 'tbmb',
    components: {
        companySelect,
    },
};
</script>

<style scoped lang="scss">
    .pdf-page-wrap {
        padding-bottom: $companySelectHeight;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
</style>
