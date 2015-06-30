/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/28
 */
game.PassLayer = cc.Layer.extend({

    ctor:function(level, score, time){
        this._super();
        var self = this;
        var winSize = cc.winSize;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){return true;},
        }, this);


        var bg = new cc.Sprite(res.win_bg_png);
        bg.attr({
            x : winSize.width / 2,
            y : winSize.height / 2,
        });
        this.addChild(bg);

        var levelLabel = new cc.LabelAtlas(level + '', res.number1_png, 26, 32, "0");
        levelLabel.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : winSize.width / 2 + 20,
            y : winSize.height / 2 + 140,
        });
        this.addChild(levelLabel, 2);

        var timeLabel = new cc.LabelAtlas(time + ';', res.number1_png, 26, 32, "0");
        timeLabel.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : winSize.width / 2 + 20,
            y : winSize.height / 2 + 70,
        });
        this.addChild(timeLabel, 2);

        var scoreLabel = new cc.LabelAtlas(score + '', res.number1_png, 26, 32, "0");
        scoreLabel.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : winSize.width / 2 + 20,
            y : winSize.height / 2 + 15,
        });
        this.addChild(scoreLabel, 2);


        var homeFrame = cc.spriteFrameCache.getSpriteFrame('ui/home.png');
        var homeSelectedFrame  = cc.spriteFrameCache.getSpriteFrame('ui/home_selected.png');
        var homeItem = new cc.MenuItemImage(homeFrame, homeSelectedFrame, homeFrame, function(){
            game._Utils.goToHomePage();
        }, this);
        homeItem.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : 30,
            y : winSize.height / 2 - 70,
        });

        var startFrame = cc.spriteFrameCache.getSpriteFrame('ui/start.png');
        var startSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/start_selected.png');
        var startItem = new cc.MenuItemImage(startFrame, startSelectedFrame, startFrame, function(){
            self.parent._game_level.newLevel();
            //cc.log('start...');
            self.removeFromLayer();
        }, this);
        startItem.attr({
            anchorX : 1,
            anchorY : 0.5,
            x : winSize.width - 30,
            y : winSize.height / 2 - 70,
        });

        var menu = new cc.Menu(startItem, homeItem);
        menu.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 0,
        });
        this.addChild(menu, 2);

        this.effect(function(){});

    },

    effect : function(callback){
        var allTime = 4;

        var maxDelayTime = 2;
        var maxActionTime = allTime - maxDelayTime;

        for(var i = 0; i < 20; i++){
            var delayTime = Math.random() * maxDelayTime;
            var actionTime = maxActionTime;
            (new game.PassEffect(delayTime, actionTime)).addToLayer(this);
        }


    },


    removeFromLayer:function(){
        //cc.log('remove win...');
        this.removeFromParent();
    },


    
});