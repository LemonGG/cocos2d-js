/**
 * Created by zhaojm on 15/4/6.
 */
game.PauseLayer = cc.Layer.extend({

    ctor:function(){
        this._super();

        var winSize = cc.winSize;
        var self = this;


        var bg = new cc.Sprite(res.pause_bg_png);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 2,
        });
        this.addChild(bg);

        var restartFrame = cc.spriteFrameCache.getSpriteFrame('ui/restart.png');
        var restartSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/restart_selected.png');
        var restartItem = new cc.MenuItemImage(restartFrame, restartSelectedFrame, restartFrame, function(){
            cc.director.resume();
            this.parent._game_level.levelAgain();
            self.removeFromLayer();
        }, this);
        restartItem.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : 10,
            y : winSize.height / 2 + 50,
        });

        var homeFrame = cc.spriteFrameCache.getSpriteFrame('ui/home.png');
        var homeSelectedFrame  = cc.spriteFrameCache.getSpriteFrame('ui/home_selected.png');
        var homeItem = new cc.MenuItemImage(homeFrame, homeSelectedFrame, homeFrame, function(){
            game._Utils.goToHomePage();
        }, this);
        homeItem.attr({
            anchorX : 1,
            anchorY : 0.5,
            x : winSize.width - 10,
            y : winSize.height / 2 + 50,
        });

        var startFrame = cc.spriteFrameCache.getSpriteFrame('ui/start.png');
        var startSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/start_selected.png');
        var startItem = new cc.MenuItemImage(startFrame, startSelectedFrame, startFrame, function(){
            cc.director.resume();
            self.removeFromLayer();
        }, this);
        startItem.attr({
            x : winSize.width / 2,
            y : winSize.height / 2 - 20,
        });

        var menu = new cc.Menu(restartItem, startItem, homeItem);
        menu.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 0,
        });
        this.addChild(menu);



    },

    removeFromLayer : function(){
        this.removeFromParent();
    },




});