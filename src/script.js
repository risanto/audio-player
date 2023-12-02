const file = document.querySelector('[data-audio="source"]');
const audio = new Audio(file.dataset.audioSrc);

// data-audio="play" & data-audio="pause"

const playBtn = document.querySelector('[data-audio="play"]');
const pauseBtn = document.querySelector('[data-audio="pause"]');

pauseBtn.style.display = "none";

playBtn.addEventListener("click", () => {
  audio.play().catch((err) => {
    alert("Error playing the audio: " + err.message);
  });
  playBtn.style.display = "none";
  pauseBtn.style.display = "flex";
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  playBtn.style.display = "flex";
  pauseBtn.style.display = "none";
});


// data-audio="volume"

const volumeSlider = document.querySelector('[data-audio="volume"]');

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.currentTarget.value / 100;
});


// data-audio="progress" & time display

const progressSlider = document.querySelector('[data-audio="progress"]');
const currentTime = document.querySelector('[data-audio="current-time"]');
const timeLeft = document.querySelector('[data-audio="time-left"]');

progressSlider.value = 0;
progressSlider.style.width = "100%";

let mouseDownOnSlider = false;

audio.addEventListener("timeupdate", () => {
  if (!mouseDownOnSlider) {
    progressSlider.value = (audio.currentTime / audio.duration) * 100;
  }

  currentTime.innerHTML = secondsToTime(audio.currentTime);
  timeLeft.innerHTML = secondsToTime(audio.duration - audio.currentTime);
});

progressSlider.addEventListener("change", () => {
  const position = progressSlider.value / 100;
  audio.currentTime = (audio.duration || 0) * position;
});
progressSlider.addEventListener("mousedown", () => {
  mouseDownOnSlider = true;
});
progressSlider.addEventListener("mouseup", () => {
  mouseDownOnSlider = false;
});

function secondsToTime(t) {
  const m = Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");

  return `${m}:${s}`; 
}


// data-audio="mute" & data-audio="unmute"

const muteBtn = document.querySelector('[data-audio="mute"]');
const unmuteBtn = document.querySelector('[data-audio="unmute"]');

unmuteBtn.style.display = "none";

muteBtn.addEventListener("click", () => {
  unmuteBtn.style.display = "flex";
  muteBtn.style.display = "none";
  audio.muted = true;
});

unmuteBtn.addEventListener("click", () => {
  unmuteBtn.style.display = "none";
  muteBtn.style.display = "flex";
  audio.muted = false;
});
