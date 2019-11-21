import commonFilter from '@/assets/js/filters/zl-filter/zl-filter';

export default {
    numFixed (num, len = 2) {
        let pow = Math.pow(10, len);
        return Math.round(num * pow) / pow;
    },


};
