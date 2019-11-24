/*
    A clock module that ticks other modules
*/

"use strict";

export class Clock {
    constructor(modules) {
        this.modules = modules;
    }

    start(speed) {
        if (this.on) return;
        if (speed == 0) return;
        if (!speed) speed = 1;

        // Speed in hertz
        const freq = 1000 / speed;

        this.on = true;
        this.timer = setInterval(() => {
            this.modules.forEach(m => {
                try {
                    if (m.tick() == false) {
                        this.stop();
                    }
                } catch (error) {
                    console.error(error);
                    this.stop();
                }
            });
        }, freq);
    }

    stop() {
        if (!this.on) return;

        this.on = false;
        clearInterval(this.timer);
    }
}