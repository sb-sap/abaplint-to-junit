const re = /^\s*(.*)\[(\d*),\s(\d*)\]\s*-\s(.*)/i;

String.prototype.format = function() {
    return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
};

class Error {
    /**
     * @param {string} line
     */
    constructor(line) {
        this.parseError(line);
    }

    /**
     *
     * @param {string} line
     */
    parseError(line) {
        var found = line.match(re);

        if (found !== null) {
            this.file = found[1];
            this.line = found[2];
            this.position = found[3];
            this.error = found[4];

            this.valid = true;
        }
    }

    isValid() {
        return this.valid;
    }

    getClassname() {
        return this.file.replace('src/', '').replace(new RegExp('#', 'g'), '/');
    }

    getName() {
        return "%s [Line: %s / Position: %s]: %s".format(this.getClassname(), this.line, this.position, this.error);
    }

    toString() {
        return "file: %s\nline: %s\nposition: %s\nerror: %s".format(
            this.file,
            this.line,
            this.position,
            this.error
        );
    }
}

module.exports = Error;