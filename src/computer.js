/*
    A Computer module that "glues" many other
    modules/computer parts together

    Notes:
    - As this is an 8-bit computer, the largest
    accessible address is 0b11111111 or 0xFF. Thus
    there would be no point in having more than
    256 bytes in memory.
*/

"use strict";

import { RAM } from './ram.js';
import { CPU } from './cpu.js';
import { Opcodes as opcodes } from './opcodes.js';

export class Computer {
    constructor() {
        this.reset();
    }

    reset() {
        this.memory = new RAM(256);
        this.cpu = new CPU(this.memory, opcodes);
    }
}