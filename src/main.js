/*
    Main script
*/

"use strict";

import { Computer } from './computer.js';
import { Compiler } from './compiler.js';
import { Screen } from './screen.js';

const computer = new Computer();
const compiler = new Compiler();

const btnCompile = document.getElementById('btnCompile');

btnCompile.addEventListener('click', () => {
    const code = document.getElementById("codeArea").value;

    compile(code);
});

function compile(code) {
    try {
        const compiled = compiler.compile(code);

        computer.memory.set(0, compiled);
        computer.start(10);
        
    } catch (error) {
        console.error(error);
        alert(error);
    }
}

// SCREEN TESTS
const canvas = document.getElementById("lcd");
const screen = new Screen(canvas, 8, "#828678");
screen.drawChar(48, 0, 0);
screen.drawChar(49, 1, 0);
screen.drawChar(48, 1, 1);