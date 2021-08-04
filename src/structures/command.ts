class BaseCommand {

  options: Options;

  constructor(options: any) {
    this.options = new Options(options);
  }
}

class Options {
  options?: Array<Subcommand>;

  constructor(options?: Array<Subcommand>) {
    this.options = options;
  }

  get(name: string): any {
    return this.options?.find(option => option.name == name);
  }
}

type CommandOptions = Array<Subcommand>;

type SubcommandGroupOptions = Array<Subcommand>;

type SubcommandOptions = Array<string>;

class Command extends BaseCommand{
  constructor(options?: CommandOptions) {
    super(options);
  }
}

class SubcommandGroup extends BaseCommand {
  constructor(options?: SubcommandGroupOptions) {
    super(options);
  }
}

class Subcommand extends BaseCommand{
  constructor(options?: SubcommandOptions) {
    super(options);
  }
}

interface BaseCommand {
  name: string;
  description: string;
  execute?(): void;
}

export { 
  BaseCommand, 
  Options, 
  Command, 
  CommandOptions, 
  SubcommandGroup,
  SubcommandGroupOptions,
  Subcommand, 
  SubcommandOptions 
};