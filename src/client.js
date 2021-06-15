const CommandsManager = require('./managers/commands-manager.js');
const dotenv = require('dotenv');

class Client {

  /**
   * Client for managing local
   */
  constructor() {
    dotenv.config();
    this.commands = new CommandsManager(process.env.COMMANDS_FOLDER);
  }
}

module.exports = Client;