const CommandsManager = require('./managers/commands-manager.js');
const Interaction = require('./structures/interaction.js');
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
   * @param {Discord.client} client instance of discord client 
   * @param {request} request user request
   */
  async matchCommand(client, request){
    const interaction = new Interaction(client, request);

    switch(request.type) {
      case 2:
      await this.commands.match(interaction);
      break;

      case 3:
      console.log("Buttons not supported yet");
    }
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