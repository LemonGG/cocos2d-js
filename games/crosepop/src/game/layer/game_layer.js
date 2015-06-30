/**
 * Created by zhaojm on 15/4/1.
 */


game.GameLayer = cc.Layer.extend({


    _game_level : null,
    _uiLayer : null,

    _guide_times : null,
    ctor:function () {
        this._super();

        var self = this;
        var winSize = cc.winSize;




        var bg = new cc.Sprite(res.gamelayer_bg_png);
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : winSize.width / 2,
            y : winSize.height / 2,
        });
        this.addChild(bg);

        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer, 2);


        this._game_level = new game.GameLevel();
        this.addRole(this._game_level);


        this._guide_times = 3;

        this.addChild(new game.GuideLayer(function(){

            self.addNewLevelLayer(self._game_level._level, self._game_level._level_data.pass_limit, function(){
                self._initTouched();


                self.guide();
            });

        }.bind(this)), 2);

    },

    addNewLevelLayer : function(level, pass_limit, callback){
        (new game.NewLevelLayer(level, pass_limit, callback)).addToLayer(this);
    },


    guide:function(){
        var self = this;
        this._guide_times -= 1;
        if(this._guide_times < 0){
            // TODO ready go
            //cc.log('level start...');
            this.scheduleOnce(function(){
                new game.ReadyGoLayer(function(){

                    self._game_level.levelStart();

                }).addToLayer(self);
            }, 1);


        }else{
            this._game_level._status = game._Enum.status_enum.guide;
            this._game_level.guide();
        }
    },

    noTips:function(){
        new game.NoTipsEffect().addToLayer(this);
    },



    addRole : function(role){
        role.addToLayer(this);
    },


    // -----------------tools----------end..............
    _initTouched : function(){
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan: function(touch, event){
                //cc.log('touchbegan');
                var pos = touch.getLocation();

                //cc.log(pos);

                var rect = this._game_level.getRect();
                if(cc.rectContainsPoint(rect, pos)){
                    var pos2 = cc.pSub(pos, cc.p(rect.x, rect.y));
                    this._game_level.onTouched(pos2);
                }

                return true;

            }.bind(this),
        }, this);
    },

    levelOver : function(){
        this.addChild(new game.OverLayer(), 2);
    },
    levelPass : function(level, score, time){
        var self = this;
        //this.scheduleOnce(function(){
            self.addChild(new game.PassLayer(level, score, time), 2);
        //}, 1);



    },
    GamePause : function(){
        this.addChild(new game.PauseLayer(), 2);
        cc.director.pause();
    },




});