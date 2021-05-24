/*飞星层*/
var StarLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.flag = true;
        this.init();
        this.backEvent();
    },
    init: function () {
        var size = cc.director.getWinSize();
        var h1 = size.height - 52;
        var h2 = size.height - 47;

        this.backSprite = cc.Sprite.create(res.Back);
        this.backSprite.id = "back";
        this.backSprite.setAnchorPoint(0, 0);
        this.backSprite.setPosition(16, h1);
        this.backSprite.setScale(0.25);
        this.addChild(this.backSprite, 5);

        this.starArr = [];
        for (let i = 0; i < data.star; i++) {
            let star = cc.Sprite.create(res.BlackStar);
            star.setAnchorPoint(0, 0);
            star.setPosition(692 - 36 * i, h2);
            star.setScale(1 / 3);
            this.addChild(star, 5);
            this.starArr.unshift(star);
        }
    },
    rightStar: function (count) {
        var randX = this.random(100, 400);
        /*出现飞星*/
        this.star = cc.Sprite.create(res.FlyStar);
        this.star.setAnchorPoint(0, 0);
        this.star.setPosition(randX, -150);
        this.star.setScale(0.2);
        this.addChild(this.star, 10);

        /*动画 贝塞尔*/
        var array = [
            cc.p(randX, 0),
            //cc.p(randX+30, 45),
            cc.p(randX + 80, 110),
            //cc.p(randX+90, 135),
            //cc.p(randX+120, 180),
            cc.p(randX + 160, 220),
            //cc.p(randX+180, 270),
            cc.p(this.starArr[count].x, this.starArr[count].y)
        ];
        /*星星曲线*/
        var action1 = cc.cardinalSplineTo(0.8, array, 0);
        var move_ease = action1.easing(cc.easeInOut(3));
        /*星星缩放*/
        var scale1 = cc.scaleTo(0.4, 0.25);
        var scale2 = cc.scaleTo(0.4, 0.04);
        /*依次执行*/
        var action2 = cc.sequence(scale1, scale2);
        /*同时执行*/
        var action3 = cc.spawn(move_ease, action2);
        /*回调函数*/
        var cb = cc.callFunc(
            function () {
                this.star.removeFromParent();

                this.starArr[count].setTexture(res.LightStar);
            }.bind(this)
        );

        var action = cc.sequence(action3, cb);
        this.star.runAction(action);
        /*飞星*/
        sound.starAudio();
    },
    wrongStar: function () {
        if (this.flag) {
            this.flag = false;
            var randX = this.random(100, 400);
            /*出现飞星*/
            this.wStar = cc.Sprite.create(res.FlyStar);
            this.wStar.setAnchorPoint(0, 0);
            this.wStar.setPosition(randX, -100);
            this.wStar.setScale(0.16);
            this.addChild(this.wStar, 10);

            var action1 = cc.moveBy(0.5, 0, 200);
            var move_ease1 = action1.easing(cc.easeOut(2));

            var action2 = cc.moveBy(0.5, 0, -200);
            var move_ease2 = action2.easing(cc.easeIn(2));

            var cb = cc.callFunc(
                function () {
                    this.wStar.removeFromParent();
                    this.flag = true;
                }.bind(this)
            );
            var action = cc.sequence(move_ease1, move_ease2, cb);
            this.wStar.runAction(action);
            /*失败音乐*/
            sound.wrongAudio();
        } else {
            var action3 = cc.moveTo(0.3, this.wStar.x, 20);
            var cb2 = cc.callFunc(
                function () {
                    this.wStar.removeFromParent();
                    this.flag = true;
                }.bind(this)
            );
            var action5 = cc.sequence(action3, cb2);
            this.wStar.runAction(action5);
        }
    },
    backEvent: function (touch, event) {
        let listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                );
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    if (target.id == "back") {
                        cc.director.end();
                        cc.log("back");
                    }
                }
                return false;
            }.bind(this)
        });
        cc.eventManager.addListener(listener, this.backSprite);
    },
    gameEnd: function (num) {
        sound.stopAudio();
        sound.winAudio();
        var size = cc.director.getWinSize();
        var MsgBoxLayer = cc.LayerColor.extend({
            sprite: null,
            ctor: function (color, width, height) {
                this._super(color, width, height);
                this._touchListener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function () {
                        return true;
                    }
                });
                cc.eventManager.addListener(this._touchListener, this);
                // 添加你的UI布局
                return true;
            },
            onExit: function () {
                if (this._touchListener) {
                    cc.eventManager.removeListener(this._touchListener, 1);
                    this._touchListener = null;
                }
            }
        });
        this.shade = new MsgBoxLayer(
            cc.color(0, 0, 0),
            size.width,
            size.height
        );
        this.shade.setPosition(cc.p(0, 0));
        this.shade.setLocalZOrder(30);
        this.shade.setOpacity(160);
        this.addChild(this.shade, 100);

        this.msgBg = new cc.Sprite(res.ResultBg);
        this.msgBg.setAnchorPoint(0.5, 0.5);
        this.msgBg.setScale(0.333);
        this.msgBg.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.msgBg, 101);

        this.msg = new cc.Sprite(res.CelebrateGirl);
        this.msg.setAnchorPoint(0.5, 0);
        this.msg.setScale(0.333);
        this.msg.setPosition(size.width / 2, (size.height / 414) * 180);
        this.addChild(this.msg, 101);

        this.ok = new cc.Sprite(res.button_green);
        this.ok.setAnchorPoint(0.5, 0);
        this.ok.setScale(0.25);
        this.ok.setPosition(size.width / 2, (size.height / 414) * 38);
        this.addChild(this.ok, 101);

        let listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件处理回调函数
                var target = event.getCurrentTarget(); // 获取事件所绑定的 target, 通常是cc.Node及其子类
                // 获取当前触摸点相对于按钮所在的坐标
                var locationInNode = target.convertToNodeSpace(
                    touch.getLocation()
                ); //转换为本地坐标系的坐标
                var s = target.getContentSize(); //获取 touch 元素的数据(宽高)
                var rect = cc.rect(0, 0, s.width, s.height); //元素范围
                // 判断触摸点是否在按钮范围内
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.director.runScene(new StartScene());
                    return true;
                }
                return false;
            }.bind(this)
        });
        cc.eventManager.addListener(listener, this.ok);
    },
    random: function (max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});
