/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/30
 */
game.TouchEffect = cc.Class.extend({
    _node : null,
    _layer : null,
    _action : null,
    ctor:function(pos){
        var self = this;
        var winSize = cc.winSize;

        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('haha.png'));
        this._node.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : pos.x,
            y : pos.y,
        });


        var animate = new cc.Animate(
            new cc.Animation([0, 1, 2, 3, 4, 5, 6].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("touch/" + i + ".png");
            }), 0.07)
        );

        this._action = new cc.Sequence(

            //new cc.FadeIn(0.1),
            //new cc.FadeOut(0.5),
            animate,

            new cc.CallFunc(function(){
                self.removeFromLayer();
            })
        );

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