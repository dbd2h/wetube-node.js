const $video = document.querySelector("video");
const $playBtn = document.getElementById("play");
const $muteBtn = document.getElementById("mute");
const $time = document.getElementById("time");
const $volumeRange = document.getElementById("volume");
const $currentTime = document.getElementById("currentTime");
const $totalTime = document.getElementById("totalTime");
const $timeline = document.getElementById("timeline");
const $fullscreenBtn = document.getElementById("fullScreen");
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
  $playBtn.innerHTML = $video.paused ? "Play" : "Pause";
};

const handleMute = (event) => {
  if ($video.muted) {
    $video.muted = false;
  } else {
    $video.muted = true;
  }
  $muteBtn.innerHTML = $video.muted ? "Unmute" : "Mute";
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
  console.log("It`s work");
};

const handleTimeUpdate = () => {
  $currentTime.innerText = playingTimeMaker(Math.floor($video.currentTime));
  $timeline.value = $video.currentTime;
  console.log($video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  $video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    $fullscreenBtn.innerText = "Enter Full Screen";
  } else {
    $videoContainer.requestFullscreen();
    $fullscreenBtn.innerText = "Exit Full Screen";
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

$playBtn.addEventListener("click", handlePlayClick);
$muteBtn.addEventListener("click", handleMute);
$volumeRange.addEventListener("input", handleVolumeChange);
$video.addEventListener("loadedmetadata", handleLoadedMetadata);
if ($video.duration) {
  handleLoadedMetadata();
}
$video.addEventListener("timeupdate", handleTimeUpdate);
$timeline.addEventListener("input", handleTimelineChange);
$video.addEventListener("mousemove", handleMouseMove);
$video.addEventListener("mouseleave", handleMouseLeave);
$fullscreenBtn.addEventListener("click", handleFullScreen);
document.onfullscreenchange = () => {
  const fullScreen = document.fullscreenElement;
  if (!fullScreen) {
    $fullscreenBtn.innerText = "Enter Full Screen";
  }
};
