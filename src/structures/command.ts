import { Fields } from './field';

/** Command classes */
type Commands = Command | SubcommandGroup | Subcommand;

/** All options */
type Options = Array<Commands|Fields>;

/** Options for command */
type CommandOptions = Array<SubcommandGroup|Subcommand|Fields>;

/** Options for subcommand group */
type SubcommandGroupOptions = Array<Subcommand>;

/** Options for subcommand */
type SubcommandOptions = Array<Fields>;

/** Interface for command creation */
interface BaseCommand { 
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
class BaseCommand {
  /**
   * @param options an array of options
   */
  constructor(options?: any) {
    this.options = new OptionsManager(options);
  }
}

/** Structure for creating command */
class Command extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options?: CommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand group */
class SubcommandGroup extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options: SubcommandGroupOptions) {
    super(options);
  }
}

/** Structure for creating subcommand */
class Subcommand extends BaseCommand {
  /**
   * @param options an array of options
   * @augments BaseCommand
   */
  constructor(options?: SubcommandOptions) {
    super(options);
  }
}

/** Structure for creating subcommand */
class OptionsManager {
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

export { 
  Commands,
  Options, 
  CommandOptions, 
  SubcommandGroupOptions,
  SubcommandOptions,
  BaseCommand, 
  Command, 
  SubcommandGroup,
  Subcommand, 
  OptionsManager
};