import * as utils from './utils.js';
import { Opcodes } from './opcodes.js';

/**
 * Returns the number equivalent of the given
 * register name.
 * If the register is not found, raises an exception.
 * @param {String} char GP Register (A, B, C, D)
 */
function getReg(name) {
    name = name.replace(/\[|\]/g, '');

    switch (name.toUpperCase()) {
        case 'A':
            return 0;

        case 'B':
            return 1;

        case 'C':
            return 2;

        case 'D':
            return 3;

        default:
            throw "Unknown register: " + name;
    }
}

/**
 * Returns true if the arguments' length is enough
 * for the given instruction.
 * 
 * If the instruction is unknown, raises an exception.
 * @param {String} instr Instruction 
 * @param {Array<String>} args Arguments array
 */
function hasEnoughArgs(instr, args) {
    switch (instr) {
        case "INC":
            return args.length >= 1;

        case "ADD":
        case "DEC":
            return args.length >= 2;

        default:
            throw "Unknown arguments count for " + instr;
    }
}

/**
 * Returns true if the given string can be
 * converted to an integer.
 * @param {String} str Any string
 */
function isNum(str) {
    return Number.isInteger(parseInt(str.trim()));
}

/**
 * Returns true if the given string represents
 * a valid register.
 * @param {String} str Any string
 */
function isReg(str) {
    switch (str.trim().toUpperCase()) {
        case 'A':
        case 'B':
        case 'C':
        case 'D':
            return true;

        default:
            return false;
    }
}

/**
 * Returns true if the given string represents
 * an address.
 * @param {String} str Any string
 */
function isAddr(str) {
    // Check if the string has at least 3 chars ("[X]")
    if (str.length < 3) {
        return false;
    }

    // Check if the first and the last chars indicate an address
    if (str[0] != '[' || str[str.length - 1] != ']') {
        return false;
    }

    return true;
}

/**
 * Returns true if the given string represents
 * the address of a register.
 * @param {String} str Any string
 */
function isRegAddr(str) {
    // Check if the string has 3 chars ("[X]"),
    // where 'X' is a register char,
    // and if the inner char is a valid register
    return str.length === 3 && isReg(str.charAt(1));
}

export class Compiler {
    /**
     * Compiles a given raw assembly code
     * and returns an array of bytes.
     * @param {String} rawCode Raw assembly code
     */
    compile(rawCode) {
        let result = [];

        let lines = rawCode
            .trim()
            .replace(/;.*/g, '')
            .split('\n')
            .map(line => line.trim().replace(/ +/g, ' '));

        lines.forEach((line, i) => {
            // Skip empty lines
            if (line == "") return;

            // Gets the exact uppercase instruction
            let instr = line.slice(0, 3).toUpperCase();

            // Array of arguments
            let args = line
                .slice(4, line.length)
                .replace(/ +/g, '')
                .split(',');

            try {
                // Interpret each line
                this.interpret(instr, args).forEach(value => {
                    result.push(value);
                });
            } catch (error) {
                throw `Compile error at line ${i}:\n${error}`;
            }

        });

        return result;
    }

    /**
     * Returns an array of decodable values based on an
     * instruction and it's arguments.
     * 
     * If the instruction is not found, an exception is raised.
     * @param {String} instr Instruction
     * @param {Array<String>} args Array of arguments
     */
    interpret(instr, args) {
        const op = Opcodes;
        let result = [];

        // Check HALT instruction
        if (instr == "HLT") {
            result.push(0);
            return result;
        }

        // Check if argument count is enough for the instruction
        if (!hasEnoughArgs(instr, args)) {
            throw instr + " needs more arguments";
        }

        switch (instr) {
            case "INC":
                result.push(op.INC_REG);
                result.push(getReg(args[0]));
                break;

            case "DEC":
                result.push(op.DEC_REG);
                result.push(getReg(args[0]));
                break;

            case "ADD":
                if (isNum(args[1])) {
                    result.push(op.ADD_NUMBER_TO_REG);
                    result.push(getReg(args[0]));
                    result.push(utils.confine(parseInt(args[1])));

                } else if (isReg(args[1])) {
                    result.push(op.ADD_REG_TO_REG);
                    result.push(utils.compress(
                        getReg(args[0]), getReg(args[1])
                    ));

                } else if (isRegAddr(args[1])) {
                    result.push(op.ADD_REGADDRESS_TO_REG);
                    result.push(utils.compress(
                        getReg(args[0]), getReg(args[1]) 
                    ));

                } else if (isAddr(args[1])) {
                    // TODO: Support relative-to-reg-value addresses
                    result.push(op.ADD_ADDRESS_TO_REG);
                    result.push(getReg(args[0]));
                    result.push(utils.confine(parseInt(args[1])));
                } else {
                    throw "2nd argument is of unknown type in "
                    + instr + " instruction";

                }
                break;

            default:
                throw "Instruction unknown: " + instr;
        }

        return result;
    }
}