import { FieldData, FieldStructures } from './field';
import { CommandInteraction, ContextMenuInteraction, Message } from 'discord.js';

/** Commands structures */
export type CommandStructures = Command | SubcommandGroup | Subcommand | UserCommand | MessageCommand;

/** Options for slash commands */
export type SlashCommandOptions = (SubcommandGroup | Subcommand | FieldStructures)[];

/** Options for command */
export type CommandOptions = (SubcommandGroup | Subcommand)[] | FieldStructures[];

/** Options for subcommand group */
export type SubcommandGroupOptions = Subcommand[];

/** Options for subcommand */
export type SubcommandOptions = FieldStructures[];

/** Interface for command creation */
export interface SlashCommand<TOptions> { 
  /** Command name */
  name: string, 
  /** Command description */
  description: string, 
  /** Command function */
  execute?(interaction: CommandInteraction): void, 
};

/** Interface for command JSON */
export interface SlashCommandData {
  /** Command name */
  name: string,
  /** Command description */
  description: string,
  /** Command options */
  options?: SlashCommandData[],
  /** Command type */
  type: number
}

/** Base structure for slash commands  */
export class SlashCommand<TOptions extends SlashCommandOptions> {
  /** Command type */
  protected readonly type?: number
  /** Command options */
  public readonly options: OptionsManager<TOptions>

  /**
   * @param options Slash command options
   */
  public constructor(options?: TOptions) {
    this.options = new OptionsManager<TOptions>(options);
  }
  
  /**
   * Get the command as JSON object
   */
  public get data(): SlashCommandData {
    const name = this.name;
    const description = this.description;
    const options = this.options.data;
    const type = this.type!;
    return ({ name, description, options, type});
  }
}

/** Structure for creating command */
export class Command extends SlashCommand<CommandOptions> {
  protected readonly type = 1;
}

/** Structure for creating subcommand group */
export class SubcommandGroup extends SlashCommand<SubcommandGroupOptions> {
  protected readonly type = 2;
}

/** Structure for creating subcommand */
export class Subcommand extends SlashCommand<SubcommandOptions> {
  protected readonly type = 1;
}

/** Interface for command creation */
export interface ContextMenuCommand { 
  /** The name of the command */
  name: string, 
  /** The aliases of the command */
  aliases: string[],
  /** Executed when message is sent */
  onReply(message: Message): void,
  /** Executed when command is called */
  execute(interaction: ContextMenuInteraction): void
};

/** Base structure for commands  */
export class ContextMenuCommand {
  /** Command type */
  protected type?: number;

  /**
   * Get the command as JSON object
   */
  public get data() {
    return ({ name: this.name, type: this.type! });
  }
}

/** Structure for creating user command */
export class UserCommand extends ContextMenuCommand {
  protected readonly type = 2;
}

/** Structure for creating message command */
export class MessageCommand extends ContextMenuCommand {
  protected readonly type = 3;
}

/** Structure for creating subcommand */
export class OptionsManager<TOptions extends SlashCommandOptions> {
  /** Array of options */
  public readonly options: Map<string, TOptions[number]>
  /** Class as object */
  public readonly data: (SlashCommandData | FieldData)[]

  /**
   * @param options Options
   */
  constructor(options?: TOptions) {
    // Create properties
    this.options = new Map();
    this.data = [];

    // Set properties
    options?.forEach(option => {
      this.options?.set(option.name, option)
      this.data.push(option.data)
    })
  }

  /**
   * Get an option by name
   * @param name Name of the option
   * @returns The requested option
   */
  public get(name: string): TOptions[number] | undefined {
    return this.options.get(name);
  }
}