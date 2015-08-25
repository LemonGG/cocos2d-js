


shareToWeiXin:function()
{

	// 只有在微信浏览器中可以使用
	if(!WeixinJSBridge)return;
	WeixinJSBridge.invoke('shareTimeline',{
                "img_url": 'http://tv.59600.com/Idol/logo/75.png',
                "img_width": "75",
                "img_height": "75",
                "link": "http://tv.59600.com/Idol/",
                "desc": "《偶像来了》女神排行榜。玩游戏，支持你喜欢的偶像！",
                "title": "《偶像来了》女神排行榜"
            }, function(res) {
                //_report('timeline', res.err_msg);
            });
};


shareToFaceBook : function () {
        window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(location.href)+"&t="+encodeURIComponent("plane"),"sharer","toolbar=0,status=0,width=626,height=436")
}
