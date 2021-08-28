import Discord from 'discord.js';
import dotenv from 'dotenv';
import { Command, SubcommandGroup, Subcommand, UserCommand, CommandStructures, MessageCommand } from './structures/command';
import { Folder } from './structures/folder';

/** Structure for managing interactions */
export class InteractionsHandler {
  /** Structure for managing commands folder */
  public readonly commandsFolder: Folder;
  /** Structure for storing commands */
  public readonly commands: Map<string, CommandStructures>;

  constructor() {
    dotenv.config();
    this.commandsFolder = new Folder(process.env.COMMANDS_FOLDER || "commands");
    this.commands = new Map();
    this.initializeCommands();
  }

  /**
   * Handle interactions depending on its type
   * @param interaction Discord interaction
   */
  async handleInteraction(interaction: Discord.Interaction){

    // If command
    if (interaction.isCommand()) {

      // Determine command type
      const commandType: string = interaction.options.data?.[0]?.type || "COMMAND";
      
      // Handle based on command type
      switch (commandType) {
        case "COMMAND":
        var command = <Command>this.commands.get(interaction.commandName);
        await command.execute?.(interaction);
        break;

        case "SUB_COMMAND":
        var command = <Command>this.commands.get(interaction.commandName);
        var subcommand = <Subcommand>command.options?.get(interaction.options.getSubcommand());
        await subcommand.execute?.(interaction);
        break;

        case "SUB_COMMAND_GROUP":
        var command = <Command>this.commands.get(interaction.commandName);
        var subcommandgroup = <SubcommandGroup>command.options?.get(interaction.options.getSubcommandGroup());
        var subcommand = <Subcommand>subcommandgroup.options?.get(interaction.options.getSubcommand());
        await subcommand.execute?.(interaction);
      }
    }

    // If user command
    if (interaction.isContextMenu()) {
      var userCommand = <UserCommand|MessageCommand>this.commands.get(interaction.commandName.toLowerCase());
      await userCommand.execute?.(interaction);
    }
  }

  /**
   * Update slash commands
   * @param _client Discord Client
   */
  async syncCommands(_client: Discord.Client) {
    var client = <any>_client;

    // Update and post commands
    var commands = <any>this.commandsFolder.files;
    for (let command of commands) {
      await client.api.applications(client.user?.id).commands.post({data: command.data});
    }

    // Delete unexisting commands
    var commands = await client.api.applications(client.user.id).commands.get();
    for (let command of commands) {
      try {
        this.commandsFolder.file(command.name);
      } catch {
        await client.api.applications(client.user.id).commands(command.id).delete();
      }
    }
  }

  // Stores commands to memory
  initializeCommands() {
    for (let command of this.commandsFolder.files) {
      this.commands.set(command.name.toLowerCase(), command);
    }
  }
}