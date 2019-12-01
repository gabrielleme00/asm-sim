import * as utils from './utils.js';
import { Opcodes } from './opcodes.js';

/**
 * Returns the number equivalent of the given
 * register name.
 * If the register is not found, raises an exception.
 * @param {String} char GP Register (A, B, C, D)
 */
function getReg(name) {
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

export class Compiler {
    /**
     * Compiles a given raw assembly code
     * and returns an array of bytes.
     * @param {String} rawCode Assembly code
     */
    compile(rawCode) {
        let result = [];

        let lines = rawCode
            .trim()
            .replace(/;.*/g, '')
            .split('\n')
            .map(line => line.trim().replace(/ +/g, ' '));

        lines.forEach(line => {
            if (line == "") return;

            let instr = line.slice(0, 3).toUpperCase();
            let args = line
                .slice(4, line.length)
                .replace(/ +/g, '')
                .split(',');

            this.interpret(instr, args).forEach(value => {
                result.push(value);
            });
            
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
        const opcodes = Opcodes;
        let result = [];

        switch (instr) {
            case "INC":
                result.push(opcodes.INC_REG);
                result.push(getReg(args[0]));
                break;

            case "DEC":
                result.push(opcodes.DEC_REG);
                result.push(getReg(args[0]));
                break;

            case "ADD":
                // TODO
                // Check if arg 2 exists
                // Check type of arg 2
                // Push correct values to result
                
                break;

            case "HLT":
                result.push(0);
                break;

            default:
                throw "Command unknown: " + instr;
        }

        return result;
    }
}