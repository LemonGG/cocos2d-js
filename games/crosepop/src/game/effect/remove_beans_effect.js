/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/29
 */
game.RemoveBeansEffect = cc.Class.extend({
    _node : null,
    _layer : null,
    _action : null,
    ctor:function(beanType, colorType, pos){
        var self = this;
        var winSize = cc.winSize;
        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(beanType + '/' + colorType + '.png'));
        this._node.attr({
            x : pos.x,
            y : pos.y,
            scale : 0.3,
        });

        this._action = new cc.Sequence(new cc.DelayTime(1), new cc.CallFunc(function(){
            self.removeFromLayer();
        }));

    },

    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this._node);
        this._node.runAction(this._action);
    },

    removeFromLayer : function(){
        this._node.removeFromParent();
    },


});