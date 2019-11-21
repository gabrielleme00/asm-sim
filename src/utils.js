/*
    Some useful functions
*/

"use strict";

/**
 * 4 leftmost bits
 * @param {Uint8} value
 */
export function leftBits(value) {
    return (value & 0xF0) >> 4;
}

/**
 * 4 rightmost bits
 * @param {Uint8} value
 */
export function rightBits(value) {
    return value & 0x0F;
}