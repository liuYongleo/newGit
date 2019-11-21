export default {
    // 保证金提交情况
    depositStatus (value) {
        return value ? '已提交' : '未提交';
    },

    // 空值转换为字符（默认是字符 - ）
    empty (value, symbol = '-') {
        return (value == null || value === '') ? symbol : value;
    },

    // 从中文名字取出姓
    xing (name) {
        if (/^[\u4e00-\u9fa5]+$/.test(name)) {
            // 名字为全中文则返回姓
            return name.slice(0, 1);
        } else {
            return name || '';
        }
    },

};
