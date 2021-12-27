import Discord from 'discord.js';
import dotenv from 'dotenv';
import ErrorHandlingService from '../services/error-handling';
import CommandsMap from './commands-map';
import Folder from './folder';

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
      let subcommand = ErrorHandlingService.undefinedOnError(() => (interaction.options as Discord.CommandInteractionOptionResolver)?.getSubcommand()) || "";
      let subcommandGroup = ErrorHandlingService.undefinedOnError(() => (interaction.options as Discord.CommandInteractionOptionResolver)?.getSubcommandGroup()) || "";
      const command = this.commands.getCommand([interaction.commandName, subcommandGroup, subcommand]);
      if (command) await command.execute(interaction);
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