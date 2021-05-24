/*主层*/
var MainLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var size = cc.director.getWinSize();

        this.count = 0;
        this.touchFlag = true;
        /*初始化界面*/
        this.init();
        /*背景音乐*/
        sound.gameBgAudio();
        sound.hintAudio();
    },
    init: function () {
        this.dragArr = [];
        let arr = data.dragBigData.slice(0, 4);

        data.dragSmallData.forEach(smallItem => {
            let index = arr.findIndex(item => item.id == smallItem.id);
            if (index > -1) arr.push(smallItem);
        });

        arr.forEach((item, index) => {
            let posX = data.posData[index].x;
            let posY = data.posData[index].y;
            let randX = this.random(posX.max, posX.min);
            let randY = this.random(posY.max, posY.min);
            let shape = cc.Sprite.create(item.src);
            shape.id = item.id;
            shape.audio = item.audio;
            shape.setAnchorPoint(0, 0);
            shape.setPosition(randX, randY);
            shape.setScale(1 / 3);
            this.addChild(shape, 1);
            this.dragArr.push(shape);
        });
        this.dragAction();
    },
    dragAction: function () {
        //创建一个事件监听器
        this.listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {
                //实现 onTouchBegan 事件处理回调函数
                if (this.touchFlag) {
                    var target = event.getCurrentTarget(); // 获取事件所绑定的 target, 通常是cc.Node及其子类
                    /*默认关闭错误提示*/
                    this.judgeFlag = false;
                    // 获取当前触摸点相对于按钮所在的坐标
                    var locationInNode = target.convertToNodeSpace(
                        touch.getLocation()
                    ); //转换为本地坐标系的坐标
                    var s = target.getContentSize(); //获取 touch 元素的数据(宽高)
                    var rect = cc.rect(0, 0, s.width, s.height); //元素范围

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        // 判断触摸点是否在按钮范围内
                        this.touchFlag = false;
                        sound.stopEffect();
                        sound.buttonAudio();
                        sound.shapeAudio(target);
                        return true;
                    }
                    return false;
                }
            }.bind(this),
            onTouchMoved: function (touch, event) {
                //实现onTouchMoved事件处理回调函数, 触摸移动时触发
                var size = cc.director.getWinSize();
                // 移动当前按钮精灵的坐标位置
                var target = event.getCurrentTarget();
                var delta = touch.getDelta(); //获取事件数据: delta
                /*设置层级*/
                target.setLocalZOrder(2);

                /*判断边界*/
                var moveX = (target.x += delta.x);
                var moveY = (target.y += delta.y);

                var wid = target.getBoundingBox().width;
                var heg = target.getBoundingBox().height;
                if (moveX + wid > size.width) {
                    target.x = size.width - wid;
                }
                if (moveY + heg > size.height) {
                    target.y = size.height - heg;
                }
                if (target.x < 0) {
                    target.x = 0;
                }
                if (target.y < 0) {
                    target.y = 0;
                }
            }.bind(this),
            onTouchEnded: function (touch, event) {
                // 实现onTouchEnded事件处理回调函数
                this.touchFlag = true;
                var target = event.getCurrentTarget();
                /*检测碰撞*/
                this.judgeEach(touch, target);
            }.bind(this)
        });
        // 添加监听器到管理器
        this.dragArr.forEach(item => {
            cc.eventManager.addListener(this.listener1.clone(), item);
        });
    },
    judgeEach: function (touch, target) {
        /*默认关闭错误提示*/
        this.judgeFlag = false;
        /*除去本身的数组*/
        this.newArr = this.dragArr.filter(item => target !== item);
        /*挑选相同 ID*/
        var len = this.newArr.length;
        for (var j = 0; j < len; j++) {
            var s = this.newArr[j].getBoundingBox();
            var rect = cc.rect(s.x, s.y, s.width, s.height);
            var drag = target.getBoundingBox();
            /*检测碰撞*/
            if (cc.rectIntersectsRect(drag, rect)) {
                this.judgeFlag = true;
                /*判断匹配*/
                if (target.id == this.newArr[j].id) {
                    var index = j;
                    /*移除监听*/
                    cc.eventManager.removeAllListeners();
                    var _this = cc.director.getRunningScene().getChildByTag(2);
                    _this.backEvent();

                    /*成功音乐*/
                    sound.rightAudio();
                    /* 成功的动画 */
                    // 图形重合
                    var action = cc.moveTo(
                        0.3,
                        this.newArr[index].x,
                        this.newArr[index].y
                    );
                    // 后续动画
                    var callBack = cc.callFunc(() => {
                        this.sucAction(target, this.newArr[index]);
                    });
                    var move_ease = action.easing(cc.easeInOut(2));
                    target.runAction(cc.sequence(move_ease, callBack));
                    this.judgeFlag = false;
                    break;
                }
            }
        }

        if (this.judgeFlag) {
            var _this = cc.director.getRunningScene().getChildByTag(2);
            _this.wrongStar();
        }
    },
    sucAction: function (drag, tar) {
        /*滤罩*/
        var layer = new cc.LayerColor(cc.color(16, 16, 16), 736, 414);
        layer.setAnchorPoint(0, 0);
        layer.setPosition(0, 0);
        layer.setOpacity(180);
        this.addChild(layer, 3);
        /*层级*/
        drag.setLocalZOrder(4);
        tar.setLocalZOrder(4);

        this.scheduleOnce(function () {
            /*移到屏幕中间*/
            var action1 = cc.moveTo(0.5, 235, 160);
            var move_ease1 = action1.easing(cc.easeOut(2));
            var action2 = cc.moveTo(0.5, 411, 160);
            var move_ease2 = action2.easing(cc.easeOut(2));

            drag.runAction(move_ease1);
            tar.runAction(move_ease2);
        }, 0.5);

        /*从数组中移除*/
        var len = this.dragArr.length;
        for (var i = 0; i < len; i++) {
            if (drag == this.dragArr[i]) {
                this.dragArr.splice(i, 1);
                break;
            }
        }
        var len = this.dragArr.length;
        for (var i = 0; i < len; i++) {
            if (tar == this.dragArr[i]) {
                this.dragArr.splice(i, 1);
                break;
            }
        }

        /*等前面动画完成*/
        this.scheduleOnce(function () {
            var _this = cc.director.getRunningScene().getChildByTag(2);
            _this.rightStar(this.count);
            /*淡出并移除*/
            var action1 = cc.fadeOut(1.5);
            var cb = cc.callFunc(
                function () {
                    drag.removeFromParent();
                    tar.removeFromParent();
                    layer.removeFromParent();
                }.bind(this)
            );
            var action = cc.sequence(action1.clone(), cc.delayTime(0.3), cb);

            drag.runAction(action1.clone());
            tar.runAction(action);

            /*添加监听*/
            this.scheduleOnce(function () {
                this.review();
            }, 1.5);
        }, 1.5);
    },
    review: function () {
        this.count++;
        //最后一关 结束程序 否则 添加监听
        if (this.count == data.star || this.count > data.star) {
            var _this = cc.director.getRunningScene().getChildByTag(2);
            _this.gameEnd(this.count);
            this.count = 0;
            return;
        } else {
            this.dragArr.forEach(item => {
                cc.eventManager.addListener(this.listener1.clone(), item);
            });
        }
    },
    random: function (max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
});
