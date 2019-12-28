/**
 * A class to represent the snake in the game
 * NB this class does not control map boundaries in a general sense, that should be the responsibility of the game.
 */
class Snake {

    /**
     * The contract is that the x positions and y positions are sane
     * When dx = 0 have the Snake not moving in the x direction
     * When dy = 0 have the Snake not moving in the y direction
     * @param posX the x coordinate provided
     * @param posY the y coordinate provided
     */
    constructor(posX, posY) {
        this.xloc = posX;
        this.yloc = posY;
        // Use a notion of position
        this.dx = 1;
        this.dy = 1;
        // Instantiate the positions that are being used
        this.positions = [
            new BodyPart(posX, posY),
            new BodyPart(posX, posY - 1),
            new BodyPart(posX, posY - 2)
        ]
    }

    /**
     * Grow the worm by a standard amount
     */
    grow(bigX, bigY) {
        let lIndex = this.positions.length - 1;
        // Get the positions to use
        let fPart = this.positions[lIndex].getPos();
        let sPart = this.positions[lIndex - 1].getPos();
        // If the two x-cordinates are equal
        console.log(`first: ${fPart["x"]} ${fPart["y"]} second: ${sPart["x"]} ${sPart["y"]}`);
        let given;
        if (fPart["x"] === sPart["x"]) {
            // Grow along x axis
            if (fPart["y"] > sPart["y"]) {
                given = new BodyPart(fPart["x"], fPart["y"] + 1);
            } else {
                given = new BodyPart(fPart["x"], fPart["y"] - 1);
            }
        } else {
            // Grow along the y axis
            if (fPart["x"] > sPart["x"]) {
                given = new BodyPart(fPart["x"] + 1, fPart["y"]);
            } else {
                given = new BodyPart(fPart["x"] - 1, fPart["y"]);
            }
        }
        // Check the validity of growing, and then push as appropriate
        if (this.checkValidity(given, bigX, bigY)) {
            return false;
        } else {
            this.positions.push(given);
            return true;
        }
    }

    /**
     * Check the validity of operation
     * If it overflows not allowed
     * @param BodyPart
     * @param bigX as an X param
     * @param bigY as a Y param
     * @returns {boolean}
     */
    checkValidity(BodyPart, bigX, bigY) {
        let choose = BodyPart.getPos();
        console.log(`x:${choose["x"]} and y:${choose["y"]}`);
        if (choose["x"] >= bigX || choose["x"] < 0) {
            return true;
        }
        if (choose["y"] >= bigY || choose["y"] < 0) {
            return true;
        }
        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i].equals(BodyPart)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the tail of the snake
     * @returns {{x: *, y: *}}
     */
    getTail() {
        return this.positions[this.positions.length - 1].getPos();
    }

    /**
     * Get the head of the snake.
     * @returns {{x: *, y: *}}
     */
    getHead() {
        return this.positions[0].getPos();
    }

    /**
     * Move the snake in a given direction
     * Logic is that hold an old position, and if all is fine then we can move it as appropriate.
     */
    moveSnake() {
        let part = this.positions[0];
        let old = part.getPos();
        if (this.dx === 0 && this.dy === 1) {
            // Move up
            part.moveUp();
        } else if (this.dx === 1 && this.dy === 0) {
            // Move right
            part.moveRight();
        } else if (this.dx === 1 && this.dy === 1) {
            // Move down
            part.moveDown();
        } else {
            // Move down
            part.moveLeft();
        }
        this.positions[0] = part;
        for (let index = 1; index < this.positions.length; index++) {
            let temp = this.positions[index].getPos();
            this.positions[index].convert(old);
            old = temp;
        }
        return this.checkMove(part.getPos());
    }

    /**
     * Need to check if the move is valid or not
     * @param part
     */
    checkMove(part) {
        for (let i = 1; i < this.positions.length; i++) {
            let pos = this.positions[i].getPos();
            if (part["x"] === pos["x"] && part["y"] === pos["y"])
                return false;
        }
        return true;
    }

    /**
     * Move upwards
     * @returns {boolean}
     */
    moveLeft() {
        let second = this.positions[1].getPos();
        let first = this.positions[0].getPos();
        if (first["x"] - 1 === second["x"] && first["y"] === second["y"]) return false;
        this.dx = 0;
        this.dy = 0;
        return true;
    }

    /**
     * Move upwards
     * @returns {boolean}
     */
    moveUp() {
        let second = this.positions[1].getPos();
        let first = this.positions[0].getPos();
        if (first["y"] - 1 === second["y"] && first["x"] === second["x"]) return false;
        this.dx = 0;
        this.dy = 1;
        return true;
    }

    /**
     * Move to the right
     * @returns {boolean}
     */
    moveRight() {
        let second = this.positions[1].getPos();
        let first = this.positions[0].getPos();
        if (first["x"] + 1 === second["x"] && first["y"] === second["y"]) return false;
        this.dx = 1;
        this.dy = 0;
        return true;
    }

    /**
     * Move downwards
     * @returns {boolean}
     */
    moveDown() {
        let second = this.positions[1].getPos();
        let first = this.positions[0].getPos();
        if (first["y"] + 1 === second["y"] && first["x"] === second["x"]) return false;
        this.dy = 1;
        this.dx = 1;
        return true;
    }

    /**
     * Get the positions of the snake in the game
     * @returns {[]}
     */
    getPositions() {
        let ret = [];
        for (let i = 0; i < this.positions.length; i++) {
            ret.push(this.positions[i].getPos())
        }
        return ret;
    }
}

