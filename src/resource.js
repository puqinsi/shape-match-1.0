/*资源*/
var res = {
    /*公共*/
    //声音
    Button_audio: "public/audios/button.mp3",
    Right_audio: "public/audios/right.mp3",
    Star_audio: "public/audios/star.mp3",
    Win_audio: "public/audios/celebration.mp3",
    Wrong_audio: "public/audios/wrong.mp3",
    //图片
    Back: "public/images/back.png", //头部部分
    BlackStar: "public/images/shape.png",
    LightStar: "public/images/light-star.png",
    FlyStar: "public/images/flay-star.png",
    ResultBg: "public/images/result-image-bg.png", //结束部分
    CelebrateGirl: "public/images/celebrate-girl.png",
    DoneNormal: "public/images/result-btn-done-normal.png",
    DonePress: "public/images/result-btn-done-pressed.png",
    button_green: "public/images/button_green.png",
    Hand: "public/images/hand.png", //手势提示
    HandClick: "public/images/handclick.png",
    Sound: "public/images/horn-orange.png",
    /*具体游戏*/
    //声音
    GameBg_audio: "audios/game-bg.mp3",
    gameInfo: "audios/game_info.mp3",
    ShapeOne_audio: "audios/voice-circle.mp3",
    ShapeTwo_audio: "audios/heart.mp3",
    ShapeThree_audio: "audios/diamond.mp3",
    ShapeFour_audio: "audios/voice-square.mp3",
    ShapeFive_audio: "audios/voice-five.mp3",
    ShapeSix_audio: "audios/echelon.mp3",
    ShapeSeven_audio: "audios/voice-triangle.mp3",

    //图片
    Bg: "images/bg.png", //背景层
    ShapeOne_big: "images/circle02.png",
    ShapeTwo_big: "images/heart02.png",
    ShapeThree_big: "images/rhombus02.png",
    ShapeFour_big: "images/square02.png",
    ShapeFive_big: "images/star02.png",
    ShapeSix_big: "images/trapezoid02.png",
    ShapeSeven_big: "images/triangle02.png",

    ShapeOne_small: "images/circle01.png",
    ShapeTwo_small: "images/heart01.png",
    ShapeThree_small: "images/rhombus01.png",
    ShapeFour_small: "images/square01.png",
    ShapeFive_small: "images/star01.png",
    ShapeSix_small: "images/trapezoid01.png",
    ShapeSeven_small: "images/triangle01.png"
};
/*预加载资源*/
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
