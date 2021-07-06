const Options = require('../utilities/command.js');

class SubCommand {

  /**
   * Sub command structure
   * @param {array<Field>} [options] subcommand options
   */
  constructor(options) {
    this.options = new Options(options);
  }

  
  // Returns class as object
  get data() {
    return({
      name: this.name,
      description: this.description,
      type: 1,
      options: this.options.data
    })
  }
}


module.exports = SubCommand;