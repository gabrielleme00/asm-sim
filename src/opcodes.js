/*
    List of operation codes

    Notes:
    - Some operations may need a different amount of
    reserved bytes.
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
    ADD_REG_TO_REG: 9,              // Needs next 1 byte
    ADD_REGADDRESS_TO_REG: 10,      // Needs next 1 byte
    ADD_ADDRESS_TO_REG: 11,         // Needs next 2 bytes
    ADD_NUMBER_TO_REG: 12,          // Needs next 2 bytes
    
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
    
    // JMP, JC, JNC, JZ, JNZ, JA, JNA
    JMP_REGADDRESS: 24,             // Needs next 1 byte
    JMP_ADDRESS: 25,                // Needs next 1 byte
    JC_REGADDRESS: 26,              // Needs next 1 byte
    JC_ADDRESS: 27,                 // Needs next 1 byte
    JNC_REGADDRESS: 28,
    JNC_ADDRESS: 29,
    JZ_REGADDRESS: 30,
    JZ_ADDRESS: 31,
    JNZ_REGADDRESS: 32,
    JNZ_ADDRESS: 33,
    JA_REGADDRESS: 34,
    JA_ADDRESS: 35,
    JNA_REGADDRESS: 36,
    JNA_ADDRESS: 37,

    // PUSH, POP
    // CALL, RET
    // MUL, DIV
    // AND, OR, XOR, NOT, SHL, SHR
    
    STOP: 255
}