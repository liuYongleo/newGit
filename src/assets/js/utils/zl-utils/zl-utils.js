import commonFilter from '@/assets/js/filters/zl-filter/zl-filter';

// 生成uuid
const getUuid = function (len, radix) {
    /* eslint-disable */
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
    /* eslint-enable */
};

// 判断是否为合法ipv4地址
const isIpv4 = function (ip) {
    let reg = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
    return reg.test(ip);
};

// 获取最近一年时间
const getRecent = function (num = 12, endTime = new Date()) {
    let startTime = new Date(endTime);
    startTime.setMonth(endTime.getMonth() - num);
    let difference = endTime.getMonth() - num - startTime.getMonth();
    if (Math.abs(difference % 12) === 1) {
        startTime.setDate(1);
        startTime = new Date(startTime.getTime() - 24 * 60 * 60 * 1000);
    }

    return [ commonFilter.date(startTime.getTime(), 'yyyy-MM-dd'), commonFilter.date(endTime.getTime(), 'yyyy-MM-dd'), ];
};

export {getUuid, isIpv4, getRecent, };
