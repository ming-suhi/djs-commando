import { BooleanField, ChannelField, IntegerField, MentionableField, NumberField, RoleField, StringField, UserField } from "./field-consumer";
import { MessageCommand, UserCommand } from "./menu-command-consumer";
import { Command, Subcommand, SubcommandGroup } from "./slash-command-consumer";

export const applicationCommandStructures = [Command, UserCommand, MessageCommand];
export type ApplicationCommandType = Command | UserCommand | MessageCommand;

export const commandOptionStructures = [
  Subcommand, SubcommandGroup, 
  StringField, IntegerField, BooleanField, UserField,
  ChannelField, RoleField, MentionableField, NumberField
]
export type CommandOptionType = Subcommand | SubcommandGroup |
  StringField | IntegerField | BooleanField | UserField |
  ChannelField | RoleField | MentionableField | NumberField;