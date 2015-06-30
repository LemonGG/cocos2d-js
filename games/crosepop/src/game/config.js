/**
 * Created by zhaojm on 15/3/17.
 */
game._Config = {
    language : game._Enum.language.cn,    // cn or en
    show_ads : false,
    debug : true,


    title : {
        en : 'Crose Pop',
        cn : '十字消彩豆',
    },

    beanType : 0,

};

game._Config.getLevelData = function(level){
    //cc.assert(level >= 0 && level <= 10, 'level error');

    var data = {
        bean_count : 45,    // 数量
        color_type : 4,     // 颜色种类
        pass_limit : 4, // <= 2 // 过关剩余个数
        time_limit : 30,    // 时间限制
    };

    data.color_type += parseInt(level * 0.5);
    if(data.color_type > 14){
        data.color_type = 14;
    }

    data.bean_count += level * 5;
    if(data.bean_count >= 95){
        data.bean_count = 95;
    }

    if(level < 0) {
        level = 0;

    }else if(level >= 0 && level < 10){

    }else if(level >= 10 && level < 52){
        data.time_limit -= (level - 10) * 2;
        level = 10;

    }else if(level >= 52){
        level = 52;
        data.time_limit -= (level - 10) * 2;
        level = 10;

    }

    data.time_limit += level * 5;

    data.pass_limit += level * 1;




    return data;

};

game._Config.getBeanType = function(){
    return game._Config.beanType;
};

game._Config.setBeanType = function(type){
    cc.assert(type == 0 || type == 1 , 'bean type error');
    game._Config.beanType = type;
};