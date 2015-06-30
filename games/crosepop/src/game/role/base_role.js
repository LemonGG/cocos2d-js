/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/5
 */
game.BaseRole = cc.Class.extend({
    _node:null,
    ctor:function(){

    },

    setPosition:function(p){
        this._node.setPosition(p);
    },

    getPosition:function(){
        return this._node.getPosition();
    },

    getPositionX:function(){
        return this._node.x;
    },

    getPositionY:function(){
        return this._node.y;
    },

    getContentSize:function(){
        return this._node.getContentSize();
    },




});