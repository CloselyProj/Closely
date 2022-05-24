var video = document.getElementById("video-player");
var bar = document.querySelector('.green-bar');
var btn = document.getElementById("play-pause");

function togglePlayPause(){
    if (btn.className == 'play') {
        btn.className = 'pause';
        video.src += "&autoplay=1";
    }
    else {
        btn.className = 'play';
    }
}
btn.onclick = function () {
    btn.className = 'play';
    togglePlayPause();
};