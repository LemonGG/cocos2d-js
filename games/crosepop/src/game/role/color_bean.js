/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/26
 */
game.ColorBean = game.BaseRole.extend({
    _layer : null,
    _colorType : null,

    _levelPos : null,
    ctor:function(beanType, colorTypes){
        this._super();

        var type = Math.floor(Math.random() * colorTypes);

        this._colorType = type;


        this._node = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(beanType + '/'+type+'.png'));
        this._node.setScale(0.75);
    },

    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this._node);
    },

    removeFromLayer : function(touchLevelPos){
        var self = this;

        if(touchLevelPos){

            //cc.log('touch pos...', touchPos);
            if(touchLevelPos.x == this._levelPos.x && touchLevelPos.y == this._levelPos.y){

            }else if(touchLevelPos.x == this._levelPos.x){
                var y = this._levelPos.y;
                var step = this._levelPos.y > touchLevelPos.y  ? -1 : 1;
                y += step;

                while(y != touchLevelPos.y){

                    var p = cc.p(
                        (touchLevelPos.x + 0.5) * this._layer._rect_width + this._layer._offectX,
                        (y + 0.5) * this._layer._rect_width + this._layer._offectY
                    );

                    //cc.log('p==', p);

                    (new game.RemoveBeansEffect(this._layer._bean_type, this._colorType, p)).addToLayer(this._layer);


                    y += step;
                }
            }else if(touchLevelPos.y == this._levelPos.y){
                var x = this._levelPos.x;
                var step = this._levelPos.x > touchLevelPos.x  ? -1 : 1;
                x += step;

                while(x != touchLevelPos.x){
                    var p = cc.p(
                        (x + 0.5) * this._layer._rect_width + this._layer._offectX,
                        (touchLevelPos.y + 0.5) * this._layer._rect_width + this._layer._offectY
                    );

                    //cc.log('p==', p);
                    (new game.RemoveBeansEffect(this._layer._bean_type, this._colorType, p)).addToLayer(this._layer);

                    x += step;
                }
            }


            // TODO 星星消除效果，从下落改为爆炸
            //var x =  this._layer._rect_width * ([-1, 0, 1].getRandomItem());
            //var y = -(this._levelPos.y * this._layer._rect_width + this._layer._rect_width * 0.5) - 10;
            //var speed = -300;
            //var time = y / speed;



            var animate = new cc.Animate(
                new cc.Animation([1, 2, 3, 4, 5, 6, 7].map(function (i) {
                    return cc.spriteFrameCache.getSpriteFrame("bomb/0" + i + ".png");
                }), 0.1)
            );

            this._node.runAction(new cc.Sequence(
                animate,
                new cc.CallFunc(function(){
                    self._node.removeFromParent();
                    })
            ));



        }else{
            self._node.removeFromParent();
        }






    },

    setLevelPos:function(x, y){

        this._levelPos = cc.p(x, y);

    },


});