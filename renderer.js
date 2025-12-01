// html elements

const timerDisplay = document.getElementById("timerDisplay");
const inputH = document.getElementById("inpH");
const inputM = document.getElementById("inpM");
const inputS = document.getElementById("inpS");

document.getElementById("start").onclick = () => {
    if (timerDisplay.textContent === "00:00:00") {
        resetTimer();
    }
    window.electron.startTimer();
};

document.getElementById("pause").onclick = () => window.electron.pauseTimer();

document.getElementById("reset").onclick = () => resetTimer();


// functions

const resetTimer = () => {
    const seconds = inputTimeToSeconds();
    window.electron.resetTimer(seconds);
    updateTimerDisplay(seconds);
}

const inputTimeToSeconds = () => {
    let seconds = Number(inputS.value);
    seconds += Number(inputM.value) * 60;
    seconds += Number(inputH.value) * 3600;
    return seconds;
}

const updateTimerDisplay = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

const formatNumber = value => value < 10 ? `0${value}` : value;


// exposed functions

window.electron.onUpdateTimer(seconds => updateTimerDisplay(seconds));