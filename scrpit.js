const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio =document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// song titles  CHECK THIS FOR IMG AND SONG
const songs = ["dubstep", "energy", "jazzyfrenzy"];
// keep track of the songs
let songIndex = 0;
//  initailly load song details into DOM
loadSong(songs[songIndex]);
// update song details
function loadSong(songs) {
    title.innerText = songs;
    audio.src = `./music/${songs}.mp3`;
    cover.src = `./img/${songs}.jpg`;
}

// play song 
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");
    audio.pause();
}

// previous song
function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// NextSong
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex =0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPerCent = (currentTime / duration) * 100;
    progress.style.width = "${progressPerCent}%";
}

// set progress
function setProgress(e) {
    const width = this.clientWidth;
    const ClickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (ClickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
    const isPlaying =musicContainer.classList.contains("play");
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/song update 
audio.addEventListener("timeupdate", updateProgress);
// click on progress Bar
progressContainer.addEventListener("click", setProgress);
// song end
audio.addEventListener("ended", nextSong);