//共性
var sound = {
    rightAudio: function () {
        cc.audioEngine.playEffect(res.Right_audio);
    },
    wrongAudio: function () {
        cc.audioEngine.playEffect(res.Wrong_audio);
    },
    winAudio: function () {
        cc.audioEngine.playEffect(res.Win_audio);
    },
    starAudio: function () {
        cc.audioEngine.playEffect(res.Star_audio);
    },
    buttonAudio: function () {
        cc.audioEngine.playEffect(res.Button_audio);
    },
    stopAudio: function () {
        cc.audioEngine.stopMusic();
    },
    //个性
    gameBgAudio: function () {
        cc.audioEngine.playMusic(res.GameBg_audio, true);
    },
    stopEffect: function () {
        cc.audioEngine.stopAllEffects();
    },
    hintAudio: function () {
        cc.audioEngine.playEffect(res.gameInfo);
    },
    shapeAudio: function (target) {
        cc.audioEngine.playEffect(target.audio);
    }
};
