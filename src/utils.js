/*
    Some useful functions
*/

"use strict";

/**
 * 4 higher (leftmost) bits.
 * @param {Uint8} value
 */
export function hBits(value) {
    return (value & 0xF0) >> 4;
}

/**
 * 4 lower (rightmost) bits.
 * @param {Uint8} value
 */
export function lBits(value) {
    return value & 0x0F;
}

/**
 * Keeps a value within the computer boundaries
 * (0x00 to 0xFF).
 * @param {Number} value
 */
export function confine(value) {
    if (value < 0x00) return 0x00;
    if (value > 0xFF) return 0xFF;

    return value;
}

/**
 * Returns true if the register exists.
 * @param {Number} reg GP Register index (0~3)
 */
export function registerExists(reg) {
    return !(reg < 0 || reg > 3);
}