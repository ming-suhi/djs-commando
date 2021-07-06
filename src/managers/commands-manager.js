const Folder = require('../structures/folder.js');
const InteractionService = require('../structures/interaction-service.js');
const {commandType} = require('../utilities/command.js');


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

      // Slash Commands
      case 2:
      switch(commandType(interaction)) {

        // Command
        case 0:
        var command = this.get(interaction.data.name);
        await command.execute(service);
        break;

        // SubCommand
        case 1:
        var command = this.get(interaction.data.name);
        var subcommand = command.options.find(option => option.name == interaction.data.options[0].name);
        await subcommand.execute(service);
        break;

        // SubCommand inside SubCommandGroup
        case 2:
        var command = this.get(interaction.data.name);
        var subcommandgroup = command.options.find(option => option.name == interaction.data.options[0].name);
        var subcommand = subcommandgroup.options.find(option => option.name == interaction.data.options[0].options[0].name);
        await subcommand.execute(service);
      }
      break;

      // Message Components
      case 3:
      switch(commandType(interaction)) {

        // Command
        case 0:
        var command = this.get(interaction.data.name);
        switch (interaction.data.component_type) {
          case 2:
          await command.onPress(service);
          break;

          case 3:
          await command.onSelect(service);
        }
        break;

        // SubCommand
        case 1:
        var command = this.get(interaction.data.name);
        var subcommand = command.options.find(option => option.name == interaction.data.options[0].name);
        switch (interaction.data.component_type) {
          case 2:
          await subcommand.onPress(service);
          break;

          case 3:
          await subcommand.onSelect(service);
        }
        break;

        // SubCommand inside SubCommandGroup
        case 2:
        var command = this.get(interaction.data.name);
        var subcommandgroup = command.options.find(option => option.name == interaction.data.options[0].name);
        var subcommand = subcommandgroup.options.find(option => option.name == interaction.data.options[0].options[0].name);
        switch (interaction.data.component_type) {
          case 2:
          await subcommand.onPress(service);
          break;

          case 3:
          await subcommand.onSelect(service);
        }
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
      command.post(client);
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