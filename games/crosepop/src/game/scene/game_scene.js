/**
 * Created by zhaojm on 15/4/1.
 */
game.GameScene = cc.Scene.extend({

    onEnter : function(){
        this._super();

        var self = this;

        if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
            window['Ads']['topAds']();
        }

        this.addChild(new game.GameLayer());


        //this.addChild(new game.OverLayer());

    },
});