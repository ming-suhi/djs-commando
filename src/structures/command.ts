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
export interface BaseCommand<Description, Type> { 
  /** The name of the command */
  name: string, 
  /** The description of the command */
  description: Description extends true ? string : undefined, 
  /** Executed when command is called */
  execute?(interaction: Interaction): void, 
  /** Command options */
  options: OptionsManager,
  /** Command type */
  type: Type
};

/** Base structure for commands  */
export class BaseCommand<Description, Type> {
  /**
   * @param options Command options
   * @param type Command type
   */
  constructor(options?: Options) {
    this.options = new OptionsManager(options);
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
export class Command extends BaseCommand<true, undefined> {
  /**
   * @param options Command Options
   * @augments BaseCommand
   */
  constructor(options?: CommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand group */
export class SubcommandGroup extends BaseCommand<true, 2> {
  /**
   * @param options Subcommand group options
   * @augments BaseCommand
   */
  constructor(options: SubcommandGroupOptions) {
    super(options);
  }
}

/** Structure for creating subcommand */
export class Subcommand extends BaseCommand<true, 1> {
  /**
   * @param options Subcommand options
   * @augments BaseCommand
   */
  constructor(options?: SubcommandOptions) {
    super(options);
  }
}

export class UserCommand extends BaseCommand<false, 2> {
  /**
   * @augments BaseCommand
   */
  constructor() {
    super(undefined);
  }
}

/** Structure for creating subcommand */
export class OptionsManager {
  /** Array of options */
  options?: Options;

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