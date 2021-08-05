import { Fields } from './field';

/** Command classes */
export type Commands = Command | SubcommandGroup | Subcommand;

/** All options */
export type Options = Array<Commands|Fields>;

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
  execute?(): void, 
  /** Command options */
  options?: OptionsManager 
};

/** Base structure for commands  */
export class BaseCommand {
  /**
   * @param options an array of options
   */
  constructor(options?: any) {
    this.options = new OptionsManager(options);
  }
}

/** Structure for creating command */
export class Command extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options?: CommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand group */
export class SubcommandGroup extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options: SubcommandGroupOptions) {
    super(options);
  }
}

/** Structure for creating subcommand */
export class Subcommand extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options?: SubcommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand */
export class OptionsManager {
  /** Array of options */
  options?: Options

  /**
   * @param options an array of options
   */
  constructor(options?: Options) {
    this.options = options;
  }

  /**
   * Get an option by name
   * @param name name of the option
   * @returns option with the matching name
   */
  get(name: string): any {
    return this.options?.find(option => option.name == name);
  }
}