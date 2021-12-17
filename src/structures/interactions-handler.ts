import Discord from 'discord.js';
import dotenv from 'dotenv';
import CommandsMap from './commands-map';
import Folder from './folder';
import { MessageCommand, UserCommand } from "./menu-command-consumer";

export class InteractionsHandler {
  public readonly commandsFolder: Folder;
  public readonly commands: CommandsMap = new CommandsMap();
  constructor(commandsFolderPath: string) {
    dotenv.config();
    this.commandsFolder = new Folder(commandsFolderPath);
    this.commands = new CommandsMap();
  }

  async handleInteraction(interaction: Discord.Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = this.commands.getCommand([interaction.commandName, interaction.options.getSubcommandGroup(), interaction.options.getSubcommand()]);
      await command?.execute(interaction);
    }
  }

  async handleMessage(message: Discord.Message) {
    if (message.type == "REPLY") {
      const command = this.commands.get(message.content.toLowerCase()) as MessageCommand | UserCommand;
      if (command) await command.onReply(message);
    }
  }

  reloadCommands() {
    this.commands.clear();
    this.commandsFolder.deleteCache();
    this.loadCommands();
  }

  loadCommands() {
    for (let command of this.commandsFolder.files) {
      this.commands.set(command.name, command);
      if (!command.aliases) continue;
      for (let alias of command.aliases) {
        this.commands.set(alias, command);
      }
    }
  }
}