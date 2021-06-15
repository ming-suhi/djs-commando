const Command = require('./command.js');

class GlobalCommand extends Command{
  /**
   * Global Command Structure
   * @augments Command
   * @param {command} data command data
   */
  constructor(data) {
    super();
    Object.assign(this, data);
  }
}

module.exports = GlobalCommand;