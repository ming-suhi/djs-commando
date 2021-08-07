import { Fields } from './field';
import { Interaction } from 'discord.js';

/** Command classes */
export type Commands = Command | SubcommandGroup | Subcommand;

/** All options */
export type Options = Array<SubcommandGroup|Subcommand|Fields>;

/** Options for command */
export type CommandOptions = Array<SubcommandGroup|Subcommand|Fields>;

/** Options for subcommand group */
export type SubcommandGroupOptions = Array<Subcommand>;

/** Options for subcommand */
export type SubcommandOptions = Array<Fields>;

/** Interface for command creation */
export interface BaseCommand { 
  /** The name of the command */
  name: string, 
  /** The description of the command */
  description: string, 
  /** Executed when command is called */
  execute?(interaction: Interaction): void, 
  /** Command options */
  options?: OptionsManager ,
  /** Command type */
  type?: number
};

/** Base structure for commands  */
export class BaseCommand {
  /**
   * @param options Command options
   * @param type Command type
   */
  constructor(options?: any, type?: number) {
    this.options = new OptionsManager(options);
    this.type = type;
  }

  /**
   * Get command data
   * @returns Command as object
   */
  get data() {
    return({
      name: this.name,
      description: this.description,
      options: this.options?.data,
      type: this.type
    })
  }
}

/** Structure for creating command */
export class Command extends BaseCommand {
  /**
   * @param options Command Options
   * @augments BaseCommand
   */
  constructor(options?: CommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand group */
export class SubcommandGroup extends BaseCommand {
  /**
   * @param options Subcommand group options
   * @augments BaseCommand
   */
  constructor(options: SubcommandGroupOptions) {
    super(options, 2);
  }
}

/** Structure for creating subcommand */
export class Subcommand extends BaseCommand {
  /**
   * @param options Subcommand options
   * @augments BaseCommand
   */
  constructor(options?: SubcommandOptions) {
    super(options, 1);
  }
}

/** Structure for creating subcommand */
export class OptionsManager {
  /** Array of options */
  options?: Options

  /**
   * @param options Options
   */
  constructor(options?: Options) {
    this.options = options;
  }

  /**
   * Get an option by name
   * @param name Name of the option
   * @returns The requested option
   */
  get(name: string): any {
    return this.options?.find(option => option.name == name);
  }

  /**
   * Get options data
   * @returns Options as objects
   */
  get data(): Array<any> {
    const options = new Array();
    this.options?.forEach(option => {
      options.push(option.data)
    })
    return options;
  }
}