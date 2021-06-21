const CommandsManager = require('./managers/commands-manager.js');
const dotenv = require('dotenv');

class LocalClient {

  /**
   * Client for managing local
   * @property {CommandsManager} commands manage commands
   * @property {string} token bot token
   */
  constructor() {
    dotenv.config();
    this.commands = new CommandsManager(process.env.COMMANDS_FOLDER);
    this.token = process.env.BOT_TOKEN;
  }


  /**
   * Finds requested command
   * @param {Interaction} interaction interaction 
   */
  async matchCommand(interaction){
    await this.commands.match(interaction);
  }


  /**
   * Sync Discord with local commands
   * @param {Discord.Client} client discord client 
   */
  async syncCommands(client) {
    await this.commands.sync(client);
  }
}

module.exports = LocalClient;