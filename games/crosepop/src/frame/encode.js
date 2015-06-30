/**
 * Author: zhaojm
 * Email: <mingzz2013@gmail.com>
 * Create Time: 15/5/20
 */

/**
 *
 *
 *
 *
 *
 * 将此代码加到项目中。
 *
 * 代码中调用以下api
 *
 * frame.Encode.check();    // 检测域名
 *
 * 返回null, 则 不通过。否则通过。
 *
 *
 * 在代码中，可以在  有if判断的地方，&& 此判断
 *
 *
 *配合 不同时间, 不同时间段, 检测，效果更佳。
 *
 *
 * 打包时，请用 'google closure compiler'  高级选项压缩。
 *
 * cocos compile -m release -p web --advanced
 *
 * **/


var frame = frame || {};
frame.Encode = (function(){
    return {

        //debug : true,   // debug == true 时候，不做判断, 不用的时候，请注释掉，而不是改为false，

        isOOkor : false, // true 则 检测 ookor，false，则检测59600

        init: function () {
            var self = this;


            //var str = 'ookor';
            //var str = '59600';
            //var str = 'href';
            //var str = 'location';
            //var str = 'match';
            //for(var i = 0 ; i < str.length ; i++ ){
            //    var code = str.charCodeAt(i);
            //    console.log(code);
            //}


            this._num_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


            this._interval_list = [
                5, 1, 3, 40, 2,
                2, 1, 2, 1, 2,
                1, 1, 1, 1, 3,
                2];

            this._ookor = [14, 14, 10, 14, 15];
            this._59600 = [1, 3, 2, 0, 0];
            this._href = [8, 15, 6, 7];
            this._location = [11, 14, 5, 4, 16, 9, 14, 13];
            this._match = [12, 4, 16, 5, 8];

            this._code_list = [];
            this._first = 48;
            this._index = 0;
            this._str_match = this._str_location = this._str_href = this._str_59600 = this._str_ookor = '';
            this._code_list.push(this._first);

            this._interval_list.forEach(function (i) {
                self._code_list.push(self._code_list[self._index] + i);
                self._index++;
            });

            //this._codelist = [
            //    48, 53, 54, 57, 97,
            //    99, 101, 102, 104, 105,
            //    107, 108, 109, 110, 111,
            //    114, 116];


            //var _ookor =  [111, 111, 107, 111, 114];
            //var _59600 = [53, 57, 54, 48, 48];
            //var _href = [104, 114, 101, 102];
            //var _location = [108, 111, 99, 97, 116, 105, 111, 110];
            //var _match = [109, 97, 116, 99, 104];


            this._ookor.forEach(function (item) {
                self._str_ookor += self.strCode(self._code_list[item]);
            });

            this._59600.forEach(function (item) {
                self._str_59600 += self.strCode(self._code_list[item]);
            });

            this._href.forEach(function (item) {
                self._str_href += self.strCode(self._code_list[item]);
            });

            this._location.forEach(function (item) {
                self._str_location += self.strCode(self._code_list[item]);
            });


            this._match.forEach(function (item) {
                self._str_match += self.strCode(self._code_list[item]);
            });


            //cc.log(this._str_ookor, this._str_59600, this._str_href, this._str_location, this._str_match);


        },

        check : function(){
            var ret = null;
            if(this.isOOkor){
                ret = this.checkOOkor();
            }else{
                ret = this.check59600();
            }
            if(ret == null){
                return false;
            }else{
                return true;
            }
        },


        checkOOkor: function () {
            if(this.debug) return true;
            this.init();
            var ret = this.checkMatch(this.getherf(this.getLocation(this.getWindow())), this.getOOkor());
            return ret;
        },

        check59600: function () {
            if(this.debug) return true;
            this.init();
            var ret = this.checkMatch(this.getherf(this.getLocation(this.getWindow())), this.get59600());
            return ret;
        },

        strCode: function (code) {
            return String.fromCharCode(code);
        },


        getWindow: function () {
            return window;
        },

        getLocation: function (w) {
            return w[this._str_location];
        },

        getherf: function (l) {
            return l[this._str_href];
        },

        checkMatch: function (h, d) {
            return h[this._str_match](d);
        },

        getOOkor: function () {
            return this._str_ookor;
        },

        get59600 : function(){
            return this._str_59600;
        },


    }
})();
//
//frame.test = function(){
//    var ret = frame.Encode.checkOOkor();
//    console.log('ret----->', ret);
//    var ret = frame.Encode.check59600();
//    console.log('ret----->', ret);
//    
//    
//    var ret = frame.Encode.check();
//    console.log('ret----->', ret);
//};
//
//frame.test();


