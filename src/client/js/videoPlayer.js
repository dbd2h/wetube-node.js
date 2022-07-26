const $video = document.querySelector("video");
const $playBtn = document.getElementById("play");
const $playBtnIcon = $playBtn.querySelector("i");
const $muteBtn = document.getElementById("mute");
const $muteBtnIcon = $muteBtn.querySelector("i");
const $time = document.getElementById("time");
const $volumeRange = document.getElementById("volume");
const $currentTime = document.getElementById("currentTime");
const $totalTime = document.getElementById("totalTime");
const $timeline = document.getElementById("timeline");
const $fullScreenBtn = document.getElementById("fullScreen");
const $fullScreenIcon = $fullScreenBtn.querySelector("i");
const $videoContainer = document.getElementById("videoContainer");
const $videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let volumeValue = 0.5;
$video.volum = volumeValue;

const playingTimeMaker = (number) => {
  let makedTime = new Date(number * 1000).toISOString().substring(11, 19);
  if (makedTime.substring(0, 2) === "00") {
    makedTime = makedTime.substring(3);
    if (makedTime.substring(0, 1) === "0") {
      makedTime = makedTime.substring(1);
    }
  }
  return makedTime;
};

const handlePlayClick = (event) => {
  if ($video.paused) {
    $video.play();
  } else {
    $video.pause();
  }
  $playBtnIcon.classList = $video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = (event) => {
  if ($video.muted) {
    $video.muted = false;
  } else {
    $video.muted = true;
  }
  $muteBtnIcon.classList = $video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  $volumeRange.value = $video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if ($video.muted) {
    $video.muted = false;
    $muteBtn.innerHTML = "Mute";
  }
  volumeValue = value;
  $video.volume = value;
};

const handleLoadedMetadata = () => {
  $totalTime.innerText = playingTimeMaker(Math.floor($video.duration));
  $timeline.max = $video.duration;
};

const handleTimeUpdate = () => {
  $currentTime.innerText = playingTimeMaker(Math.floor($video.currentTime));
  $timeline.value = $video.currentTime;
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  $video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullScreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    $fullScreenIcon.classList = "fas fa-expand";
  } else {
    $videoContainer.requestFullscreen();
    $fullscreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => $videoControls.classList.remove("showing");

const handleMouseMove = () => {
  $videoControls.classList.add("showing");
  clearTimeout(controlsTimeout);
  const id = setTimeout(hideControls, 1000);
  controlsTimeout = id;
};

const handleMouseLeave = () => {
  const id = setTimeout(hideControls, 1000);
  console.log(id);
  controlsTimeout = id;
};

const handleEnded = () => {
  const { id } = $videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

$playBtn.addEventListener("click", handlePlayClick);
$video.addEventListener("click", handlePlayClick);
window.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    handlePlayClick();
  }
});
$muteBtn.addEventListener("click", handleMute);
$volumeRange.addEventListener("input", handleVolumeChange);
$video.addEventListener("loadeddata", handleLoadedMetadata);
if ($video.duration) {
  handleLoadedMetadata();
}
$video.addEventListener("timeupdate", handleTimeUpdate);
$timeline.addEventListener("input", handleTimelineChange);
$video.addEventListener("ended", handleEnded);
$videoContainer.addEventListener("mousemove", handleMouseMove);
$videoContainer.addEventListener("mouseleave", handleMouseLeave);
$fullScreenBtn.addEventListener("click", handleFullScreen);
document.onfullscreenchange = () => {
  const fullScreen = document.fullScreenElement;
  if (!fullScreen) {
    $fullScreenBtn.innerText = "Enter Full Screen";
  }
};
