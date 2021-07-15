const Folder = require('../structures/folder.js');
const InteractionService = require('../structures/interaction-service.js');
const SubCommand = require('../structures/subcommand.js');
const SubCommandGroup = require('../structures/subcommand-group.js');


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
      switch(interaction?.data?.options?.[0]?.type) {

        // Command
        case undefined:
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
      var command = this.get(interaction.message.interaction.name);
      switch (interaction.data.component_type) {

        // Button
        case 2:

        // Command
        if (command.buttons) {
          for (let button of command.buttons) {
            if (interaction.data.custom_id == button.custom_id) {
              await command.onPress(service);
              return;
            }
          }
        }
        
        for (let commandOption of command.options) {
          switch (commandOption.constructor.name) {

            // SubCommand
            case SubCommand.name:
              for (let subcommand of command.options) {
                for (let button of subcommand.buttons) {
                  if (interaction.data.custom_id == button.custom_id) {
                    await subcommand.onPress(service);
                    return;
                  }
                }
              }
              break;

            // SubCommandGroup
            case SubCommandGroup.name:
              for (let subcommandgroup of command.options) {
                for (let subcommand of subcommandgroup.options) {
                  for (let button of subcommand.buttons) {
                    if (interaction.data.custom_id == button.custom_id) {
                      await subcommand.onPress(service);
                      return;
                    }
                  }
                }
              }
          }
        }
        break;

        // Select Menus
        case 3:

        // Command
        if (command.menus) {
          for (let menu of command.menus) {
            if (interaction.data.custom_id == menu.custom_id) {
              await command.onSelect(service);
              return;
            }
          }
        }
        
          
        for (let commandOption of command.options) {
          switch (commandOption.constructor.name) {

            // SubCommand
            case SubCommand.name:
              for (let subcommand of command.options) {
                for (let menu of subcommand.menus) {
                  if (interaction.data.custom_id == menu.custom_id) {
                    await subcommand.onSelect(service);
                    return;
                  }
                }
              }
              break;

            // SubCommandGroup
            case SubCommandGroup.name:
              for (let subcommandgroup of command.options) {
                for (let subcommand of subcommandgroup.options) {
                  for (let menu of subcommand.menus) {
                    if (interaction.data.custom_id == menu.custom_id) {
                      await subcommand.onSelect(service);
                      return;
                    }
                  }
                }
              }
          }
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