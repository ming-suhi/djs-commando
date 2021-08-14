import { Fields } from './field';
import { Interaction } from 'discord.js';

/** Command classes */
export type Commands = Command | SubcommandGroup | Subcommand | UserCommand | MessageCommand;

/** All options */
export type Options = SubcommandGroup | Subcommand | Fields;

/** Options for command */
export type CommandOptions = SubcommandGroup | Subcommand | Fields;

/** Options for subcommand group */
export type SubcommandGroupOptions = Subcommand;

/** Options for subcommand */
export type SubcommandOptions = Fields;

/** Interface for command creation */
export interface BaseCommand<Description> { 
  /** The name of the command */
  name: string, 
  /** The description of the command */
  description: Description extends true ? string : undefined, 
  /** Executed when command is called */
  execute?(interaction: Interaction): void, 
  /** Command options */
  options: OptionsManager,
  /** Command type */
  type?: number
};

/** Base structure for commands  */
export class BaseCommand<Description> {
  /**
   * @param options Command options
   * @param type Command type
   */
  constructor(options?: Array<Options>, type?: number) {
    this.options = new OptionsManager(options);
    this.type = type;
  }

  get data() {
    return ({
      name: this.name,
      description: this.description,
      options: this.options?.data,
      type: this.type
    })
  }
}

/** Structure for creating command */
export class Command extends BaseCommand<true> {
  /**
   * @param options Command Options
   * @augments BaseCommand
   */
  constructor(options?: Array<CommandOptions>) {
    super(options, undefined);
  }
}

/** Structure for creating subcommand group */
export class SubcommandGroup extends BaseCommand<true> {
  /**
   * @param options Subcommand group options
   * @augments BaseCommand
   */
  constructor(options: Array<SubcommandGroupOptions>) {
    super(options, 2);
  }
}

/** Structure for creating subcommand */
export class Subcommand extends BaseCommand<true> {
  /**
   * @param options Subcommand options
   * @augments BaseCommand
   */
  constructor(options?: Array<SubcommandOptions>) {
    super(options, 1);
  }
}

export class UserCommand extends BaseCommand<false> {
  /**
   * @augments BaseCommand
   */
  constructor() {
    super(undefined, 2);
  }
}

export class MessageCommand extends BaseCommand<false> {
  /**
   * @augments BaseCommand
   */
  constructor() {
    super(undefined, 3);
  }
}

/** Structure for creating subcommand */
export class OptionsManager {
  /** Array of options */
  options?: Map<string, Options>;
  /** Class as object */
  data: Array<any>

  /**
   * @param options Options
   */
  constructor(options?: Array<Options>) {
    // Create properties
    this.options = new Map();
    this.data = new Array();

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
  get(name: string): any {
    return this.options?.get(name);
  }
}