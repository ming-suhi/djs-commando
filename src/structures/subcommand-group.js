const {Options} = require('../utilities/command.js');

class SubCommandGroup {

  /**
   * Sub command group structure
   * @param {array<SubCommand>} options subcommand group options
   * @property {string} name subcommand group name
   * @property {string} description subcommand group description
   */
  constructor(options) {
    this.options = options;
    this._options = new Options(options);
  }


  // Returns class as object
  get data() {
    return({
      name: this.name,
      description: this.description,
      type: 2,
      options: this._options.data
    })
  }
}

module.exports = SubCommandGroup;