



var loadingRes = {
    loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    //loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    //loader_png : "res/" + game._Config.language + "/plist/loader.png",
    //loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",
    //loading_bar_png : "res/common/loading_bar.png",
    //loading2_png : "res/" + game._Config.language + "/loading2.png",
    loading_bg_png : "res/common/loading_bg.png",
    loading_png : "res/common/loading.png",
    loading_plist : "res/common/loading.plist",
};

var res = {

    gamelayer_bg_png : "res/common/gamelayer_bg.png",

    gamelayer_plist : "res/common/gamelayer.plist",
    gamelayer_png : "res/common/gamelayer.png",

    number0_png : "res/common/number0.png",
    number1_png : "res/common/number1.png",


    time_out_png : "res/common/timeout_bg.png",
    pause_bg_png : "res/common/pause_bg.png",
    win_bg_png : "res/common/win_bg.png",

    select_bg_png : "res/common/select_bg.png",
    select_bg_2_png : "res/common/select_bg_2.png",



};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//cc.log(g_resources);


var g_loaderResources = [];
for (var i in loaderRes) {
    g_loaderResources.push(loaderRes[i]);
}
