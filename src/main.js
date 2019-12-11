/*
    Main script
*/

"use strict";

import { Computer } from './computer.js';
import { Compiler } from './compiler.js';

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