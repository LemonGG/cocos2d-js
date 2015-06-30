/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/18
 */
game._Utils = {

};

game._Utils.goToHomePage = function(){
    if(game._Config.language == game._Enum.language.en){
        window.location.href="http://ookor.com";
    }else {
        window.location.href="http://www.59600.com";
    }
};

game._Utils.setTitle = function(name){
    document.title = name;
};

game._Utils.getFrameSize = function(){
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;
    //cc.log(clientWidth, clientHeight);
    return cc.size(clientWidth, clientHeight);

};

