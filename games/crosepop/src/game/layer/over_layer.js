/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/28
 */
game.OverLayer = cc.Layer.extend({

    ctor:function(level){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
            window['Ads']['fullViewAds']();
        }


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){return true;},
        }, this);


        var bg = new cc.Sprite(res.time_out_png);
        bg.attr({
            anchorX : 0.5,
            anchorY : 1,
            x : winSize.width / 2,
            y : winSize.height,
        });
        this.addChild(bg);




        var homeFrame  = cc.spriteFrameCache.getSpriteFrame('ui/home.png');
        var homeSelectedFrame  = cc.spriteFrameCache.getSpriteFrame('ui/home_selected.png');
        var homeItem = new cc.MenuItemImage(homeFrame, homeSelectedFrame, homeFrame, function(){
            game._Utils.goToHomePage();
        }, this);

        var restartFrame  = cc.spriteFrameCache.getSpriteFrame('ui/restart.png');
        var restartSelectedFrame  = cc.spriteFrameCache.getSpriteFrame('ui/restart_selected.png');
        var restartItem = new cc.MenuItemImage(restartFrame, restartSelectedFrame, restartFrame, function(){
            self.parent._game_level.levelAgain();
            self.removeFromLayer();

        }, this);

        var menu = new cc.Menu(homeItem, restartItem);
        menu.alignItemsHorizontally();
        menu.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height * 0.4,
            width : winSize.width,
            height : 100,
        });
        this.addChild(menu);


    },


    removeFromLayer:function(){
        this.removeFromParent();
    },





});