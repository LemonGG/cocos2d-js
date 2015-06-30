/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/27
 */
game.GuideLayer = cc.LayerColor.extend({
    ctor:function(callback){
        this._super(cc.color(0, 0, 0, 200));
        var winSize = cc.winSize;
        var self = this;

        var g1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('guide_' + game._Config.getBeanType() + '.png'));
        g1.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 3 * 2,
        });
        this.addChild(g1);

        var txt = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('guide_text.png'));
        txt.attr({
            x : winSize.width / 2,
            y : winSize.height / 3,
        });
        this.addChild(txt);


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


    },

    removeFromLayer : function(callback){
        this.removeFromParent();
        callback();
    },

});