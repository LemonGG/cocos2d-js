/**
 * Created by zhaojm on 15/4/14.
 */
game.UILayer = cc.Layer.extend({

    _scoreLabel : null,
    _passLimitLabel : null,
    _timerBar:null,
    _levelLabel:null,
    _timerLabel : null,
    ctor:function(){
        this._super();
        var winSize = cc.winSize;
        var self = this;

        var top0 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/top0.png'));
        top0.attr({
            anchorX : 0.5,
            anchorY : 1,
            x : winSize.width / 2,
            y : winSize.height,
        });
        this.addChild(top0);

        var timerBarSpr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/top2.png'));
        var timerBar = new cc.ProgressTimer(timerBarSpr);
        timerBar.setType(cc.ProgressTimer.TYPE_BAR);
        timerBar.setMidpoint(cc.p(1, 0));
        timerBar.setBarChangeRate(cc.p(1, 0));
        timerBar.setPercentage(100);
        timerBar.setPosition(cc.p(winSize.width, winSize.height));
        timerBar.setAnchorPoint(cc.p(1, 1));
        this.addChild(timerBar);
        this._timerBar = timerBar;


        var top1 = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/top1.png'));
        top1.attr({
            anchorX : 0.5,
            anchorY : 1,
            x : winSize.width / 2,
            y : winSize.height,
        });
        this.addChild(top1);

        var bottom = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/bottom.png'));
        bottom.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 2,
            y : 0,
        });
        this.addChild(bottom);


        var scoreLabel = new cc.LabelAtlas("120", res.number1_png, 26, 32, "0");
        scoreLabel.attr({
            anchorX : 1,
            anchorY : 0.5,
            x : winSize.width / 2 + 60,
            y : winSize.height - 20,
            scale : 0.5,
        });
        this.addChild(scoreLabel);
        this._scoreLabel = scoreLabel;



        var timerLabel = new cc.LabelAtlas("120", res.number1_png, 26, 32, "0");
        timerLabel.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : 32,
            y : winSize.height - 50,
        });
        this.addChild(timerLabel);
        this._timerLabel = timerLabel;
        var timetxt = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/time.png'));
        timetxt.attr({
            x : 28,
            y : winSize.height - 28,
        });
        this.addChild(timetxt);



        var bean = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('color_' + game._Config.getBeanType() +'.png'));
        bean.attr({
            x : 70,
            y : winSize.height - 73,
            scale : 0.5,
        });
        this.addChild(bean);

        var passLimitLabel = new cc.LabelAtlas(":7=100>", res.number1_png, 26, 32, "0");
        passLimitLabel.attr({
            anchorX : 0,
            anchorY : 0.5,
            x : 85,
            y : winSize.height - 73,
            scale : 0.5,
        });
        this.addChild(passLimitLabel);
        this._passLimitLabel = passLimitLabel;

        var level = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/level.png'));
        level.attr({
            anchorX : 1,
            anchorY : 0.5,
            x : winSize.width / 2 + 70,
            y : winSize.height - 70,
            scale : 0.5,
        });
        this.addChild(level);

        var levelLabel = new cc.LabelAtlas("9", res.number1_png, 26, 32, "0");
        levelLabel.attr({
            anchorX : 1,
            anchorY : 0.5,
            x : winSize.width / 2 + 100,
            y : winSize.height - 70,
            scale:0.5,
        });
        this.addChild(levelLabel);
        this._levelLabel = levelLabel;






        var pauseFrame = cc.spriteFrameCache.getSpriteFrame('ui/pause.png');
        var pauseSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/pause_selected.png');
        var pauseItem = new cc.MenuItemImage(pauseFrame, pauseSelectedFrame, pauseFrame, function(){
            self.parent.GamePause();
        }, this);
        pauseItem.attr({
            anchorX : 1,
            anchorY : 1,
            x : winSize.width - 8,
            y : winSize.height - 6,
        });
        var restartFrame = cc.spriteFrameCache.getSpriteFrame('ui/restart2.png');
        var restartSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/restart2_selected.png');
        var restartItem = new cc.MenuItemImage(restartFrame, restartSelectedFrame, restartFrame, function(){
            self.parent._game_level.levelAgain();
        }, this);
        restartItem.attr({
            anchorX : 1,
            anchorY : 1,
            x : winSize.width - 83,
            y : winSize.height - 6,
        });
        var menuTop = new cc.Menu(pauseItem, restartItem);
        menuTop.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 0,
        });
        this.addChild(menuTop);


        var light = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('light.png'));
        light.attr({
            x : winSize.width / 2,
            y : winSize.height - 50,
        });
        this.addChild(light);




        var bombCDSpr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/bomb_cd.png'));
        var bombCD = new cc.ProgressTimer(bombCDSpr);
        bombCD.attr({
            type : cc.ProgressTimer.TYPE_RADIAL,
            x : winSize.width / 8 * 1,
            y : 10,
            anchorX : 0.5,
            anchorY : 0
        });
        this.addChild(bombCD, 2);

        var bombFrame = cc.spriteFrameCache.getSpriteFrame('ui/bomb.png');
        var bombSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/bomb_selected.png');
        var bombItem = new cc.MenuItemImage(bombFrame, bombSelectedFrame, bombFrame, function(){

            if(self.parent._game_level._status != game._Enum.status_enum.normal){
                return;
            }

            self.parent._game_level._status = game._Enum.status_enum.bomb;
            self.parent._game_level.needBomb();

            bombItem.setEnabled(false);
            bombCD.runAction(new cc.Sequence(
                cc.progressFromTo(8, 100, 0),
                cc.callFunc(function(){
                    bombItem.setEnabled(true);
                })
            ));


        }, this);
        bombItem.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 1,
            y : 10,
        });


        var resumeCDSpr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/resume_cd.png'));
        var resumeCD = new cc.ProgressTimer(resumeCDSpr);
        resumeCD.attr({
            type : cc.ProgressTimer.TYPE_RADIAL,
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 5,
            y : 10,
        });
        this.addChild(resumeCD, 2);
        var resumeFrame = cc.spriteFrameCache.getSpriteFrame('ui/resume.png');
        var resumeSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/resume_selected.png');
        var resumeItem = new cc.MenuItemImage(resumeFrame, resumeSelectedFrame, resumeFrame, function(){
            if(self.parent._game_level._status != game._Enum.status_enum.normal){
                return;
            }
            self.parent._game_level.resumeBeans();

            resumeItem.setEnabled(false);
            resumeCD.runAction(new cc.Sequence(
                cc.progressFromTo(10, 100, 0),
                cc.callFunc(function(){
                    resumeItem.setEnabled(true);
                })
            ));

        }, this);
        resumeItem.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 5,
            y : 10,
        });

        var croseCDSpr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/crose_cd.png'));
        var croseCD = new cc.ProgressTimer(croseCDSpr);
        croseCD.attr({
            type : cc.ProgressTimer.TYPE_RADIAL,
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 7,
            y : 10,
        });
        this.addChild(croseCD, 2);
        var croseFrame = cc.spriteFrameCache.getSpriteFrame('ui/crose.png');
        var croseSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/crose_selected.png');
        var croseItem = new cc.MenuItemImage(croseFrame, croseSelectedFrame, croseFrame, function(){

            if(self.parent._game_level._status != game._Enum.status_enum.normal){
                return;
            }

            self.parent._game_level._status = game._Enum.status_enum.crose;
            self.parent._game_level.needCrose();

            croseItem.setEnabled(false);
            croseCD.runAction(new cc.Sequence(
                cc.progressFromTo(10, 100, 0),
                cc.callFunc(function(){
                    croseItem.setEnabled(true);
                })
            ));


        }, this);
        croseItem.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 7,
            y : 10,
        });


        var tipsCDSpr = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/tips_cd.png'));
        var tipsCD = new cc.ProgressTimer(tipsCDSpr);
        tipsCD.attr({
            type : cc.ProgressTimer.TYPE_RADIAL,
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 3,
            y : 10,
        });
        this.addChild(tipsCD, 2);

        var tipsFrame = cc.spriteFrameCache.getSpriteFrame('ui/tips.png');
        var tipsSelectedFrame = cc.spriteFrameCache.getSpriteFrame('ui/tips_selected.png');
        var tipsItem = new cc.MenuItemImage(tipsFrame, tipsSelectedFrame, tipsFrame, function(){
            if(self.parent._game_level._status != game._Enum.status_enum.normal){
                return;
            }

            self.parent._game_level._status = game._Enum.status_enum.tips;
            self.parent._game_level.tips();

            tipsItem.setEnabled(false);
            tipsCD.runAction(new cc.Sequence(
                cc.progressFromTo(8, 100, 0),
                cc.callFunc(function(){
                    tipsItem.setEnabled(true);
                })
            ));

        }, this);
        tipsItem.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 8 * 3,
            y : 10,
        });


        var menuBottom = new cc.Menu(bombItem, tipsItem, resumeItem, croseItem);
        //menuBottom.alignItemsHorizontally();
        menuBottom.attr({
            anchorY : 0,
            anchorX : 0,
            x : 0,
            y : 0,
            width : winSize.width,
            height : winSize.height,
        });
        this.addChild(menuBottom);


        var text = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('ui/text.png'));
        text.attr({
            anchorX : 0.5,
            anchorY : 0,
            x : winSize.width / 2,
            y : 0,
        });
        this.addChild(text);

    },

    refresh : function(level, score, countTimer, data){
        this.setPassLimit(data.pass_limit, data.bean_count);
        this.setLevel(level);
        this.setScore(score);
        this.setTimer(countTimer / data.time_limit, data.time_limit - countTimer);
    },


    setLevel : function(level){
        this._levelLabel.setString(level + '');
    },

    setPassLimit : function(limit, current){
        this._passLimitLabel.setString(':' + limit + '=' + current + '>');
    },


    setScore : function(score){
        this._scoreLabel.setString(score + '');
    },

    setTimer : function(percent, limit){

        this._timerBar.setPercentage((1 - percent) * 100);
        this._timerLabel.setString(limit + '');
    },



    initUI : function(){
        // TODO 每局开始，初始化 界面，主要是 cd倒计时初始化
    },








});