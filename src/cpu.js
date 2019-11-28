/*
    A Central Processing Unit module
*/

"use strict";

import * as utils from './utils.js';

export class CPU {
    /**
     * Creates a CPU and links it to a memory and opcode list.
     * @param {Number} memory Memory size in bytes
     * @param {Object} opcodes Opcode list object
     */
    constructor(memory, opcodes) {
        // General Purpose Registers
        this.gpr = new Uint8Array(4);
        // Instruction Pointer
        this.ip = 0;
        // Flags
        this.flags = {
            carry: false,
            fault: false,
            zero: false,
        }

        // RAM reference
        this.memory = memory;

        // Opcodes reference
        this.opcodes = opcodes;
    }

    /**
     * Clock tick
     */
    tick() {
        // Raises an error if the last operation was faulty.
        if (this.flags.fault) {
            throw "FAULT";
        }

        if (this.ip >= this.memory.size) {
            return false;
        }

        // Get an instruction from memory.
        const instr = this.memory.get(this.ip);
        // Decode instruction
        return this.decode(instr);
    }

    /**
     * Decodes/processess a given instruction.
     * @param {Number} instr Instruction opcode
     */
    decode(instr) {
        // Opcodes list
        const codes = this.opcodes;
        // Aux variables
        let val, src, dst, aux;

        switch (instr) {
            case codes.NOP:
                this.ip++
                break;

            // MOV
            case codes.MOV_REG_TO_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readReg(utils.lBits(aux));
                this.writeReg(dst, src);
                this.ip++;
                break;

            case codes.MOV_ADDRESS_TO_REG:
                dst = this.readPointer(++this.ip);
                src = this.readMem(++this.ip);
                this.writeReg(dst, src);
                this.ip++;
                break;

            case codes.MOV_REGADDRESS_TO_REG:
                aux = this.readMem(++this.ip);
                dst = utils.hBits(aux);
                src = this.readRegAddress(utils.lBits(aux));
                this.writeReg(dst, src);
                this.ip++;
                break;

            case codes.MOV_REG_TO_ADDRESS:
                dst = this.readReg(this.readMem(++this.ip));
                src = this.readMem(++this.ip);
                this.writeMem(dst, src);
                this.ip++;
                break;

            case codes.MOV_REG_TO_REGADDRESS:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readReg(utils.lBits(aux));
                this.writeRegAddress(dst, src);
                this.ip++
                break;

            case codes.MOV_NUMBER_TO_REG:
                dst = this.readMem(++this.ip);
                src = this.readMem(++this.ip);
                this.writeReg(dst, src);
                this.ip++;
                break;

            case codes.MOV_NUMBER_TO_ADDRESS:
                dst = this.readMem(++this.ip);
                src = this.readMem(++this.ip);
                this.writeMem(dst, src);
                this.ip++;
                break;

            case codes.MOV_NUMBER_TO_REGADDRESS:
                dst = this.readMem(++this.ip);
                src = this.readMem(++this.ip);
                this.writeRegAddress(dst, src);
                this.ip++;
                break;

            // ADD
            case codes.ADD_REG_TO_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readReg(utils.lBits(aux));
                val = this.processResult(dst + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.ADD_REGADDRESS_TO_REG:
                aux = this.readMem(++this.ip);
                dst = utils.hBits(aux);
                src = this.readRegAddress(utils.lBits(aux));
                val = this.processResult(this.readReg(dst) + src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.ADD_ADDRESS_TO_REG:
                dst = this.readMem(++this.ip);
                src = this.readPointer(++this.ip);
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

            // SUB
            case codes.SUB_REG_FROM_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readReg(utils.lBits(aux));
                val = this.processResult(dst - src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.SUB_REGADDRESS_FROM_REG:
                aux = this.readMem(++this.ip);
                dst = utils.hBits(aux);
                src = this.readRegAddress(utils.lBits(aux));
                val = this.processResult(this.readReg(dst) - src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.SUB_ADDRESS_FROM_REG:
                dst = this.readMem(++this.ip);
                src = this.readPointer(++this.ip);
                val = this.processResult(dst - src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            case codes.SUB_NUMBER_FROM_REG:
                dst = this.readMem(++this.ip);
                src = this.readMem(++this.ip);
                val = this.processResult(dst - src);
                this.writeReg(dst, val);
                this.ip++;
                break;

            // INC, DEC
            case codes.INC_REG:
                dst = this.readMem(++this.ip);
                this.incReg(dst);
                this.ip++;
                break;

            case codes.DEC_REG:
                dst = this.readMem(++this.ip);
                this.decReg(dst);
                this.ip++;
                break;

            // CMP
            case codes.CMP_REG_WITH_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readReg(utils.lBits(aux));
                this.processResult(dst - src);
                this.ip++;
                break;

            case codes.CMP_REGADDRESS_WITH_REG:
                aux = this.readMem(++this.ip);
                dst = this.readReg(utils.hBits(aux));
                src = this.readRegAddress(utils.lBits(aux));
                this.processResult(dst - src);
                this.ip++;
                break;

            case codes.CMP_ADDRESS_WITH_REG:
                dst = this.readReg(++this.ip);
                src = this.readPointer(++this.ip);
                this.processResult(dst - src);
                this.ip++;
                break;

            case codes.CMP_NUMBER_WITH_REG:
                dst = this.readReg(++this.ip);
                src = this.readMem(++this.ip);
                this.processResult(dst - src);
                this.ip++;
                break;

            case codes.STOP:
                return false;

            default:
                throw "Invalid opcode: " + instr;
        }
    }

    /**
     * Raises flags based on an operation result.
     * @param {Number} result Any operation result
     */
    processResult(result) {
        // Reset Zero and Carry flags
        this.flags.zero = this.flags.carry = false;

        // Process result
        if (result >= 256) {
            this.flags.carry = true;
            result %= 256;
        } else if (result === 0) {
            this.flags.zero = true;
        } else if (result < 0) {
            this.flags.carry = true;
            result = 255 - (-result) % 256;
        }

        return result;
    }

    /**
     * Writes a value to a register.
     * @param {Number} reg GP Register (0-3)
     * @param {Number} val Value (0-255)
     */
    writeReg(reg, val) {
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + reg;
        }

        // Handle value too large
        if (val > 0xFF) {
            val = 0xFF;
        }

        this.gpr[reg] = val;
    }

    /**
     * Returns the value of a register.
     * @param {Number} reg GP Register index (0-3)
     */
    readReg(reg) {
        // Handle non-existent register.
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + reg;
        }

        return this.gpr[reg];
    }

    /**
     * Writes to memory from a value stored in a register.
     * @param {Number} reg GP Register (0-3)
     * @param {Number} val Value (0-255)
     */
    writeRegAddress(reg, val) {
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + reg;
        }

        // Handle value too large
        if (val > 0xFF) {
            val = 0xFF;
        }

        this.writeMem(this.gpr[reg], val);
    }

    /**
     * Returns a memory value from the value of a register.
     * @param {Number} reg GP Register index (0-3)
     */
    readRegAddress(reg) {
        // Handle non-existent register.
        if (!this.registerExists(reg)) {
            throw "Register does not exist: " + reg;
        }

        return this.readMem(this.gpr[reg]);
    }

    /**
     * Increases register value by 1.
     * @param {Number} reg GP Register index (0-3)
     */
    incReg(reg) {
        this.writeReg(reg, this.readReg(reg) + 1);
    }

    /**
     * Decreases register value by 1.
     * @param {Number} reg GP Register index (0-3)
     */
    decReg(reg) {
        this.writeReg(reg, this.readReg(reg) - 1);
    }

    /**
     * Writes a value to a memory location.
     * @param {Number} addr Memory address (0-255)
     * @param {Number} val Value (0-255)
     */
    writeMem(addr, val) {
        this.memory.set(addr, val);
    }

    /**
     * Returns a value from a memory adress.
     * @param {Number} addr Address (0-255)
     */
    readMem(addr) {
        return this.memory.get(addr);
    }

    /**
     * Writes a value to a memory location by the address
     * of a pointer.
     * @param {Number} addr Memory address (0-255)
     * @param {Number} val Value (0-255)
     */
    writePointer(addr, val) {
        this.writeMem(this.readMem(addr), val);
    }

    /**
     * Returns a value from the address of a pointer.
     * @param {Number} addr Address (0-255)
     */
    readPointer(addr) {
        return this.readMem(this.readMem(addr));
    }

    /**
     * Returns true if the register exists.
     * @param {Number} reg GP Register index (0-3)
     */
    registerExists(reg) {
        return !(reg < 0 || reg >= this.gpr.length);
    }
}
