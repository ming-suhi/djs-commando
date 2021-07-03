const CommandsManager = require('./managers/commands-manager.js');
const dotenv = require('dotenv');

class LocalClient {

  constructor() {
    dotenv.config();
    this.commands = new CommandsManager(process.env.COMMANDS_FOLDER);
    this.token = process.env.BOT_TOKEN;
  }

  async matchCommand(client, interaction){
    await this.commands.match(client, interaction);
  }

  async syncCommands(client) {
    await this.commands.sync(client);
  }
}

module.exports = LocalClient;