/*背景层*/
var BgLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        var sprite = cc.Sprite.create(res.Bg);
        sprite.setPosition(size.width / 2, size.height / 2);
        sprite.setScale(size.height / sprite.height); //全屏显示
        this.addChild(sprite, 0);
    }
});

/*场景*/
var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var size = cc.director.getWinSize();

        /*添加背景层*/
        var layer = new BgLayer();
        this.addChild(layer, 0, 0);

        /*飞星层*/
        var layer = new StarLayer();
        this.addChild(layer, 3, 2);

        /*主交互层*/
        var layer = new MainLayer();
        this.addChild(layer, 2, 1);
    }
});
