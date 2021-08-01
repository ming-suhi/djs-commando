import Discord from 'discord.js';
import dotenv from 'dotenv'
import CommandsFolder from './structures/commands-folder';

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
      const commandType: string = interaction.options.data?.[0]?.type || "COMMAND";

      // Handle base on command type
      switch (commandType) {
        case "COMMAND":
        console.log(1)
        break;

        case "SUB_COMMAND":
        console.log(2)
        break

        case "SUB_COMMAND_GROUP":
        console.log(3)
      }
    }
  }


  async syncCommands(client: Discord.Client) {
  }
}

export { InteractionsHandler };