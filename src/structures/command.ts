class BaseCommand {
  constructor() {
  }
}

type CommandOptions = Array<Subcommand>;

type SubcommandOptions = Array<string>;

class Options {

  options?: Array<Subcommand>;

  constructor(options?: Array<Subcommand>) {
    this.options = options;
  }

  get(name: string): any {
    return this.options?.find(option => option.name == name);
  }
}

class Command extends BaseCommand{

  options?: Options;

  constructor(_options?: CommandOptions) {
    super();
    this.options = new Options(_options);
  }
}

class Subcommand extends BaseCommand{

  options?: Options;

  constructor(_options?: SubcommandOptions) {
    super();
    //this.options = new Options(_options);
  }
}

interface BaseCommand {
  name: string;
  description: string;
  execute?(): void;
}

export { BaseCommand, Command, Options, CommandOptions, Subcommand, SubcommandOptions };