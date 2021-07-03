const Folder = require('../structures/folder.js');
const InteractionService = require('../structures/interaction-service.js');


class CommandsManager extends Folder {


  /**
   * Main class for managing commands
   * @param {folderPath} path absolute path to folder
   * @property {folderPath} path absolute path to folder
   * @augments Folder
   */
  constructor(path) {
    super(path);
  }


  /**
   * Handles interactions
   * @param {Discord.Client} client instance of Discord Client 
   * @param {Discord.Interaction} interaction interaction object
   */
  async match(client, interaction){

    var service = new InteractionService(client, interaction);

    switch(interaction.type) {

      // Handle commands
      case 2:
      var command = this.get(interaction.data.name);
      await new command().execute(service);
      break;

      // Handle components
      case 3:
      var command = this.get(interaction.message.interaction.name);
      switch(interaction.data.component_type) {

        // Handle buttons
        case 2:
        await new command().onPress(service);
        break;

        // Handle select menus
        case 3:
        await new command().onSelect(service);
      } 
    }
  }


  /**
   * Sync commands in commands folder with Discord
   * @param {Discord.Client} client instance of Discord Client
   */
  async sync(client){

    // Post all commands in commandsFolder
    var commands = this.get();
    for (let command of commands) {
      new command().post(client);
    }

    // Delete from Discord unexisting commands
    var commands = await client.api.applications(client.user.id).commands.get();
    for (let command of commands) {
      try {
        this.get(command.name);
      }catch{
        await client.api.applications(client.user.id).commands(command.id).delete();
      }
    }
  }
}

module.exports = CommandsManager;