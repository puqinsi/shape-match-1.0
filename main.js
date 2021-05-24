cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading"))
        //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.resizeWithBrowserSize(true);
    var designSize = cc.size(736, 414);
    cc.loader.resPath = "res";

    /*安卓下高清显示*/
    cc.view.enableRetina(true);
    cc.view.setDesignResolutionSize(
        designSize.width,
        designSize.height,
        cc.ResolutionPolicy.SHOW_ALL
    );

    cc.LoaderScene.preload(
        g_resources,
        function () {
            cc.director.runScene(new StartScene());
        },
        this
    );
};
cc.game.run("gameCanvas");
