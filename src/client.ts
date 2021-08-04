import Discord from 'discord.js';
import dotenv from 'dotenv';
import { Command, SubCommand } from './structures/command';
import { CommandsFolder } from './structures/folder';

class InteractionsHandler {
commandsFolder: CommandsFolder;

  constructor() {
    dotenv.config();
    this.commandsFolder = new CommandsFolder(process.env.COMMANDS_FOLDER || "commands");
  }

  
  async handleInteraction(client: Discord.Client, interaction: Discord.Interaction){

    // If command
    if (interaction.isCommand()) {

      // Determine command type
      const commandType: string = interaction.options?.data?.[0]?.type || "COMMAND";
      
      // Handle base on command type
      switch (commandType) {
        case "COMMAND":
        var command = <Command>this.commandsFolder.command(interaction.commandName);
        await command.execute?.();
        break;

        case "SUB_COMMAND":
        var command = <Command>this.commandsFolder.command(interaction.commandName);
        var subcommand = <SubCommand>command.options?.get(interaction.options.getSubcommand());
        await subcommand.execute?.();
        break;

        case "SUB_COMMAND_GROUP":
        console.log(3)
      }
    }
  }

  async syncCommands(client: Discord.Client) {
  }
}

export default InteractionsHandler;