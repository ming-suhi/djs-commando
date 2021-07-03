const CommandsManager = require('./managers/commands-manager.js');
const dotenv = require('dotenv');


class LocalClient {


  /**
   * Main class for managing interactions
   * @property {CommandsManager} commands handle commands
   * @property {string} token bot token
   */
  constructor() {
    dotenv.config();
    this.commands = new CommandsManager(process.env.COMMANDS_FOLDER);
    this.token = process.env.BOT_TOKEN;
  }


  /**
   * Handles interactions
   * @param {Discord.Client} client instance of Discord Client 
   * @param {Discord.Interaction} interaction interaction object
   */
  async handleInteraction(client, interaction){
    await this.commands.match(client, interaction);
  }


  /**
   * Sync commands in commands folder with Discord
   * @param {Discord.Client} client instance of Discord Client
   */
  async syncCommands(client) {
    await this.commands.sync(client);
  }
}

module.exports = LocalClient;