/*
    Main script
*/

"use strict";

import { Computer } from './computer.js';
import { Compiler } from './compiler.js';

const computer = new Computer();
const compiler = new Compiler();

const code = `
    INC B           ; Increases B register

    ADD A, B        ; Add reg to reg

    HLT         ; Stops the computer
`;

try {
    const compiled = compiler.compile(code);

    computer.memory.set(0, compiled);
    computer.start(1);
    
} catch (error) {
    console.error(error);
}