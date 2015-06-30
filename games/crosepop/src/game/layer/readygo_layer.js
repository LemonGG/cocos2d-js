/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/10
 */
game.ReadyGoLayer = cc.LayerColor.extend({
    ctor:function(callback){
        this._super(cc.color(0, 0, 0, 200));
        var self = this;
        var winSize = cc.winSize;


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                return true;
            },
            onTouchEnded:function(touch, event){
                self.removeFromLayer(function(){
                    callback();
                });
            },
        }, this);

        // TODO 界面

        var top = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('readygo_timer.png'));
        top.attr({
            anchorX : 0.5,
            anchorY : 1,
            x : winSize.width / 2,
            y : winSize.height,
        });
        this.addChild(top);


        var txt = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('readygo_txt.png'));
        txt.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height * 0.7,
        });
        this.addChild(txt);

        var txt2 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('readygo_txt2.png'));
        txt2.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 3,
        });
        this.addChild(txt2);
        txt2.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.FadeTo(1, 100),
            new cc.FadeTo(1, 255)
        )));




    },
    addToLayer : function(layer){
        layer.addChild(this, 2);
    },
    removeFromLayer : function(callback){
        callback();
        this.removeFromParent();
    },
});