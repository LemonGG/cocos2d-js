/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/29
 */
game.NewLevelLayer = cc.LayerColor.extend({
    _layer : null,
    _action : null,
    ctor:function(level, pass_limit, callback){
        this._super(cc.color(0, 0, 0, 200));
        var winSize = cc.winSize;
        var self = this;


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                return true;
            },
            onTouchEnded:function(touch, event){
                self.removeFromLayer(callback);
            },
        }, this);


        var level_text = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/level.png'));
        level_text.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2 - 40,
            y : winSize.height / 2 + 60,
        });
        this.addChild(level_text);

        var levelLabel = new cc.LabelAtlas(level + '', res.number1_png, 26, 32, "0");
        levelLabel.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2 + 40,
            y : winSize.height / 2 + 60,
            //scale:0.5,
        });
        this.addChild(levelLabel);




        var bean = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('color_' + game._Config.getBeanType() +'.png'));
        bean.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2 - 50,
            y : winSize.height / 2 - 10,
        });
        this.addChild(bean);

        var passLimitLabel = new cc.LabelAtlas(":" + pass_limit, res.number1_png, 26, 32, "0");
        passLimitLabel.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2 + 30,
            y : winSize.height / 2 - 10,
            //scale : 0.5,
        });
        this.addChild(passLimitLabel);





        //this._action = new cc.Sequence(new cc.FadeIn(0.2), new cc.FadeOut(2), new cc.CallFunc(function(){
        //    self.removeFromLayer(callback);
        //}));


    },

    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this, 2);
        //this._node.runAction(this._action);
    },

    removeFromLayer : function(callback){
        callback();
        this.removeFromParent();
    },


});