/*!
 * Copyright
 * 外页控制
 * @author zhuangnanwei
 * @version 2019-7-6
 */
+function ($) {
}(jQuery);



/*!
 * Copyright
 * 内页控制
 * @author zhuangnanwei
 * @version 2019-7-6
 */
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
        var ifr = $('#ifr', window.parent.document);
        if (ifr) ifr.attr('src', defaultForm);//回调父级菜单被选中 todo
        else showMsg('打开异常(查无iframe)');
    }
}
/**
 * 使用layer 切换
 * @param {any} url
 */
function layerOpen(url) {
    if (url) {
        var ifr = $('#ifr', window.parent.document);
        if (ifr) ifr.attr('src', defaultForm);//回调父级菜单被选中 todo
        else showMsg('打开异常(查无iframe)');
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
//子页标题------------------
/**
 * 子页标题设置
 * @param {any}
 */
function SetFormTitle() {
    console.log('SetFormTitle------------');
    var li = $('.main-sidebar .sidebar-menu li[class=active]', window.parent.document);
    if (li) $('.box-header .box-title').html($(li.find('a')).html());
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
    SetFormTitle();
});