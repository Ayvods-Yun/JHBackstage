module.exports = {
    uuid(len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            // rfc4122, version 4 form
            let r;
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
    },
    numberToChinese:(number)=> {
        var a = (number + '').split(''),
            s = [];
        let units = '个十百千万@#%亿^&~';
        let chars = '零一二三四五六七八九';
        if (a.length > 12) {
            throw new Error('too big');
        } else {
            for (var i = 0, j = a.length - 1; i <= j; i++) {
                if (j == 1 || j == 5 || j == 9) { // 两位数 处理特殊的 1*
                    if (i == 0) {
                        if (a[i] != '1')
                            s.push(chars.charAt(a[i]));
                    } else {
                        s.push(chars.charAt(a[i]));
                    }
                } else {
                    s.push(chars.charAt(a[i]));
                }
                if (i != j) {
                    s.push(units.charAt(j - i));
                }
            }
        }
        // return s;
        return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) { // 优先处理
            // 零百
            // 零千 等
            b = units.indexOf(d);
            if (b != -1) {
                if (d == '亿')
                    return d;
                if (d == '万')
                    return d;
                if (a[j - b] == '0')
                    return '零'
            }
            return '';
        }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) { // 零百 零千处理后
            // 可能出现
            // 零零相连的
            // 再处理结尾为零的
            return b;
        }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
            return {
                '@': '十',
                '#': '百',
                '%': '千',
                '^': '十',
                '&': '百',
                '~': '千'
            }[m];
        }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
            c = units.indexOf(d);
            if (c != -1) {
                if (a[j - c] == '0')
                    return d + '零' + b
            }
            return m;
        });
    },
    //验证联系电话
    /*规则：
     * 可以为空字符串或null；
     * 允许包含最多两个空格或"-"，不允许空格或"-"连续或交替输入;
     * 可以匹配手机、座机或400/800热线电话;
     * 联系电话正确返回true,错误返回false；
     */
    checkContact: (value) => {
        let f = /^\d|-|\s{1,}$/
        let nf = /-{2,}|\s{2,}|(\s-)|(-\s)/
        let s = /(^1(3|4|5|6|7|8|9)\d{9}$)|(^(0[1-9]\d{1,2})?\d{7,8}$)|(^(400|800)\d{7,8}$)/
        let v = value === null ? "" : value + "";
        if (v.length === 0) return true;
        if (f.test(v) && !nf.test(v) && v.replace(/\d/g, "").length < 3) {
            if (s.test(v.replace(/\D/g, ""))) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    },
    checkPhoneNumber: (value) => {
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value)
    },
    checkIdCard: (value) => {
        return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)
    },
    checkEmail: (value) => {
        // return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/.test(value)
        // return /^[a-zA-Z0-9_\.]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(value);
        return /^([a-zA-Z0-9_\.])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/gi.test(value);
        // return /^$|[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/i.test(value)
    }
}