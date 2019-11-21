/*
    A Central Processing Unit module
*/

"use strict";

import * as utils from './utils.js';

export class CPU {
    constructor(memory, opcodes) {
        // General Purpose Registers
        this.gpr = new Uint8Array(4);
        // Instruction Pointer
        this.ip = 0;
        // Zero flag
        this.zero = 0;
        // Fault flag
        this.fault = 0;

        // RAM reference
        this.memory = memory;

        // Opcodes reference
        this.opcodes = opcodes;
    }

    // Clock tick
    step() {
        // Raises an error if the last operation was faulty
        if (this.fault) {
            throw "FAULT";
        }

        // Get an instruction from memory
        const instr = this.memory.get(this.ip);
        // Decode instruction
        this.decode(instr);
    }

    // Decodes/processess a given instruction
    decode(instr) {
        // Opcodes list
        const codes = this.opcodes;
        // Aux variables
        let val, src, dst, aux;

        switch (instr) {
            case codes.ADD_REG_TO_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.leftBits(aux));
                src = this.readReg(utils.rightBits(aux));
                val = this.processResult(dst + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.ADD_REGADDRESS_TO_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.leftBits(aux));
                src = this.readMem(this.readReg(utils.rightBits(aux)));
                val = this.processResult(dst + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.ADD_ADDRESS_TO_REG:
                dst = this.readMem(++this.ip);
                src = this.readMem(this.readMem(++this.ip));
                val = this.processResult(dst + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.ADD_NUMBER_TO_REG:
                dst = this.readMem(++this.ip);
                src = this.readMem(++this.ip);
                val = this.processResult(dst + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            default:
                throw "Invalid opcode: " + instr;
        }
    }

    // Raises flags based on an operation value
    processResult(value) {
        // Reset Zero and Carry flags
        this.zero = this.carry = false;

        // Process value
        if (value >= 256) {
            this.carry = true;
            value %= 256;

        } else if (value === 0) {
            this.zero = true;

        } else if (value < 0) {
            this.carry = true;
            value = 255 - (-value) % 256;

        }

        return value;
    }

    // Writes a value to a register
    writeReg(reg, val) {
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + addr;
        }

        // Handle value too large
        if (val > 0xFF) {
            val = 0xFF;
        }

        this.gpr[reg] = val;
    }

    // Reads register's value
    readReg(reg) {
        // Handle non-existent register
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + addr;
        }

        return this.gpr[reg];
    }

    // Writes a value to a memory location
    writeMem(addr, val) {
        this.memory.set(addr, val);
    }

    // Reads a value from memory
    readMem(val) {
        return this.memory.get(val);
    }

    // Returns true if the register exists
    registerExists(reg) {
        return !(reg < 0 || reg >= this.gpr.length);
    }
}