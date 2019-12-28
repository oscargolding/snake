/**
 * A class for representing the body parts of a snake
 * Boundary checking won't happen within this class, it's not a responsibility
 */
class BodyPart {

    /**
     * Create a body part for the snake
     * @param posX the x position on the board
     * @param posY the y position on the board
     */
    constructor(posX, posY) {
        this.xlocation = posX;
        this.ylocation = posY;
    }

    /**
     * Get the position of the snake body part
     * @returns {{x: *, y: *}}
     */
    getPos() {
        return {
            x:this.xlocation,
            y:this.ylocation
        }
    }
    /**
     * Move the part upwards
     */
    moveUp() {
        this.ylocation--;
    }

    /**
     * Move the part downwards
     */
    moveDown() {
        this.ylocation++;
    }

    /**
     * Move the part to the left
     */
    moveLeft() {
        this.xlocation--;
    }

    /**
     * Move the part to the right
     */
    moveRight() {
        this.xlocation++;
    }

    /**
     * Check if two body parts are equal to each other
     * @param other as the provided body part that's being compared against
     * @returns {boolean|boolean}
     */
    equals(other) {
        let part = other.getPos();
        return this.xlocation === part["x"] && this.ylocation === part["y"];
    }

    /**
     * Convert the part over
     * @param part as a BodyPart
     */
    convert(part) {
       this.xlocation = part["x"];
       this.ylocation = part["y"];
    }
}

