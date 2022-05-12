import Discord from 'discord.js';

import { getFilePaths, deleteCache } from "../services/file-system";
import { undefinedOnError } from '../services/error-handling';
import CommandsMap from './commands-map';
import { Command } from './slash-command';
import { MessageCommand, UserCommand } from './menu-command';

/**
 * Main structure for managing commands and interactions.
 */
export class InteractionsHandler {
  /**
   * A map of commands with additional command navigation functions.
   */
  public readonly commands: CommandsMap = new CommandsMap;
  /**
   * Finds matching command and executes it.
   * @param interaction The interaction received
   */
  async handleInteraction(interaction: Discord.Interaction) {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
      let subcommand = undefinedOnError(() => (interaction.options as Discord.CommandInteractionOptionResolver)?.getSubcommand());
      let subcommandGroup = undefinedOnError(() => (interaction.options as Discord.CommandInteractionOptionResolver)?.getSubcommandGroup());
      const command = this.commands.getCommand([interaction.commandName, subcommandGroup, subcommand]);
      if (command) await command.execute(interaction);
    }
  }
  /**
   * Stores commands to commands property.
   * Can be used to reload commands.
   */
  loadCommands(commandsDir: string) {
    this.commands.clear();
    deleteCache(commandsDir);
    for (let commandPath of getFilePaths(commandsDir)) {
      const command = require(commandPath);
      if(command instanceof Command || command instanceof UserCommand || command instanceof MessageCommand) {
        this.commands.set(command.name, command);
      }
    }
  }
}