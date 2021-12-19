import Discord from 'discord.js';
import dotenv from 'dotenv';
import CommandsMap from './commands-map';
import Folder from './folder';
import { MessageCommand, UserCommand } from "./menu-command-consumer";

/**
 * Main structure for managing commands and interactions.
 */
export class InteractionsHandler {
  /**
   * The folder structure managing commands.
   */
  public readonly commandsFolder: Folder;
  /**
   * A map of commands with additional command navigation functions.
   */
  public readonly commands: CommandsMap;
  constructor() {
    dotenv.config();
    if(!process.env.COMMANDS_FOLDER) new Error("Commands' Folder Path Not Defined.");
    this.commandsFolder = new Folder(process.env.COMMANDS_FOLDER!);
    this.commands = new CommandsMap();
    this.loadCommands();
  }
  /**
   * Finds matching command and executes it.
   * @param interaction The interaction received
   */
  async handleInteraction(interaction: Discord.Interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = this.commands.getCommand([interaction.commandName, interaction.options.getSubcommandGroup(), interaction.options.getSubcommand()]);
      if (command) await command.execute(interaction);
    }
  }
  /**
   * Checks if message is a command, and executes matching command.
   * @param message The message received
   */
  async handleMessage(message: Discord.Message) {
    if (message.type == "REPLY") {
      const command = this.commands.get(message.content.toLowerCase()) as MessageCommand | UserCommand;
      if (command) await command.onReply(message);
    }
  }
  /**
   * Reload commands to see changes.
   */
  reloadCommands() {
    this.commands.clear();
    this.commandsFolder.deleteCache();
    this.loadCommands();
  }
  /**
   * Stores commands to commands property.
   */
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