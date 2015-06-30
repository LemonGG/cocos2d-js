/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/30
 */
game.PassEffect = cc.Class.extend({
    _node : null,
    _action : null,
    _layer : null,
    ctor:function(delayTime, actionTime){
        var self = this;
        var winSize = cc.winSize;

        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('win_star.png'));
        //this._node.opacity
        this._node.attr({
            x : winSize.width / 2,
            y : winSize.height + 100,
            scale : 0,
            rotation : Math.random() * 360 * (Math.random() > 0.5 ? -1 : 1),
        });

        var rotation = Math.random() * 360 * (Math.random() > 0.5 ? -1 : 1);
        var scale = Math.random() * 1;
        var pos = cc.p(
            Math.random() * winSize.width,
            Math.random() * winSize.height / 3 * 2 + winSize.height / 3
        );
        var opacity = Math.random() * 255;

        this._action = new cc.Sequence(
            new cc.DelayTime(delayTime),
            new cc.Spawn(
                new cc.ScaleTo(actionTime * 0.4, scale).easing(cc.easeCubicActionOut()),
                new cc.RotateBy(actionTime * 0.4, rotation).easing(cc.easeElasticOut()),
                new cc.MoveTo(actionTime * 0.4, pos).easing(cc.easeCubicActionOut()),
                new cc.FadeTo(actionTime * 0.4, opacity).easing(cc.easeCubicActionOut())
            )
        );
    },

    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this._node);
        this._node.runAction(this._action);
    },

    //removeFromLayer : function(){
    //    this._node.removeFromParent();
    //},
});