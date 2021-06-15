const CommandsManager = require('./managers/commands-manager.js');
const dotenv = require('dotenv');

class Client {

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
    const command = await this.commands.get(interaction.request.data.name);
    const security = command.security(await interaction.author());
    switch (security.pass) {
      case true:
      command.execute(interaction);
      break;
    
      case false:
      interaction.responseType = 3;
      interaction.sendEphemeral(`You are missing permissions to run this command: \`${security.missingPermissions.join(' | ').replace(/_/g, ' ')}\``);
    }
  }
}

module.exports = Client;