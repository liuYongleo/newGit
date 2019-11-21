export default {

    /* 时间转换为日期格式
    *  value参数接受的格式: 时间戳/时间戳的字符串/能new Date() 的字符串
    *  时间格式与fmt的格式一致，
    *  eg：value=1562846957309  fmt='yyyy-MM-dd hh:mm:ss'  输出: '2019-07-11 20:09:17'
    *  eg：value='2019-07-11'   fmt='MM月dd日 hh时mm分ss秒'
    *  输出: '07月11日 08时00分00秒' （因为本地时区为UTC-8,所以这里为08时00分00秒）
    */
    date: function (value, fmt) {
        if (!value) {
            return '';
        }

        let date;
        function padLeftZero (str) {
            return ('00' + str).substr(str.length);
        }
        // 判断传入的参数类型: Date 对象/时间戳/日期格式的字符串
        if (value instanceof Date) {
            date = new Date(value);
        } else if (/^-?\d+$/.test(value + '')) {
            // 匹配数字（正数或负数）
            date = new Date(value - 0);
        } else {
            value = value.replace(/-/g, '/');
            date = new Date(value);
            if (!new Date(value).getTime()) {
                return '';
            }
        }

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = String(o[k]);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    },

    // 空数据转化为-或者其它符号。 默认符号为- ，传入symbol可以自定义符号
    emptyValue: function (value, symbol) {
        if (value !== 0 && !value) {
            return '-' || symbol;
        } else {
            return value;
        }
    },

};
