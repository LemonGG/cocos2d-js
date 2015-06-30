/**
 * Created by zhaojm on 15/3/21.
 */
game.MyLoaderLayer = cc.Layer.extend({



    ctor:function(){
        this._super();

        var self = this;
        var winSize = cc.winSize;

        cc.spriteFrameCache.addSpriteFrames(loaderRes.loading_plist);

        var bg = new cc.Sprite(loaderRes.loading_bg_png);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 2,
        });
        this.addChild(bg);


        var loadingBarBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('loading1.png'));
        loadingBarBg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : 100,
        });
        this.addChild(loadingBarBg);

        var spr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('loading2.png'));
        var loadingBar = new cc.ProgressTimer(spr);
        loadingBar.setType(cc.ProgressTimer.TYPE_BAR);
        loadingBar.setMidpoint(cc.p(1, 0));
        loadingBar.setBarChangeRate(cc.p(1, 0));
        loadingBar.setPercentage(0);
        loadingBar.setPosition(cc.p(loadingBarBg.x - loadingBarBg.width / 2, loadingBarBg.y));
        loadingBar.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(loadingBar);

        var loadingBarFrame = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('loading3.png'));
        loadingBarFrame.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : 100,
        });
        this.addChild(loadingBarFrame);


        //var startFrame = cc.spriteFrameCache.getSpriteFrame('start.png');
        //var startSelectedFrame = cc.spriteFrameCache.getSpriteFrame('start_selected.png');
        //var startItem = new cc.MenuItemImage(startFrame, startSelectedFrame, startFrame, function(){
        //    cc.director.runScene(new game.MenuScene());
        //}, this);
        ////startItem.setOpacity(0);
        //startItem.setVisible(false);
        //var menu = new cc.Menu(startItem);
        //menu.attr({
        //    x : winSize.width / 2,
        //    y : winSize.height / 3,
        //});
        //this.addChild(menu);



        cc.loader.load(g_resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                //self._percent.setString('LOADING...' + percent + "%");
                loadingBar.setPercentage(percent * 100);
                //self._loadingBar.setScaleX(percent / 100);


            }, function () {

                loadingBar.setPercentage(100);

                //self._percent.setString('LOADING...100%');

                //self._loadingBar.setScaleX( 1);
                //
                //self._startItem.runAction(new cc.FadeIn(2));



                //startItem.setVisible(true);
                cc.director.runScene(new game.MenuScene());

            });
    },



});