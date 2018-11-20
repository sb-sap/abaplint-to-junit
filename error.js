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
      this.row = found[3];
      this.error = found[4];

      this.valid = true;
    }
  }

  isValid() {
      return this.valid;
  }

  toString() {
    return "file: %s\nline: %s\nrow: %s\nerror: %s".format(
      this.file,
      this.line,
      this.row,
      this.error
    );
  }
}

module.exports = Error;
