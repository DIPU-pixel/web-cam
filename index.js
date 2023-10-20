let video = document.querySelector("video");
let recoredBtncontainer = document.querySelector(".record-btn-cnt");
let captureBtncontainer = document.querySelector(".capture-btn-cnt");
let recoredBtn = document.querySelector(".record-btn");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;
let recorder;
let chunks = []; //video data will be avliable chunks format like it will come little portion

let constraints = {
  video: true,
  audio: true,
};
console.log(constraints);

//window.navigator
window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
  recorder = new MediaRecorder(stream);
  recorder.addEventListener("start", (e) => {
    chunks = [];
  });
  recorder.addEventListener("dataavailable", (e) => {
    chunks.push(e.data);
  });
  recorder.addEventListener("stop", (e) => {
    // conversition media chunks data video
    let blob = new Blob(chunks, { type: "video/mp4" });
    let videoUrl = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = videoUrl;
    a.download = "stram.mp4";
    a.click();
  });
});

recoredBtncontainer.addEventListener("click", (e) => {
  if (!recorder) return;
  recordFlag = !recordFlag;
  if (recordFlag) {
    //here recored started
    recorder.start();
    startTimer();

    recoredBtn.classList.add("scale-record");
  } else {
    recorder.stop();
    stopTimmer();
    recoredBtn.classList.remove("scale-record");

  }
});

console.log(recorder);
let timerID;
let counter = 0; // reprsent total sec
let timer = document.querySelector(".timer");
function startTimer() {
    timer.style.display="block"
  function displayTimer() {
    let totalSeconds = counter;
    let hours = Number.parseInt(totalSeconds / 3600);
    totalSeconds = totalSeconds % 3600;
    let minutes = Number.parseInt(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;
    let secondes = totalSeconds;
    hours = hours < 10 ? `0${hours}` : hours;
    secondes = secondes < 10 ? `0${secondes}` : secondes;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    timer.innerHTML = `${hours}:${minutes}:${secondes}`;

    counter++;
  }
  timerID = setInterval(() => {
    displayTimer();
  }, 1000);
}

function stopTimmer() {

  clearInterval(timerID);
  timer.innerText = "oo:oo:oo";
  timer.style.display="none"

}
