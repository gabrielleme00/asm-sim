/*
    A Random Access Memory module
*/

"use strict";

export class RAM {
    /**
     * Creates a memory of a specified size
     * @param {Number} size Size in bytes
     */
    constructor(size) {
        this.memory = new Uint8Array(size);
    }

    // Returns memory size in bytes
    get size() {
        return this.memory.length;
    }

    // Writes a value to a memory location
    set(addr, val) {
        // Handle non-existent memory address
        if (!this.addressExists(addr)) {
            throw "Memory access violation: " + addr;
        }

        if (Array.isArray(val)) {
            if (addr + val.length > this.memory.length) {
                throw "Values to be stored exceed memory length";
            }

            for (let i = 0; i < val.length; i++) {
                // Handle value too large
                val = val > 0xFF ? 0xFF : val;
                // Copy value to memory
                this.memory[addr + i] = val[i];
            }
        } else {
            // Handle value too large
            val = val > 0xFF ? 0xFF : val;
            // Copy value to memory
            this.memory[addr] = val;
        }
    }

    // Reads a value from memory
    get(addr) {
        // Handle non-existent memory address
        if (!this.addressExists(addr)) {
            throw "Memory access violation: " + addr;
        }

        return this.memory[addr];
    }

    // Returns true if the address exists
    addressExists(addr) {
        return !(addr < 0 || addr >= this.memory.length);
    }
}