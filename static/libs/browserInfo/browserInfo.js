/* 设置全局变量 */
var browserInfo  = {
    isIE:null,
};

document.onkeydown = function(e) {
    if (window.location.hostname==='www.biaoshitong.com.cn'){
        if(e.keyCode==123){
            return false
        }
    }else if (window.location.hostname === 'www.biaoshitong.com') {
        if(e.keyCode==123){
            return false
        }
    }else if (window.location.hostname === 'localhost') {

    }

    // if(e.keyCode==123){
    //     return false
    // }
    // if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 73 || e.keyCode === 74 || e.keyCode 						   === 80 || e.keyCode === 83 || e.keyCode === 85 || e.keyCode === 86 || e.keyCode === 117)) {
    //     return false;
    // }
    // if(e.keyCode==18||e.keyCode==123){
    //     return false
    // }
};

getBrowserInfo();
function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();
    // console.log(agent);
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
//IE
    if(agent.indexOf("msie") > 0) {
        browserInfo.isIE = true;
        // console.log(agent.match(regStr_ie));
    }

//firefox
    if(agent.indexOf("firefox") > 0) {
        browserInfo.isIE = false;
        // console.log(agent.match(regStr_ff));
    }

//Chrome
    if(agent.indexOf("chrome") > 0) {
        browserInfo.isIE = false;
        // console.log(agent.match(regStr_chrome));
    }

//Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        browserInfo.isIE = false;
        // console.log(agent.match(regStr_saf));
    }
}














