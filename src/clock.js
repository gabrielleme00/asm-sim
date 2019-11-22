/*
    A clock module that ticks other modules
*/

"use strict";

export class Clock {
    constructor(freq, modules) {
        this.start(freq, modules);
    }

    start(freq, modules) {
        if (this.on) return;

        this.on = true;
        this.timer = setInterval(() => {
            modules.forEach(m => {
                m.tick();
            });
        }, freq);
    }

    stop() {
        if (!this.on) return;

        this.on = false;
        clearInterval(this.timer);
    }
}