
PIXI.sound.add('MainMenuMusic', 'http://80.68.156.140/static/mainMenuMusic.mp3');
let StartMainMusicPlay = 0

//if ( sessionStorage.getItem("MusicPos") =="" || sessionStorage.getItem("MusicPos") ==null){
//
//    PIXI.sound.play('MainMenuMusic');
//    StartMainMusicPlay = Date.now()
//}else{
//
//    StartMainMusicPlay = Number(sessionStorage.getItem("MusicPos"))
//
//    PIXI.sound._sounds['MainMenuMusic'].play({start : (Date.now()-StartMainMusicPlay)/1000})
//
//    sessionStorage.setItem("MusicPos","")
//
//
//    PIXI.sound.volume('MainMenuMusic', sessionStorage.getItem("SettingsMusicRangeVal"))
//    PIXI.sound.volumeAll = sessionStorage.getItem("SettingsVolumeRangeVal")
//}



function SaveMusicPos(){
sessionStorage.setItem("MusicPos",StartMainMusicPlay)

}