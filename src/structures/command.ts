class BaseCommand {
  constructor() {
  }
}

type CommandOptions = Array<SubCommand>;

type SubCommandOptions = Array<string>;

class Options {

  options?: Array<SubCommand>;

  constructor(options?: Array<SubCommand>) {
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

class SubCommand extends BaseCommand{

  options?: Options;

  constructor(_options?: SubCommandOptions) {
    super();
    //this.options = new Options(_options);
  }
}

interface BaseCommand {
  name: string;
  description: string;
  execute?(): void;
}

export { BaseCommand, Command, Options, CommandOptions, SubCommand, SubCommandOptions };