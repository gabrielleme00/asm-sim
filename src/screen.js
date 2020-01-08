/**
 * An LCD-like screen module
 */

"use strict";

import { Charmap } from './charmap.js';

export class Screen {
    constructor(canvas, pixelSize, pixelColor) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.pixelSize = pixelSize;
        this.pixelColor = pixelColor;
    }

    drawPixel(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.pixelColor;
        this.ctx.fillRect(
            x * this.pixelSize,
            y * this.pixelSize,
            this.pixelSize,
            this.pixelSize
        );
    }

    drawChar(ascii, column, line) {
        const bitmap = this.decodeChar(ascii);
        const rows = bitmap.length;
        const cols = bitmap[0].length;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (bitmap[y][x]) {
                    this.drawPixel(
                        x + (column * this.pixelSize),
                        y + (line * this.pixelSize)
                    );
                }
            }
        }
    }

    /**
     * Returns a bitmap from an ASCII value.
     * @param {Number} value ASCII char value
     */
    decodeChar(value) {
        if (typeof(value) == "number") {
            return Charmap[value];
        }
        
        if (typeof(value) == "string") {
            return Charmap[value.charCodeAt(0)];
        }

        throw "Unknown ASCII value type: " + value;
    }
}