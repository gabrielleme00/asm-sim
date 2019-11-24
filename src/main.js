/*
    Main script
*/

"use strict";

import { Computer } from './computer.js';

const computer = new Computer();

// TESTING - by hardcoding memory
computer.memory.set(0, [
    0x06, 0x00, 0x0A, 0xFF
]);
computer.start(1);
console.log(computer);