/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/5
 */
game.GameLevel = cc.Node.extend({
    _layer : null,

    _rect_width : null,

    _level_width : 10,
    _level_height : 10,

    _offectX : 4,
    _offectY : 12,


    _beans : null,

    _level : null,
    _level_data : null,

    _score : null,
    _count_timer : null,

    //_uiLayer : null,

    _status : null,

    _bean_type : null,

    _bg : null,

    _color_rects : null,

    _tipsEffect : null,
    _tipsPos : null,

    _guidePos : null,
    _guideEffect : null,

    ctor:function(){
        this._super();
        var winSize = cc.winSize;
        var self = this;
        var bg = this._bg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('bg1.png'));
        bg.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            x : bg.width / 2,
            y : bg.height / 2,
        });
        this.addChild(bg);
        this.attr({
            anchorX : 0.5,
            anchorY : 0.5,
            width : bg.width,
            height : bg.height,
            x : winSize.width / 2,
            y : winSize.height / 2,
        });

        this._status = game._Enum.status_enum.normal;
        this._rect_width = (this.width - this._offectX) / this._level_width;

        this._color_rects = [];

        this._level = 0;

        this._level++;

        this.initLevel();

        //this.levelStart();

    },

    addRole:function(role){
        role.addToLayer(this);
    },

    addToLayer : function(layer){
        this._layer = layer;
        //this._uiLayer = layer._uiLayer;
        layer.addChild(this);

        this.parent._uiLayer.refresh(this._level, this._score, this._count_timer, this._level_data);
    },

    //removeFromLayer : function(){
    //    this.removeFromParent();
    //},


    initLevel : function(){

        this._score = 0;
        this._count_timer = 0;
        this._level_data = game._Config.getLevelData(this._level);
        this._bean_type = game._Config.getBeanType();
        //cc.log('bean type:', this._bean_type);

        var bean_count = this._level_data.bean_count;

        this._beans = [];
        while(bean_count > 0 && frame.Encode.check()){
            bean_count--;
            var bean = new game.ColorBean(this._bean_type, this._level_data.color_type);
            this._beans.push(bean);
            this.addRole(bean);
        }

        var null_count = this._level_height * this._level_width - this._level_data.bean_count;
        while(null_count > 0){
            null_count--;
            var rand = parseInt(this._beans.length * Math.random());
            this._beans.insert(rand, null);
        }

        this.refreshBeans();

    },

    resumeBeans : function(){

        for (var i = 0, len = this._beans.length; i < len; i++) {
            var iRand = parseInt(len * Math.random());
            var temp = this._beans[i];
            this._beans[i] = this._beans[iRand];
            this._beans[iRand] = temp;
        }

        this.refreshBeans();
    },


    refreshBeans : function(){
        //cc.log('beans length..' + this._beans.length);
        for(var i = 0; i < this._beans.length; i++){
            var bean = this._beans[i];
            if(bean){
                var pos = this.getLevelPosByIndex(i);

                bean.setPosition(this.getRealPosByLevelPos(pos));
                bean.setLevelPos(pos.x, pos.y);

            }
        }
    },




    onTouched : function(realPos) {
        var levelPos = this.getLevelPosByRealPos(realPos);
        var touch_bean = this._beans[this.getIndexByLevelPos(levelPos)];

        if(this._status == game._Enum.status_enum.bomb){
            if(touch_bean){
                //cc.log(touch_bean);

                this._beans[this.getIndexByLevelPos(levelPos)] = null;
                touch_bean.removeFromLayer(levelPos);
                this._level_data.bean_count -= 1;
                this._score += 1;
                this.parent._uiLayer.setScore(this._score);
                this.parent._uiLayer.setPassLimit(this._level_data.pass_limit, this._level_data.bean_count);

                this._status = game._Enum.status_enum.normal;
                this.clearColorRect();

                this.checkLevelOver();
            }
            return;
        }

        if(touch_bean){
            return;
        }


        var left = this.getLeft(levelPos.x, levelPos.y);
        var right = this.getRight(levelPos.x, levelPos.y);
        var top = this.getTop(levelPos.x, levelPos.y);
        var bottom = this.getBottom(levelPos.x, levelPos.y);

        if(this._status == game._Enum.status_enum.guide){
            //cc.log(levelPos, this._guidePos);
            if(levelPos.x != this._guidePos.x || levelPos.y != this._guidePos.y){
                return;
            }
            this._guideEffect.removeFromLayer();
            this._status = game._Enum.status_enum.normal;
        }


        if(this._status == game._Enum.status_enum.tips){
            this._tipsEffect.removeFromLayer();
            this._status = game._Enum.status_enum.normal;

        }

        if(this._status == game._Enum.status_enum.crose){
            var rounds = [left, right, top, bottom];
            for (var j = 0; j < rounds.length; j++) {
                var bean = rounds[j];
                if(!bean){
                    continue;
                }
                var level_pos = bean._levelPos;
                this._beans[this.getIndexByLevelPos(level_pos)] = null;
                bean.removeFromLayer(levelPos);
                this._level_data.bean_count -= 1;
                this.parent._uiLayer.setPassLimit(this._level_data.pass_limit, this._level_data.bean_count);
                this._score += 1;
                this.parent._uiLayer.setScore(this._score);
            }
            this._status = game._Enum.status_enum.normal;
            this.clearColorRect();
        }else if(this._status == game._Enum.status_enum.normal) {

            var sames = this.checkSames(left, right, top, bottom);

            //cc.log(sames);

            if (sames.length == 0) {
                // TODO 没有消除的，要减去 错误惩罚 时间
                this._count_timer += 4;
                (new game.SubTimeEffect(this.getRealPosByLevelPos(levelPos))).addToLayer(this);
                if (this._count_timer >= this._level_data.time_limit) {
                    this._count_timer = this._level_data.time_limit;
                    this.parent._uiLayer.setTimer(this._count_timer / this._level_data.time_limit, this._level_data.time_limit - this._count_timer);
                    this.levelOver();
                    return;
                }
                this.parent._uiLayer.setTimer(this._count_timer / this._level_data.time_limit, this._level_data.time_limit - this._count_timer);


            } else {
                // TODO 有要消除的，消除,加分

                (new game.TouchEffect(this.getRealPosByLevelPos(levelPos))).addToLayer(this);

                var count = 0;
                for (var i = 0; i < sames.length; i++) {
                    var same = sames[i];

                    for (var j = 0; j < same.length; j++) {
                        var bean = same[j];
                        var level_pos = bean._levelPos;
                        this._beans[this.getIndexByLevelPos(level_pos)] = null;
                        bean.removeFromLayer(levelPos);

                        count++;
                    }
                }

                this._level_data.bean_count -= count;
                this.parent._uiLayer.setPassLimit(this._level_data.pass_limit, this._level_data.bean_count);

                if(count == 4){

                    this._score += 6;
                    this.parent._uiLayer.setScore(this._score);

                    //TODO 4个，加时间 特效
                    //this._level_data.time_limit += 1.5;
                    //this.parent._uiLayer.setTimer(this._level_data.time_limit);

                }else if(count == 3){

                    this._score += 4;
                    this.parent._uiLayer.setScore(this._score);

                }else{

                    this._score += 2;
                    this.parent._uiLayer.setScore(this._score);
                }

            }

            if(this.parent._guide_times >= 0){
                this.parent.guide();
            }
        }

        this.checkLevelOver();


    },



    checkLevelOver:function(){

        if (this._level_data.bean_count <= this._level_data.pass_limit) {
            this.levelOver(true);
        }
    },

    checkSames : function(left, right, top, bottom){

        var sames = [];

        if(left){
            var same = [];
            same.push(left);
            if(right && right._colorType == left._colorType){
                same.push(right);
            }
            if(top && top._colorType == left._colorType){
                same.push(top);
            }
            if(bottom && bottom._colorType == left._colorType){
                same.push(bottom);
            }
            if(same.length > 1){
                sames.push(same);

                if(same.length > 2){
                    return sames;
                }
            }
        }



        if(right){
            var isHave = false;
            for(var i = 0; i < sames.length; i++){
                var same = sames[i];
                isHave = same.indexOf(right) > 0;
                if(isHave){
                    break;
                }
            }
            if(!isHave){
                var same = [];
                same.push(right);

                if(top && top._colorType == right._colorType){
                    same.push(top);
                }
                if(bottom && bottom._colorType == right._colorType){
                    same.push(bottom);
                }
                if(same.length > 1){
                    sames.push(same);

                    if(same.length > 2 || sames.length == 2){
                        return sames;
                    }
                }
            }
        }

        if(top){
            var isHave = false;
            for(var i = 0; i < sames.length; i++){
                var same = sames[i];
                isHave = same.indexOf(top) > 0;
                if(isHave){
                    break;
                }
            }
            if(!isHave){
                var same = [];
                same.push(top);

                if(bottom && bottom._colorType == top._colorType){
                    same.push(bottom);
                }
                if(same.length > 1){
                    sames.push(same);
                }
            }
        }


        return sames;
    },



    getLeft : function(x, y){
        x--;
        if(x < 0){
            return null;
        }else{
            var bean = this._beans[this.getIndexByLevelPos(cc.p(x, y))];
            if(bean){
                return bean;
            }else{
                return this.getLeft(x, y);
            }
        }
    },

    getRight : function(x, y){
        x++;
        if(x >= this._level_width){
            return null;
        }else{
            var bean = this._beans[this.getIndexByLevelPos(cc.p(x, y))];
            if(bean){
                return bean;
            }else{
                return this.getRight(x, y);
            }
        }
    },

    getBottom : function(x, y){
        y--;
        if(y < 0){
            return null;
        }else{
            var bean = this._beans[this.getIndexByLevelPos(cc.p(x, y))];
            if(bean){
                return bean;
            }else{
                return this.getBottom(x, y);
            }
        }
    },

    getTop : function(x, y){
        y++;
        if(y >= this._level_height){
            return null;
        }else{
            var bean = this._beans[this.getIndexByLevelPos(cc.p(x, y))];
            if(bean){
                return bean;
            }else{
                return this.getTop(x, y);
            }
        }
    },

    levelStart : function(){
        this.schedule(this.timer, 1);
    },


    timer : function(){
        var self = this;
        self._count_timer++;
        if(self._count_timer >= self._level_data.time_limit){
            self._count_timer = self._level_data.time_limit;
            //self._uiLayer.setTimer(0);
            self.levelOver();
            return;
        }
        self.parent._uiLayer.setTimer(self._count_timer / self._level_data.time_limit, self._level_data.time_limit - self._count_timer);
    },

    levelOver : function(pass){
        //cc.log('level over...is pass->', pass);
        this.unschedule(this.timer);
        if(pass && frame.Encode.check()){
            this.parent.levelPass(this._level, this._score, this._count_timer);
        }else{
            this.parent.levelOver(this._level, this._level_data);
        }
    },

    clearLevel : function(){
        this._beans.forEach(function(item){
            if(item) {
                item.removeFromLayer();
                item = null;
            }
        });
        this._beans = [];

    },

    newLevel : function(){
        //cc.log('new level...');
        this._level++;


        this.levelAgain();
    },


    levelAgain : function(){
        var self = this;
        this.clearLevel();
        this.clearColorRect();
        this.initLevel();
        this.parent._uiLayer.refresh(this._level, this._score, this._count_timer, this._level_data);

        this.parent.addNewLevelLayer(this._level, this._level_data.pass_limit, function(){
            self.levelStart();
        });

    },

    findCanTouch : function(){
        for(var i = 0; i < this._level_width; i++){
            for(var j = 0; j < this._level_height; j++){
                var x = i, y = j;
                var bean = this._beans[this.getIndexByLevelPos(cc.p(x, y))];
                if(!bean){
                    var left = this.getLeft(x, y);
                    var right = this.getRight(x, y);
                    var top = this.getTop(x, y);
                    var bottom = this.getBottom(x, y);

                    var sames = this.checkSames(left, right, top, bottom);

                    if(sames.length > 0){


                        return cc.p(x, y);

                    }

                }

            }
        }
        return null;
    },

    guide : function(){
        //cc.log('guide..');
        this._guidePos = this.findCanTouch();
        if(this._guidePos){

            this._guideEffect = new game.GuideEffect(this.getRealPosByLevelPos(this._guidePos));
            this._guideEffect.addToLayer(this);
        }
    },

    tips : function(){
        this._tipsPos = this.findCanTouch();
        if(this._tipsPos && frame.Encode.check()){

            this._tipsEffect = new game.TipsEffect(this.getRealPosByLevelPos(this._tipsPos));
            this._tipsEffect.addToLayer(this);
        }else{
            // TODO no tips
            this.parent.noTips();
            this._status = game._Enum.status_enum.normal;

        }

    },

    needBomb : function(){
        //this
        // TODO 没有bean的地方，阴影，显出 bean 的地方
        for(var i = 0; i < this._beans.length; i++){
            var bean = this._beans[i];
            var level_pos = this.getLevelPosByIndex(i);
            var real_pos = this.getRealPosByLevelPos(level_pos);
            var rect = null;
            if(!bean){
                rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('black.png'));
            }else{
                //rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('green.png'));
            }
            if(rect){
                rect.attr({
                    x : real_pos.x,
                    y : real_pos.y,
                });
                this.addChild(rect);
                this._color_rects.push(rect);
            }
        }

    },

    needCrose : function(){
        // TODO 盖住所有星星
        ////var winSize = cc.winSize;
        ////this._bg.setColor(cc.color(219, 250, 199, 255));
        //var green = new cc.Scale9Sprite(cc.spriteFrameCache.getSpriteFrame('green.png'));
        ////this._bg.addChild(green);
        //this.addChild(green);
        //green.attr({
        //    anchorX : 0,
        //    anchorY : 0,
        //    width : this._bg.width,
        //    height : this._bg.height,
        //    x : 0,
        //    y : 0,
        //    color:cc.color(0, 255, 0, 255),
        //});

        for(var i = 0; i < this._beans.length; i++){
            var bean = this._beans[i];
            var level_pos = this.getLevelPosByIndex(i);
            var real_pos = this.getRealPosByLevelPos(level_pos);
            var rect = null;
            if(!bean){
                //rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('black.png'));
            }else{
                rect = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('black.png'));
            }
            if(rect) {
                rect.attr({
                    x: real_pos.x,
                    y: real_pos.y,
                });
                this.addChild(rect);
                this._color_rects.push(rect);
            }
        }
    },



    // ----------tools-----------------began............

    getRealPosByLevelPos:function(pos){
        return cc.p(
            pos.x * this._rect_width + this._rect_width / 2 + this._offectX,
            pos.y * this._rect_width + this._rect_width / 2 + this._offectY
        );
    },

    getLevelPosByRealPos : function(pos){
        var x = parseInt((pos.x - this._offectX) / this._rect_width);
        var y = parseInt((pos.y - this._offectY) / this._rect_width);
        return cc.p(x, y);
    },


    getIndexByLevelPos : function(p){
        return p.y * this._level_width + p.x;
    },

    getLevelPosByIndex : function(i){
        var x = i % this._level_width;
        var y = Math.floor(i / this._level_width);
        return cc.p(x, y);
    },



    getRect : function(){
        return cc.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    },

    clearColorRect : function(){
        this._color_rects.forEach(function(item){
            item.removeFromParent();
        });
        this._color_rects = [];
    },
});