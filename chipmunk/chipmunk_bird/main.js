cc.game.onStart = function(){
    cc.view.adjustViewPort(true);

    if(cc.sys.isMobile){
        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_WIDTH);
    }else{
        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
    }
	cc.view.resizeWithBrowserSize(true);

    //load resources
    MyLoaderScene.preload(g_resources, function () {
        cc.director.runScene(MyChipmunkLayer.scene());
    }, this);
};
cc.game.run();