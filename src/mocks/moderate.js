const { Command, SubcommandGroup, Subcommand } = require("../structures");

const timeout = new class extends Subcommand {
  constructor() {
    super();
    this.name = "timeout";
    this.description = "timeout a member";
  }
}

const member = new class extends SubcommandGroup {
  constructor() {
    super([timeout]);
    this.name = "member";
    this.description = "member moderation commands";
  }
}

const lock = new class extends Subcommand {
  constructor() {
    super();
    this.name = "lock";
    this.description = "locks the current channel";
  }
}

const unlock = new class extends Subcommand {
  constructor() {
    super();
    this.name = "unlock";
    this.description = "unlocks the current channel";
  }
}

const channel = new class extends SubcommandGroup {
  constructor() {
    super([lock, unlock]);
    this.name = "channel";
    this.description = "channel moderation commands"
  }
}

const moderate = new class extends Command {
  constructor() {
    super([member, channel]);
    this.name = "moderate";
    this.description = "server moderation commands";
  }
}

module.exports = moderate;