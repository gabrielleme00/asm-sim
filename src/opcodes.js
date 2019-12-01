/*
    List of operation codes

    Notes:
    - Some operations may need a different amount of
    reserved bytes.
    - Operations with a commented "byte need" are
    already implemented.
*/

"use strict";

export const Opcodes = {
    NOP: 0,

    // MOV
    MOV_REG_TO_REG: 1,              // Needs next 1 byte
    MOV_ADDRESS_TO_REG: 2,          // Needs next 2 bytes
    MOV_REGADDRESS_TO_REG: 3,       // Needs next 1 byte
    MOV_REG_TO_ADDRESS: 4,          // Needs next 2 bytes
    MOV_REG_TO_REGADDRESS: 5,       // Needs next 1 byte
    MOV_NUMBER_TO_REG: 6,           // Needs next 2 bytes
    MOV_NUMBER_TO_ADDRESS: 7,       // Needs next 2 bytes
    MOV_NUMBER_TO_REGADDRESS: 8,    // Needs next 2 bytes

    // ADD
    ADD_REG_TO_REG: 10,             // Needs next 1 byte
    ADD_REGADDRESS_TO_REG: 11,      // Needs next 1 byte
    ADD_ADDRESS_TO_REG: 12,         // Needs next 2 bytes
    ADD_NUMBER_TO_REG: 13,          // Needs next 2 bytes

    // SUB
    SUB_REG_FROM_REG: 14,           // Needs next 1 byte
    SUB_REGADDRESS_FROM_REG: 15,    // Needs next 1 byte
    SUB_ADDRESS_FROM_REG: 16,       // Needs next 2 bytes
    SUB_NUMBER_FROM_REG: 17,        // Needs next 2 bytes

    // INC, DEC
    INC_REG: 18,                    // Needs next 1 byte
    DEC_REG: 19,                    // Needs next 1 byte

    // CMP
    CMP_REG_WITH_REG: 20,           // Needs next 1 byte
    CMP_REGADDRESS_WITH_REG: 21,    // Needs next 1 byte
    CMP_ADDRESS_WITH_REG: 22,       // Needs next 2 bytes
    CMP_NUMBER_WITH_REG: 23,        // Needs next 2 bytes

    // JMP
    JMP_REGADDRESS: 30,             // Needs next 1 byte
    JMP_ADDRESS: 31,                // Needs next 1 byte
    JC_REGADDRESS: 32,              // Needs next 1 byte
    JC_ADDRESS: 33,                 // Needs next 1 byte
    JNC_REGADDRESS: 34,             // Needs next 1 byte
    JNC_ADDRESS: 35,                // Needs next 1 byte
    JZ_REGADDRESS: 36,              // Needs next 1 byte
    JZ_ADDRESS: 37,                 // Needs next 1 byte
    JNZ_REGADDRESS: 38,             // Needs next 1 byte
    JNZ_ADDRESS: 39,                // Needs next 1 byte
    JA_REGADDRESS: 40,
    JA_ADDRESS: 41,
    JNA_REGADDRESS: 42,
    JNA_ADDRESS: 43,

    // PUSH
    PUSH_REG: 50,                   // Needs next 1 byte
    PUSH_REGADDRESS: 51,            // Needs next 1 byte
    PUSH_ADDRESS: 52,               // Needs next 1 byte
    PUSH_NUMBER: 53,                // Needs next 1 byte

    // POP
    POP_REG: 54,                    // Needs next 1 byte

    // CALL
    CALL_REGADDRESS: 55,
    CALL_ADDRESS: 56,

    // RET
    RET: 57,

    // MUL
    MUL_REG: 60,                    // Needs next 1 byte
    MUL_REGADDRESS: 61,             // Needs next 1 byte
    MUL_ADDRESS: 62,                // Needs next 1 byte
    MUL_NUMBER: 63,                 // Needs next 1 byte

    // DIV
    DIV_REG: 64,
    DIV_REGADDRESS: 65,
    DIV_ADDRESS: 66,
    DIV_NUMBER: 67,

    // AND
    AND_REG_WITH_REG: 70,
    AND_REGADDRESS_WITH_REG: 71,
    AND_ADDRESS_WITH_REG: 72,
    AND_NUMBER_WITH_REG: 73,

    // OR
    OR_REG_WITH_REG: 74,
    OR_REGADDRESS_WITH_REG: 75,
    OR_ADDRESS_WITH_REG: 76,
    OR_NUMBER_WITH_REG: 77,

    // XOR
    XOR_REG_WITH_REG: 78,
    XOR_REGADDRESS_WITH_REG: 79,
    XOR_ADDRESS_WITH_REG: 80,
    XOR_NUMBER_WITH_REG: 81,

    // NOT
    NOT_REG: 82,

    // SHL
    SHL_REG_WITH_REG: 90,
    SHL_REGADDRESS_WITH_REG: 91,
    SHL_ADDRESS_WITH_REG: 92,
    SHL_NUMBER_WITH_REG: 93,

    // SHR
    SHR_REG_WITH_REG: 94,
    SHR_REGADDRESS_WITH_REG: 95,
    SHR_ADDRESS_WITH_REG: 96,
    SHR_NUMBER_WITH_REG: 97
}