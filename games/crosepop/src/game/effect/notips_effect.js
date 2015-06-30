/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/10
 */
game.NoTipsEffect = cc.Class.extend({
    _node : null,
    ctor:function(){
        var winSize = cc.winSize;
        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('notips.png'));
        this._node.attr({
            x : winSize.width / 2,
            y : winSize.height / 2,
        });

    },
    addToLayer : function(layer){
        var self = this;
        layer.addChild(this._node, 3);
        this._node.runAction(new cc.Sequence(
            new cc.FadeIn(0.5),
            new cc.FadeOut(1),
            new cc.CallFunc(function(){
                self.removeFromLayer();
            })
        ));
    },

    removeFromLayer : function(){
        this._node.removeFromParent();
    },
});