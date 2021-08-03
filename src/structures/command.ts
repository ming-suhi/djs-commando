class BaseCommand {
  constructor() {
  }
}

type CommandOptions = Array<SubCommand>;

type SubCommandOptions = string;

class Command extends BaseCommand{

  options?: CommandOptions;

  constructor(options?: CommandOptions) {
    super();
    this.options = options;
  }
}

class SubCommand extends BaseCommand{

  options?: SubCommandOptions;

  constructor(options?: SubCommandOptions) {
    super();
    this.options = options;
  }
}

interface BaseCommand {
  name: string;
  description: string;
  execute?(): void;
}

export { BaseCommand, Command, CommandOptions, SubCommand, SubCommandOptions };