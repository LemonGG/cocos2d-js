/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/29
 */
game.TipsEffect = cc.Class.extend({
    _hand : null,
    _circle : null,
    _layer : null,
    _pos : null,
    ctor:function(pos){
        var self = this;
        var winSize = cc.winSize;
        this._pos = pos;

        this._hand = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('hand.png'));
        this._hand.attr({
            anchorX : 0,
            anchorY : 1,
            x : winSize.width / 2,
            y : winSize.height / 2,
            scale : 5,
            opacity : 1,
        });


        this._circle = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('circle.png'));
        this._circle.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : this._pos.x,
            y : this._pos.y,
            scale : 0.5,
            //opacity : 1,
        });





    },

    addToLayer : function(layer){
        this._layer = layer;
        var self = this;
        layer.addChild(this._hand, 3);

        this._hand.runAction(new cc.Sequence(
            new cc.Spawn(
                new cc.MoveTo(1, this._pos),
                new cc.FadeTo(1, 255),
                new cc.ScaleTo(1, 1)
            ),
            //new cc.DelayTime(1),
            new cc.CallFunc(function(){
                layer.addChild(self._circle, 2);

                self._circle.runAction(new cc.Sequence(
                    new cc.Repeat(new cc.Sequence(
                        new cc.ScaleTo(1, 1),
                        new cc.ScaleTo(1, 0.5)
                    ), 3),
                    new cc.CallFunc(function(){
                        self.removeFromLayer();
                    })
                ));

            }.bind(this))
        ));

    },

    removeFromLayer : function(){
        this._hand.removeFromParent();
        this._circle.removeFromParent();
    },




});