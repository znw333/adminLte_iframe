/******************外页控制*************************/


/******************内页控制*************************/
var defaultForm = 'dashboard.html';     //默认页
var defaultOpenStyle = 1;               //1.iframe 2.弹窗

//提示弹窗------------------
function showMsg(msg) {
    if (msg)
        alert(msg);
}

//切换页面------------------
/**
 * 使用Iframe 切换
 * @param {any} url
 */
function iframeOpen(url) {
    if (url) {
        var ifr = window.parent.document.getElementById('ifr');
        if (ifr)
            ifr.src = defaultForm;
        else
            showMsg('打开异常(查无iframe)');
    }
}

/**
 * 使用layer 切换
 * @param {any} url
 */
function layerOpen(url) {
    if (url) {
        var ifr = window.parent.document.getElementById('ifr');
        if (ifr)
            ifr.src = defaultForm;
        else
            showMsg('打开异常(查无iframe)');
    }
}

/**
 * 切换页面
 * @param {any} url
 */
function openUrl(url, openStyle) {
    if (!url || url.length < 0) {
        showMsg('地址异常');
        return false;
    }

    if (openStyle) {
        switch (openStyle) {
            case 1:
                returnMsg = iframeOpen(url);
            case 2:
                returnMsg = layerOpen(url);
        }
    }
    else {
        switch (defaultOpenStyle) {
            case 1:
                returnMsg = iframeOpen(url);
            case 2:
                returnMsg = layerOpen(url);
            default:
                returnMsg = iframeOpen(url);
        }
    }
}

//按钮------------------
/**
 * 关闭 点击
 * 
 */
$('.frmBtnClose').click(function () {
    openUrl(defaultForm, 1);
});

//默认初始化设置-----------
$(function () {

});