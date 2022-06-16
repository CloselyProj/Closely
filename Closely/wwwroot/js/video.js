var bar = document.getElementById('color-bar');
var greenbar = document.getElementById('green-bar');
var btn = document.getElementById("pause-play");
var time = document.getElementById("video-time");
var hovertime = document.getElementById("hover-time");
var range = document.getElementById("volume-range");
var expand = document.getElementById("expand");
var fullscreen = document.getElementById("c-video");
var link = document.getElementById("sharedlink");
const group = link.value.split('?link=');
var popup = document.getElementById("popup");
var popupbtn = document.getElementById("enter-btn");
"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/user").build();

connection.start().then(function () {
    popup.style = "visibility: visible";
    connection.invoke("Enter", group[1]).catch(function (err) {
        return console.error(err.toString());
    });
}).catch(function (err) {
    return console.error(err.toString());
});

var player;
var ismouseover = false;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('video-player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

//Cостояние видео
function onPlayerReady(event) {
    popupbtn.onclick = function () {
        popup.style = "visibility: hidden";
    }
    btn.onclick = function () {
        Synchronize();
    };
    bar.onclick = function () {
        SeekBar();
    }
    timeupdater = setInterval(updateTime, 100);
    bar.addEventListener('mousemove', function () {
        hovertime.style.display = 'block';
        HoverTime();
    });
    bar.addEventListener('mouseleave', function () {
        hovertime.style.display = 'none';
    });
    range.onmousemove = function () {

        SetVolume();
    }
    expand.onclick = function () {
        playFullscreen();
    }
}
//Cостояние видео
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        btn.name = "pause-circle-outline";
    }
    else {
        btn.name = "play-circle-outline";
    }
}

// Запуск и пауза
function togglePlayPause() {
    if (btn.name == "play-circle-outline") {
        player.pauseVideo();
    }
    else {
        player.playVideo();
    }
}

// Обновление прогресс бара
function updateTime() {
    var videotime = player.getCurrentTime() / player.getDuration();
    var oldTime = videotime;
    if (videotime !== oldTime) {
        onProgress(videotime);
    }
    else {

        videotime = player.getCurrentTime() / player.getDuration();
        greenbar.style.width = videotime * 100 + "%";
    }
    SetVideoTime();
}

// Перемотка видео
function SeekBar() {
    let { left } = event.target.getBoundingClientRect();

    let needPercent = ((event.clientX - left) / 1000);
    player.seekTo(player.getDuration() * needPercent, true);

    if (btn.name == 'play-circle-outline')
        player.pauseVideo();
}

//Вывод времени видео
function SetVideoTime() {
    let current = GetVideoTime(player.getCurrentTime());
    let duration = GetVideoTime(player.getDuration());
    time.innerHTML = `${current}/${duration}`;
}
//Получение текущего времени видео
function GetVideoTime(time) {
    return `${Math.floor(time / 60)}:${FormatTime(Math.floor(time % 60))}`;
}

//Нужен ли ноль перед числом
function FormatTime(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

//Вывод времени при наведении на прогресс бар
function HoverTime() {
    let { left } = event.target.getBoundingClientRect();

    let needPercent = ((event.clientX - left) / 1000);
    let duration = player.getDuration() * needPercent;
    hovertime.innerHTML = `${GetVideoTime(duration)}`;

    hovertime.style.left = `${event.clientX - (left + (hovertime.offsetWidth / 2))}px`;


}

//Изменение звука
function SetVolume() {
    player.setVolume(range.value);
}

//FullScreen
function playFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        fullscreen.requestFullscreen();
    }
}

function Synchronize() {
    var message = btn.name;
    connection.invoke("Synchronize", message, group[1], player.getCurrentTime().toString()).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

connection.on("SynchronizeVideo", function (message, group, time) {
    
    if (message == "play-circle-outline") {
        btn.name = "pause-circle-outline";
        player.seekTo(time, true);
    }
    else {
        btn.name = "play-circle-outline";
        player.seekTo(time, true);
    }
    togglePlayPause();
});
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);