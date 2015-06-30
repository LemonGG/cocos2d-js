/**
 * Created by zhaojm on 15/3/17.
 */
game.init = function(){

    game.setTitle();

    cc.view.adjustViewPort(true);


    game.setScale();
};

game.setTitle = function(){
    // set title
    if(game._Config.language == game._Enum.language.en){
        game._Utils.setTitle(game._Config.title.en);
    }else{
        game._Utils.setTitle(game._Config.title.cn);
    }
};


game.setScale = function () { // TODO： 优化！
    // 界面配置
    // 360 / 640
    // 360 / 530

    var size = game._Utils.getFrameSize();
    var realFactor = size.width / size.height;
    //var solutionFactor = 360 / 640;
    var policy = cc.ResolutionPolicy.SHOW_ALL;
    if (realFactor <= 360 / 640)
    {
        policy = cc.ResolutionPolicy.SHOW_ALL;
    }
    else if(realFactor <= 360 / 530)
    {
        policy = cc.ResolutionPolicy.SHOW_ALL;

    }else{
        policy = cc.ResolutionPolicy.SHOW_ALL;
    }

    cc.log("frameSize->width:" + size.width + ",height:" + size.height + ";sys = " + cc.sys.os + ";policy = " + policy);
    cc.view.setDesignResolutionSize(360, 600, policy);



    cc.view.resizeWithBrowserSize(true);


};

