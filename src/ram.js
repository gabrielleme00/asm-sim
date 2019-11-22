/*
    A Random Access Memory module
*/

"use strict";

export class RAM {
    constructor(size) {
        this.memory = new Uint8Array(size);
    }

    get size() {
        return this.memory.length;
    }

    // Writes a value to a memory location
    set(addr, val) {
        // Handle non-existent memory address
        if (!this.addressExists(addr)) {
            throw "Address does not exist: " + addr;
        }

        // Handle value too large
        if (val > 0xFF) {
            val = 0xFF;
        }

        this.memory[addr] = val;
    }

    // Reads a value from memory
    get(addr) {
        // Handle non-existent memory address
        if (!this.addressExists(addr)) {
            throw "Address does not exist: " + addr;
        }

        return this.memory[addr];
    }

    // Returns true if the address exists
    addressExists(addr) {
        return !(addr < 0 || addr >= this.memory.length);
    }
}