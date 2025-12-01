class TimerHandler {

    #intervalId = null;
    #seconds = 0;

    reset (seconds) {
        if (this.#intervalId !== null) {
            this.pause();
        }

        this.#seconds = seconds;
    }

    start (window) {
        if (this.#intervalId !== null) {
            return;
        }

        this.#intervalId = setInterval(async () => {
            if (this.#seconds === 0) {
                this.pause();
                return;
            }

            this.#seconds -= 1;
            window.webContents.send("update-timer", this.#seconds);
        }, 1000);
    }

    pause () {
        clearInterval(this.#intervalId);
        this.#intervalId = null;
    }

}

module.exports = TimerHandler;