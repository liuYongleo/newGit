// ————————————————
// 版权声明：本文为CSDN博主「o1993o」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/o1993o/article/details/89646591

// onlyNum (el,binding,vnode) {
//     let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
//     ele.oninput = function() {
//         console.log(ele.value)
//         let val = ele.value;
//         val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
//         val = val.replace(/^\./g,""); //验证第一个字符是数字
//         val = val.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
//         val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
//         val = val.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3'); //只能输入三个小数
//         ele.value = val;
//     }
// }

