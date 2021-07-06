const Options = require('../utilities/command.js');

class SubCommandGroup {

  /**
   * Sub command group structure
   * @param {array<SubCommand>} options subcommand group options
   */
  constructor(options) {
    this.options = new Options(options);
  }


  // Returns class as object
  get data() {
    return({
      name: this.name,
      description: this.description,
      type: 2,
      options: this.options.data
    })
  }
}

module.exports = SubCommandGroup;