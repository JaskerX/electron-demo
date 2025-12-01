const { Notification } = require("electron");

class TimerHandler {

    #intervalId = null;
    #remainingSeconds = 0;
    #totalSeconds = 0;

    reset (seconds) {
        if (this.#intervalId !== null) {
            this.pause();
        }

        this.#totalSeconds = seconds;
        this.#remainingSeconds = seconds;
    }

    start (window) {
        if (this.#intervalId !== null) {
            return;
        }

        this.#intervalId = setInterval(async () => {
            if (this.#remainingSeconds === 0) {
                this.pause();
                new Notification({
                    title: "Timer abgelaufen",
                    body: "Der Timer ist abgelaufen."
                }).show();
                // remove progressBar
                window.setProgressBar(-1);
                return;
            }

            this.#remainingSeconds -= 1;

            window.webContents.send("update-timer", this.#remainingSeconds);
            window.setProgressBar(1 - (this.#remainingSeconds / this.#totalSeconds));
        }, 1000);
    }

    pause () {
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

}

module.exports = TimerHandler;