import { BooleanField, ChannelField, Command, IntegerField, MentionableField, NumberField, RoleField, StringField, Subcommand, SubcommandGroup, UserField } from "../..";

export const stringField = new StringField("string", "string field", true, [{name: "option", value: "1"}]);
export const integerField = new IntegerField("integer", "integer field");
export const booleanField = new BooleanField("boolean", "boolean field", false);
export const userField = new UserField("user", "user field", true);
export const channelField = new ChannelField("channel", "channel field", true);
export const roleField = new RoleField("role", "role field", true);
export const mentionableField = new MentionableField("mentionable", "mentionable field", true);
export const numberField = new NumberField("number", "number field", true);

export const subcommand = new class extends Subcommand {
  constructor() {
    super([stringField, integerField, booleanField, userField, channelField, roleField, mentionableField, numberField]);
    this.name = "subcommand";
    this.description ="a subcommand";
  }
}

export const subcommandTwo = new class extends Subcommand {
  constructor() {
    super();
    this.name = "subcommandTwo";
    this.description ="a subcommand";
  }
}

export const subcommandgroup = new class extends SubcommandGroup {
  constructor() {
    super([subcommand, subcommandTwo]);
    this.name = "subcommandgroup";
    this.description = "a subcommand group";
  }
}

export const command = new class extends Command {
  constructor() {
    super([subcommand, subcommandgroup]);
    this.name = "command";
    this.description = "a top level command";
  }
}