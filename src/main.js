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
    ADD A, [B]      ; Add regaddress to reg
    ADD A, [0x0]    ; Add address to reg
    ADD A, [B+0x0C] ; Add address to reg
    ADD A, 2        ; Add number to reg
    ADD A, 0x03     ; Add number to reg

    HLT         ; Stops the computer
`;
const compiled = compiler.compile(code);

computer.memory.set(0, compiled);
computer.start(1);

console.log(computer);