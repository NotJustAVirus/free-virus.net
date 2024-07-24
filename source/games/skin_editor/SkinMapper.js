export class SkinMapper {

    constructor() {
        this.head = new PartArea(8, 8, 8, 0, 0);
        this.hat = new PartArea(8, 8, 8, 32, 0);

        this.body = new PartArea(8, 12, 4, 16, 16);

        this.jacket = new PartArea(8, 12, 4, 16, 32);
        this.rightLeg = new PartArea(4, 12, 4, 0, 16);
        this.rightPants = new PartArea(4, 12, 4, 0, 32);
        this.leftLeg = new PartArea(4, 12, 4, 16, 48);
        this.leftPants = new PartArea(4, 12, 4, 0, 48);
        this.rightArm = new PartArea(4, 12, 4, 16 + 24, 16);
        this.rightSleeve = new PartArea(4, 12, 4, 16 + 24, 32);
        this.leftArm = new PartArea(4, 12, 4, 32, 48);
        this.leftSleeve = new PartArea(4, 12, 4, 48, 48);
        this.parts = [this.head, this.hat, this.body, this.jacket, this.rightLeg, this.rightPants, this.leftLeg, this.leftPants, this.rightArm, this.rightSleeve, this.leftArm, this.leftSleeve];
    }

    onSkin(point) {
        for (let part of this.parts) {
            if (part.onPart(point)) {
                return true;
            }
        }
        return false;
    }

    moveY(point, negative) {
        for (let part of this.parts) {
            if (part.onPart(point)) {
                return part.moveY(point, negative);
            }
        }
        throw new Error('Point not on any part');
    }

    moveX(point, negative) {
        for (let part of this.parts) {
            if (part.onPart(point)) {
                return part.moveX(point, negative);
            }
        }
        throw new Error('Point not on any part');
    }
}


class PartArea {
    currentArea = null;
    constructor(width, height, depth, x, y) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.x = x;
        this.y = y;

        this.mainFace = new Face((width * 2) + (depth * 2), height, x, y + depth);
        this.topFace = new Face(this.width, this.depth, x + depth, y);
        this.bottomFace = new Face(this.width, this.depth, x + depth + width, y);

        this.faces = [this.mainFace, this.bottomFace, this.topFace];
    }

    moveY(point, negative) {
        for (let face of this.faces) {
            if (face.onFace(point)) {
                point.y += negative ? -1 : 1;
                if (face.onFace(point)) {
                    return point;
                } else {
                    if (face == this.mainFace) {
                        var x = face.x;
                        if (point.x < x + this.depth) {
                            point.y = this.y + point.x - x;
                            point.x = x + this.depth;
                        } else if (point.x < x + this.depth + this.width) {
                            point.y = this.y + this.depth - 1;
                        } else if (point.x < x + this.depth + this.width + this.depth) {
                            point.y = this.y + this.depth - 1 - (point.x - x - this.depth - this.width);
                            point.x = x + this.depth + this.width - 1;
                        } else {
                            point.y = this.y;
                            point.x = x + this.depth + this.width - 1 - (point.x - x - this.depth - this.width - this.depth);
                        }
                        if (!negative) {
                            point.x += this.width;
                        }
                        return point;
                    }
                    if (face == this.bottomFace) {
                        point.x -= this.width;
                        point.y = this.y + this.depth + this.height - 1;
                    } else {
                        point.y = this.y + this.depth;
                    }
                    if (negative) {
                        point.x = this.x + this.depth + this.width + this.depth + this.width - 1 - (point.x - (this.x + this.depth));
                    }
                    return point;
                }
            }
        }
        throw new Error('Point not on any face');
    }
    
    moveX(point, negative) {
        for (let face of this.faces) {
            if (face.onFace(point)) {
                point.x += negative ? -1 : 1;
                if (face.onFace(point)) {
                    return point;
                } else {
                    if (face == this.mainFace) {
                        // wrap around
                        if (point.x < face.x) {
                            point.x = face.x + face.width - 1;
                        } else {
                            point.x = face.x;
                        }
                        return point;
                    }
                    if (face == this.bottomFace) {
                        point.x -= this.width;
                    }
                    if (point.x < this.topFace.x) {
                        point.x = this.x - (this.y - point.y);
                    } else {
                        point.x = this.x + this.width + this.depth + this.depth - 1 + (this.y - point.y);
                    }
                    if (face == this.bottomFace) {
                        point.y = this.y + this.depth + this.height - 1;
                    } else {
                        point.y = this.y + this.depth;
                    }
                    return point;
                }
            }
        }
    }

    onPart(point) {
        return this.mainFace.onFace(point) || this.bottomFace.onFace(point) || this.topFace.onFace(point);
    }
}

class Face {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    onFace(point) {
        return point.x >= this.x && point.x < this.x + this.width && point.y >= this.y && point.y < this.y + this.height;
    }
}