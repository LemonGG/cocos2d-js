/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/6/9
 */
game.MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        this.addChild(new game.MenuLayer());
    },
});