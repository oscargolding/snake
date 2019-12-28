class Game {

    constructor(lens) {
        this.snake = new Snake(lens/2, lens/2);
        this.len = lens;
        this.score = 0;
    }

    /**
     * Get the score for the game.
     * @returns {number}
     */
    getScore( ) {
        return this.score;
    }

    /**
     * Get the positions for the snake game.
     * @returns {{applePos: *, snakePos: *[], freePos: *[]}}
     */
    doPositions() {
        let free = this.getFree();
        let found = Math.floor(Math.random() * free.length);
        this.apple = free[found];
        let snake = this.snake.getPositions();
        // Delete only a single position
        this.finalFree = free.splice(found, 1);
        return {
            snakePos: snake,
            applePos: this.apple,
            freePos: free
        };
    }

    /**
     * Call this to normally move the snake (i.e. apple is at a standard position).
     * @returns {{applePos: *, snakePos: *[], freePos: *[]}}
     */
    doNormalPos() {
        let free = this.getFree();
        let snake = this.snake.getPositions();
        return {
            snakePos: snake,
            applePos: this.apple,
            freePos: free
        };
    }

    /**
     * A principle method that runs the game.
     */
    runGame() {
        if (this.snake.moveSnake()) {
            let head = this.snake.getHead();
            if (head["x"] === this.apple["x"] && head["y"] === this.apple["y"]) {
                // hit apple
                if (!this.snake.grow(this.len, this.len)) {
                    return 0;
                }
                this.score++;
                return 1;
            } else if (head["x"] >= this.len || head["x"] < 0 || head["y"] >= this.len || head["y"] < 0) {
                return 0;
            } else {
                // Normal scenario
                return 2;
            }

        }
        // 0 indicating couldn't move snake
        return 0;
    }
    /**
     * Get the free areas
     * @returns {[]}
     */
    getFree() {
        let good = [];
        let pos = this.snake.getPositions();
        for (let i = 0; i < this.len; i++) {
            for (let j = 0; j < this.len; j++) {
                if (!this.checkOverlap(i, j, pos)) {
                    let toUse = {
                        x: i,
                        y: j
                    };
                    good.push(toUse);
                }
            }
        }
        return good;
    }

    checkOverlap(first, second, pos) {
        for (let i = 0; i < pos.length; i++) {
            let get = pos[i];
            if (get["x"] === first && get["y"] === second) {
                return true;
            }
        }
        return false;
    }

    moveLeft() {
        this.snake.moveLeft();
    }

    moveRight() {
        this.snake.moveRight();
    }

    moveDown() {
        this.snake.moveDown();
    }

    moveUp() {
        this.snake.moveUp();
    }

}