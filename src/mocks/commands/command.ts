import { ChannelField, Command, Subcommand, SubcommandGroup } from "../..";

export const subcommandInsideGroup = new class extends Subcommand {
  constructor() {
    super();
    this.name = "subcommandinsidegroup";
    this.description = "a subcommand inside a group";
  }
}

export const group = new class extends SubcommandGroup {
  constructor() {
    super([subcommandInsideGroup]);
    this.name = "group";
    this.description = "a subcommand group";
  }
}

export const channel = new ChannelField("channel", "channel field", true);

export const subcommand = new class extends Subcommand {
  constructor() {
    super([channel]);
    this.name = "subcommand";
    this.description ="a subcommand";
  }
}

export const command = new class extends Command {
  constructor() {
    super([subcommand, group]);
    this.name = "top";
    this.description = "a top level command";
  }
}