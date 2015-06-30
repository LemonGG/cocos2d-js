/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/1
 */
game._LocalStorageHelper = {

    _level_data_key : "color_beans_level_data",
    _total_score : "color_beans_total_score",

    /***
     * color_beans_data : [{
     *  'best_time' : 42,
     *  'best_score' : 23,
     * }, {}, {}...]
     *
     * **/

     resetAllData : function(){
        // 清空记录
        this.setGameData([]);
        this.setTotalScore(0);
    },

    refreshLevelData : function(level, best_time, best_score){

        var game_data = this.getGameData();
        cc.assert(level > 0 && level <= game_data.length, 'level. error....');

        var level_data = game_data[level];
        if (!level_data){
            game_data[level] = {
                "best_time" : best_time,
                "best_score" : best_score,
            };
        }else{
            // TODO 比较 记录，判断是否要设置data
            if(level_data['best_time'] < best_time) level_data['best_time'] = best_time;
            if(level_data['best_score'] < best_score) level_data['best_score'] = best_score;
            game_data[level] = level_data;
        }
        this.setGameData(game_data);
    },

    getBestLevel : function(){
        var game_data = this.getGameData();
        return game_data.length + 1;
    },

    setLevelData : function(level, best_time, best_score){

        var game_data = this.getGameData();
        cc.assert(level > 0 && level <= game_data.length, 'level. error....');
        game_data[level] = {
            "best_time" : best_time,
            "best_score" : best_score,
        };
        this.setGameData(game_data);
    },

    getLevelData : function(level){
        var data = this.getGameData();
        if(level >= data.length){
            return {};
        }else{
            return data[level];
        }
    },







    getGameData : function(){
        var temp = cc.sys.localStorage.getItem(this._level_data_key);
        temp = JSON.parse(temp);

        cc.log('temp==', temp, 'value=', value);

        if(temp instanceof Array){
            return temp;
        }else{
            return [];
        }
    },

    setGameData : function(data){
        cc.sys.localStorage.setItem(this._level_data_key, JSON.stringify(data));
    },





    addTotalScore : function(add_score){
        var temp = this.getTotalScore();
        temp += add_score;
        this.setTotalScore(temp);

    },


    setTotalScore : function(score){
        cc.sys.localStorage.setItem(this._total_score, JSON.stringify(score));
    },

    getTotalScore : function(){
        var temp = cc.sys.localStorage.getItem(this._total_score);
        temp = parseInt(temp);
        if(temp && temp > 0){
            return temp;
        }else{
            return 0;
        }
    },

};
