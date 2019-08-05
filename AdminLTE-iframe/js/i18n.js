/*
浣滆€咃細鑹虹伒 qq:315800015
鏃堕棿锛�2018-05-27
鍔熻兘锛氬埄鐢ㄨ胺姝岀殑缈昏瘧瀹炵幇鍏ㄦ枃澶氳瑷€缈昏瘧
*/
localStorage.langstr = $('.wrap').html();
$(document).on('change', '#language', function () {
    var idx = $(this).get(0).selectedIndex,
        q = localStorage.langstr,
        lan = $('.lan').html(),
        msg = $('.msg').html();
    q = q.replace(/(\s)+/g, '$1');
    q = q.replace(/\>\s+/g, '>');
    q = q.replace(/\s+\</g, '<');
    $.ajax({
        type: "post",
        url: "translate-google.php",
        data: {
            tl: $(this).val(),
            q: q
        },
        async: false,
        success: function (data) {
            de = JSON.parse(data);
            var str = '';
            for (var i = 0, item = de[0]; i < item.length; i++) {
                str += item[i][0];
            }
            str = str.replace(/(&|\\u0026|&)lt;/g, '<');
            str = str.replace(/(&|\\u0026|&)gt;/g, '>');
            str = str.replace(/\\*\s*"\s*;/g, '"');
            str = str.replace(/<\s+/g, '<');
            str = str.replace(/>\s+/g, '>');
            str = str.replace(/>;/g, '>');
            $('.wrap').html(str);
            $('.lan').html(lan);
            $('.msg').html(msg);
            $('#language option:eq(' + idx + ')').attr('selected', true);
            localStorage.lang = $('#language option:eq(' + idx + ')').val();
        }
    });
});



var dict = {};

$(function () {
    registerWords();
    if (getCookieVal("lang") == "en") {
        setLanguage("en");
    } else if (getCookieVal("lang") == "zh") {
        setLanguage("zh");
    } else {
        setLanguage("en");
    }

    // 切换语言事件 根据自己业务而定
    $("#enBtn").bind("click", function () {
        setLanguage("en");
        //这里也可以写一些其他操作，比如加载语言对应的css
    });

    $("#zhBtn").bind("click", function () {
        setLanguage("zh");
    });

});

function setLanguage(lang) {
    setCookie("lang=" + lang + "; path=/;");
    translate(lang);
}

function getCookieVal(name) {
    var items = document.cookie.split(";");
    for (var i in items) {
        var cookie = $.trim(items[i]);
        var eqIdx = cookie.indexOf("=");
        var key = cookie.substring(0, eqIdx);
        if (name == $.trim(key)) {
            return $.trim(cookie.substring(eqIdx + 1));
        }
    }
    return null;
}

function setCookie(cookie) {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = cookie + ";expires=" + exp.toGMTString();
}

function translate(lang) {
    if (sessionStorage.getItem(lang + "Data") != null) {
        dict = JSON.parse(sessionStorage.getItem(lang + "Data"));
    } else {
        loadDict();
    }

    $("[lang]").each(function () {
        switch (this.tagName.toLowerCase()) {
            case "input":
                $(this).val(__tr($(this).attr("lang")));
                break;
            default:
                $(this).text(__tr($(this).attr("lang")));
        }
    });
}

function __tr(src) {
    return (dict[src] || src);
}

function loadDict() {
    var lang = (getCookieVal("lang") || "en");
    $.ajax({
        async: false,
        type: "GET",
        url: "/lang/" + lang + ".json",
        success: function (msg) {
            dict = msg;
            sessionStorage.setItem(lang + 'Data', JSON.stringify(dict));
        }
    });

}

// 遍历所有lang属性的标签赋值
function registerWords() {
    $("[lang]").each(function () {
        switch (this.tagName.toLowerCase()) {
            case "input":
                if ($(this).attr("lang") == "") {
                    $(this).attr("lang", $(this).val());
                }
                break;
            default:
                if ($(this).attr("lang") == "") {
                    $(this).attr("lang", $(this).text());
                }
        }
    });
}