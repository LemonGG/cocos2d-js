
/**
*   震动效果
**/
run_0:function(){
     var ac = cc.sequence(
                        cc.moveBy(0.01, 3, 0), 
                        cc.moveBy(0.01, 0, 3), 
                        cc.moveBy(0.02, -6, 0), 
                        cc.moveBy(0.02, 0, -6), 
                        cc.moveBy(0.01, 3, 0), 
                        cc.moveBy(0.01, 0, 3)
            );

     return cc.sequence(ac,ac);
};