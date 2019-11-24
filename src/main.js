/*
    Main script
*/

"use strict";

import { Computer } from './computer.js';

const computer = new Computer();

// TESTING:
computer.memory.set(0, 2);
computer.memory.set(1, 0b00100001);
computer.start(1);
console.log(computer);