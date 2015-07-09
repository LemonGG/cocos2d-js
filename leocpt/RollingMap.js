/**
 * Created by Lemon on 15/6/2.
 */

var BgComponent = cc.Node.extend({

    _map : null,

    _sps : [],

    _views : [],


    ctor : function ( map ) {
        this._super();


        this._map = map;


        this.anchorX = 0;
        this.anchorY = 0;


        this._sps = [];
        this._views = [];

        this.initSprite();

    },


    initSprite : function ( ) {


      var item;
      for ( var i = 0; i < this._map.length; i++ ) {

          item = new cc.Sprite ( this._map[i]);

          this._sps.push( item );
      }


    },


    getViewsHight : function () {

        var pos = cc.p(0,0);


        if ( this._views.length ) {
            var item = this._views[this._views.length-1]
            pos.x = item.y ;
            pos.y = leoUtils.pos.getWorldPosByObject(item).y ;
        }

        return pos;
    },


    getOneView : function () {

        var i =  this._sps.length % this._views.length;

        if ( !i || i == 0) {

            i = 1;

        }

        var view = this._sps[i-1];

        return new cc.Sprite(view.getTexture());
    },



    run : function () {

        this.scheduleUpdate();

    },



    update : function ( dt ) {

        var pos = this.getViewsHight();

        if ( pos.y < cc.visibleRect.height ) {

            var view = this.getOneView();
            this.addChild( view );
            view.anchorY = 1;
            view.scaleX = 2;
            this._views.push( view )

            view.y = pos.x + view.texture.height;
        }








        pos = this.getViewsHight();

        var item;
        var _h;
        for ( var i = 0; i < this._views.length; i++ ) {

            item = this._views[i];

            _h = leoUtils.pos.getWorldPosByObject( item).y;

            if ( _h < 0 ) {

                item.y = pos.x + item.texture.height;
            }

            item.y -= dt * 50;

        }


    }




})
