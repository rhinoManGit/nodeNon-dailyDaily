
/**************关于微信分享*****************/

/*
*  注：微信JS接口安全域名是http://wx.17u.cn/和http://www.m.ly.com/（他的基础域名也可以http://m.ly.com/）
   即：配置这三个域名都是可以在本地进行分享的，无需发到线上测试。	
*
*  首先, 我们引入微信的sdk
*  然后, 根据我们公司的公众号绑定的服务器获取对应的验证信息
*
* */
function sdkInit() {
    $.ajax({
        url: "http://www.ly.com/huochepiao/resource/WXJsApi/GetWXApiConfig",
        type: "get",
        dataType: "jsonp",
        data: {
            url: window.location.href
        },
        success: function(c) {
			// 成功之后初始化微信的sdk: wx.config();
            "true" == c.Status && "1000" == c.MessageCode && (wx.config({
                debug: !1,
                appId: c.Data.AppId,
                timestamp: c.Data.TimeStamp,
                nonceStr: c.Data.NonceStr,
                signature: c.Data.Signature,    // 签名:（必须每次去获取，是实时变化的） 我们的网站上的微信公众号绑定的服务器是www.ly.com（用这个服务器来获取token校验的），
                                                // 但是我们的微信JS接口安全域名是http://wx.17u.cn/这个，所以不配这个域名的话是不能获取相
                                                // 关的API的
                                                // 注意：我们的微信JS接口安全域名是http://wx.17u.cn/，切端口是80才行，其他的都不行。无法调用到
                                                // 对应的API
                jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "showMenuItems", "getLocation", "hideOptionMenu"]
            }))
        }
    })
}

sdkInit();

// 结果如下

/*var config = {
 debug: true,
 appId: "wx3827070276e49e30",
 timestamp: 1601171259,
 nonceStr: "5f8de40b0e26453ab5b242be48962cb9",
 signature: "276bb68862b8c0a630237aef698ebce50d534197",
 jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "showMenuItems", "getLocation", "hideOptionMenu"]
 };*/


/*
* 配置信息失败之后的
* 回调
* */

wx.error(function(res){
    alert(JSON.stringify(res));
});

/*
* 配置信息是异步的，所以配置信息成功之后会调用这个ready方法
*
* */

wx.ready(function(){
    alert('ready');
    //wx.hideOptionMenu();
    wx.showMenuItems({
        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
    });

    wx.onMenuShareTimeline({
        title: '我是测试', // 分享标题
        link: 'http://wx.17u.cn/gny/', // 分享链接
        imgUrl: 'http://pic3.40017.cn/gny/line/2016/01/11/13/rEjZm4.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            alert('success');
        },
        cancel: function () {
            alert('error');
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: '我是测试1', // 分享标题
        desc: '我现在在测试', // 分享描述
        link: 'http://wx.17u.cn/gny/', // 分享链接
        imgUrl: 'http://pic3.40017.cn/gny/line/2016/01/11/13/rEjZm4.jpg', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function (res) {
            alert(JSON.stringify(res));
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            alert('分享给朋友error');
            // 用户取消分享后执行的回调函数
        }
    });
});

// 对于不同域名的情况

//document.domain="17u.cn";

/*
 * 注意：对于不是我们这个wx.17u.cn域名下的我们要调用微信的API这时候我们需要通过document.domain来
 * 设置跨域才行。比如我们当前的域名是wx.u.17u.cn,我们可以设置document.domain="17u.cn";此时就可
 * 以了。
 * 注意：document.domain的设置，设置的域名必须是当前网页域名的后缀才可以。如当前是wx.u.17u.cn，我
 * 们可以设置document.domain="17u.cn"
 *
 * */

// 这个是app的分享，只要隐藏域就可以
if (window._tc_bridge_public.isTc) {
    var html ='<input type="hidden" name="tcshareurl" value="'+conf.url+'">' +
        '<input type="hidden" name="tcshareimg" value="'+conf.img+'">' +
        '<input type="hidden" name="tcsharetext" value="'+conf.title+'">' +
        '<input type="hidden" name="tcDesc" value="'+conf.desc+'">';
    $(html).appendTo("body");

    return;
}

// 微信的才用sdk
initsdk();

wx.ready(function(){

    wx.showMenuItems({
        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
    });

    wx.onMenuShareTimeline({
        link: conf.url,
        title: conf.title,
        imgUrl: conf.img,
        desc: conf.desc
    });

    wx.onMenuShareAppMessage({
        link: conf.url,
        title: conf.title,
        imgUrl: conf.img,
        desc: conf.desc
    });
});