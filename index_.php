<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx092179a5517ca990", "491b966b43f9f22877225d8274e2f84d");
$signPackage = $jssdk->GetSignPackage();
?> 
<html>
<head>
    <meta charset="utf-8">
    <title>《偶像来了》女神排行榜</title>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="yes"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        body, canvas, div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -khtml-user-select: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
    </style>

	<script type="text/javascript">
    var _stit="";

	function getStit(){
		//alert("get"+_stit);
		return _stit;
	}
	var shareObj = {
    title: getStit(), // 分享标题
    link: 'http://tv.59600.com/Idol/', // 分享链接
    imgUrl: 'http://tv.59600.com/Idol/logo/75.png', // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
		//alert('');
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
	};
	function wx_shre(b,f){
	
       //  stit='《偶像来了》我用了' + b + '步，完成挑战！';
		//b=parseInt(b);

		
        
        var c =Number(b);

        if (c>0)
        {
			  //alert(c+"sss") 
			//  _stit='《偶像来了》我用了' + c + '步，完成挑战！';
			
			  _stit=' “偶像来了”我为自己心中的女神增加了' +f + '分，大家也一起来吧。'
			  
        }
		else
		{
				//alert(c)
			_stit='《偶像来了》女神排行榜。玩游戏，支持你喜欢的偶像！';
		}

		//alert("set"+_stit);
		reload();
    }

</script> 
</head>
<body style="padding:0; margin: 0; background: #000;">
<canvas id="gameCanvas" width="800" height="450"></canvas>

<script src="game.min.js"></script>
</body>
</html> 
<div style="display:none;"> 

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>

  wx.config({
    debug: false,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
	    	'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
    ]
  });
</script>

<script>
  function reload(){
	 wx.ready(function () {
	//alert("hehehhehehehehehe");
	wx.onMenuShareTimeline({
    title: getStit(), // 分享标题
    link: 'http://tv.59600.com/Idol/', // 分享链接
    imgUrl: 'http://tv.59600.com/Idol/logo/75.png', // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
		//alert('');
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
	});

	wx.onMenuShareAppMessage({
    title: getStit(), // 分享标题
    desc: getStit(), // 分享描述
    link:'http://tv.59600.com/Idol/', // 分享链接
    imgUrl: 'http://tv.59600.com/Idol/logo/75.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
		//alert('');
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
    }
	});
  });
  }
 



</script>
 <script src="dataeye.js"></script>
 <script src="dcagent.min.js"></script>
 <script type="text/javascript"> dataeye.ctInit("EC30FC3F77E25A2D335D9698EDC3119A");</script></div>
</body>
</html>
