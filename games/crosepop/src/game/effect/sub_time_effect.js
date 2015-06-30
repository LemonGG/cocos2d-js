/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/29
 */
game.SubTimeEffect = cc.Class.extend({
    _node : null,
    _layer : null,
    _action : null,
    ctor:function(pos){
        var self = this;
        var winSize = cc.winSize;

        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('4s.png'));
        this._node.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : pos.x,
            y : pos.y,
        });

        this._action = new cc.Sequence(new cc.Spawn(
            new cc.MoveBy(1, cc.p(
                0, 20
            )),
            new cc.FadeTo(1, 0)
        ), new cc.CallFunc(function(){
            self.removeFromLayer();
        }));

    },

    addToLayer : function(layer){
        this._layer = layer;
        var self = this;
        layer.addChild(this._node);
        this._node.runAction(this._action);

    },

    removeFromLayer : function(){
        this._node.removeFromParent();
    },




});