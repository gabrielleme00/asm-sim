/*
    List of operation codes

    Notes:
    - Some operations may need a different amount of
    reserved bytes.
*/

"use strict";

export const Opcodes = {
    NONE: 0,
    // MOV
    MOV_REG_TO_REG: 1,
    MOV_ADDRESS_TO_REG: 2,
    MOV_REGADDRESS_TO_REG: 3,
    MOV_REG_TO_ADDRESS: 4,
    MOV_REG_TO_REGADDRESS: 5,
    MOV_NUMBER_TO_REG: 6,
    MOV_NUMBER_TO_ADDRESS: 7,
    MOV_NUMBER_TO_REGADDRESS: 8,
    // ADD
    ADD_REG_TO_REG: 9,              // Needs next 1 byte
    ADD_REGADDRESS_TO_REG: 10,      // Needs next 1 byte
    ADD_ADDRESS_TO_REG: 11,         // Needs next 2 bytes
    ADD_NUMBER_TO_REG: 12,          // Needs next 2 bytes
}