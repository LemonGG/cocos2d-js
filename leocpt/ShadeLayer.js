


/**

    半透明层,可用出现弹出层时的背景
**/
var ShadeLayer = cc.LayerColor.extend({
    ctor:function(){
        this._super();
        this.setOpacity(200);
    }
});