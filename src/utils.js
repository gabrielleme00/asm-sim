/*
    Some useful functions
*/

"use strict";

/**
 * 4 higher (leftmost) bits
 * @param {Uint8} value
 */
export function hBits(value) {
    return (value & 0xF0) >> 4;
}

/**
 * 4 lower (rightmost) bits
 * @param {Uint8} value
 */
export function lBits(value) {
    return value & 0x0F;
}