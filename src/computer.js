/*
    A Computer module that "glues" many other
    modules/computer parts together
*/

"use strict";

import { RAM } from './ram.js';
import { CPU } from './cpu.js';
import { Clock } from './clock.js';
import { Opcodes as opcodes } from './opcodes.js';

export class Computer {
    constructor() {
        this.reset();
    }

    reset() {
        this.memory = new RAM(0xFFFF + 1);
        this.cpu = new CPU(this.memory, opcodes);
        this.clock = new Clock([this.cpu]);
    }

    start(speed) {
        this.clock.start(speed);
    }

    step() {
        try {
            this.cpu.tick();
        } catch (error) {
            console.log(error);
        }
    }

    stop() {
        this.clock.stop();
    }
}