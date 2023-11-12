"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Snake = /** @class */ (function () {
    function Snake(interval) {
        this.snake = [[10, 10]];
        this.apple = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
        this.direction = [0, -1];
        this.interval = interval !== null && interval !== void 0 ? interval : 1000;
    }
    Snake.prototype.initialize = function () {
        var _this = this;
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY)
            process.stdin.setRawMode(true);
        process.stdin.on('keypress', function (str, key) {
            switch (key.name) {
                case 'up':
                    if (_this.direction[0] !== 1)
                        _this.direction = [-1, 0];
                    break;
                case 'down':
                    if (_this.direction[0] !== -1)
                        _this.direction = [1, 0];
                    break;
                case 'left':
                    if (_this.direction[0] !== 1)
                        _this.direction = [0, -1];
                    break;
                case 'right':
                    if (_this.direction[0] !== -1)
                        _this.direction = [0, 1];
                    break;
                case 'c':
                    if (key.ctrl)
                        process.exit();
                    break;
            }
        });
        setInterval(function () {
            var head = _this.snake[0].slice();
            head[0] = (head[0] + _this.direction[0] + 20) % 20;
            head[1] = (head[1] + _this.direction[1] + 20) % 20;
            for (var i = 1; i < _this.snake.length; i++) {
                if (_this.snake[i][0] === head[0] && _this.snake[i][1] === head[1]) {
                    console.log('¡Has perdido!');
                    process.exit();
                }
            }
            if (head[0] === _this.apple[0] && head[1] === _this.apple[1])
                _this.apple = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
            else
                _this.snake.pop();
            _this.snake.unshift(head);
            _this.draw();
        }, this.interval);
    };
    Snake.prototype.draw = function () {
        console.clear();
        var _loop_1 = function (i) {
            var row = '';
            var _loop_2 = function (j) {
                if (this_1.snake.find(function (part) { return part[0] === i && part[1] === j; }))
                    row += '🐍';
                else if (this_1.apple[0] === i && this_1.apple[1] === j)
                    row += '🍎';
                else
                    row += '⬜️';
            };
            for (var j = 0; j < 20; j++) {
                _loop_2(j);
            }
            console.log(row);
        };
        var this_1 = this;
        for (var i = 0; i < 20; i++) {
            _loop_1(i);
        }
    };
    return Snake;
}());
var snake = new Snake(1000);
snake.initialize();
