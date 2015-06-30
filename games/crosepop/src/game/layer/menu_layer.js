/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/14
 */
game.MenuLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        var winSize = cc.winSize;
        var self = this;

        cc.spriteFrameCache.addSpriteFrames(res.gamelayer_plist);

        var bg = new cc.Sprite(loaderRes.loading_bg_png);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 2,
            y : 0,
        });
        this.addChild(bg);






        var startFrame = cc.spriteFrameCache.getSpriteFrame('ui/start.png');
        var startSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/start_selected.png');
        var startItem = new cc.MenuItemImage(startFrame, startSelectedFrame, startFrame, function(){

            self.showSelectView();
            startItem.setEnabled(false);
        }, this);
        //startItem.setOpacity(0);
        //startItem.setVisible(false);
        var menu = new cc.Menu(startItem);
        menu.attr({
            x : winSize.width / 2,
            y : winSize.height / 4,
        });
        this.addChild(menu);

    },

    showSelectView : function(){
        var node = this.initSelectView();
        this.addChild(node);
    },

    initSelectView : function(){
        var winSize = cc.winSize;
        var node = new cc.Node();
        var bg = new cc.Sprite(res.select_bg_2_png);
        bg.attr({
            x : bg.width / 2,
            y : bg.height / 2,
        });
        node.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 2,
            width : bg.width,
            height : bg.height,
        });
        node.addChild(bg);


        var starFrame = cc.spriteFrameCache.getSpriteFrame('color_1.png');
        var starItem = new cc.MenuItemImage(starFrame, starFrame, starFrame, function(){
            game._Config.setBeanType(1);
            cc.director.runScene(new game.GameScene());
        }, this);
        starItem.attr({
            x : bg.width / 3 * 1,
            y : bg.height / 2,
        });
        var demondFrame = cc.spriteFrameCache.getSpriteFrame('color_0.png');
        var demondItem = new cc.MenuItemImage(demondFrame, demondFrame, demondFrame, function(){
            game._Config.setBeanType(0);
            cc.director.runScene(new game.GameScene());
        }, this);
        demondItem.attr({
            x : bg.width / 3 * 2,
            y : bg.height / 2,
        });
        var menu = new cc.Menu(starItem, demondItem);
        node.addChild(menu);
        menu.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 0,
        });
        //menu.alignItemsVertically();

        starItem.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.FadeTo(1, 150),
            new cc.FadeTo(1, 255)
        )));

        demondItem.runAction(new cc.RepeatForever(new cc.Sequence(
            new cc.FadeTo(1, 150),
            new cc.FadeTo(1, 255)
        )));


        //var tipsText = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('selectone.png'));
        //tipsText.attr({
        //    anchorX : 0.5,
        //    anchorY : 0.5,
        //    x : bg.width / 2,
        //    y : bg.height / 2,
        //});
        //node.addChild(tipsText);

        return node;
    },



});