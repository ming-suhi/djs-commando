import Discord, { Message } from 'discord.js';
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
    this.loadCommands();
  }

  /**
   * Handle interactions depending on its type
   * @param interaction Discord interaction
   */
  async handleInteraction(interaction: Discord.Interaction){

    // If command
    if (interaction.isCommand()) {

      // Determine command type
      const commandOptionType = interaction.options.data?.[0]?.type
      const commandFields = ["STRING", "INTEGER", "BOOLEAN", "USER", "CHANNEL", "ROLE", "MENTIONABLE", "NUMBER"];
      const commandType: string = commandFields.includes(commandOptionType) || !commandOptionType ? "COMMAND" : commandOptionType;
      
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

    // If context menu command
    if (interaction.isContextMenu()) {
      var userCommand = <UserCommand|MessageCommand>this.commands.get(interaction.commandName.toLowerCase());
      await userCommand.execute?.(interaction);
    }
  }

  /**
   * Handle message command and user command called through reply
   * @param message Discord message
   */
  async handleMessage(message: Message) {
    // If message is a reply
    if (message.type == "REPLY") {
      const command = <MessageCommand|UserCommand>this.commands.get(message.content.toLowerCase());
      if (command) {
        await command.onReply(message);
      }
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
      const exist = this.commands.get(command.name);
      if(!exist) {
        await client.api.applications(client.user.id).commands(command.id).delete();
      }
    }
  }

  /**
   * Post slash command
   * @param _client Discord Client
   * @param name Command name
   */
  async postCommand(_client: Discord.Client, name: string) {
    var client = <any>_client;
    const command = this.commands.get(name);
    if (command) {
      await client.api.applications(client.user?.id).commands.post({data: command.data})
    };
  }
  
  /**
   * Reloads all command
   */
  reloadCommands() {
    this.commandsFolder.deleteCache();
    this.loadCommands();
  }

  // Load all commands
  loadCommands() {
    for (let command of this.commandsFolder.files) {
      console.log(command)
      this.commands.set(command.name, command);
      if(!command.aliases) continue;
      for (let alias of command.aliases) {
        this.commands.set(alias, command);
      }
    }
  }
}