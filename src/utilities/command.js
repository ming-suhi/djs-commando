class Options {

  // Class for parsing classes
  constructor(options) {
    this.options = options;
  }


  // Returns classes as object
  get data() {
    var options = [];
    for (let option in this.options) {
      options.push(this.options[option].data);
    }
    return options;
  }
}

module.exports = {Options};