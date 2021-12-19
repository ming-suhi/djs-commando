import { BooleanField, ChannelField, IntegerField, MentionableField, NumberField, RoleField, StringField, UserField } from "./field-consumer";
import { MessageCommand, UserCommand } from "./menu-command-consumer";
import { Command, Subcommand, SubcommandGroup } from "./slash-command-consumer";

/**
 * Array of application command structures.
 * In increasing order by type; index 0 is type 1.
 */
export const applicationCommandStructures = [Command, UserCommand, MessageCommand];

/**
 * Application command types.
 */
export type ApplicationCommandType = Command | UserCommand | MessageCommand;

/**
 * Array of command option structures.
 * In increasing order by type; index 0 is type 1.
 */
export const commandOptionStructures = [
  Subcommand, SubcommandGroup, 
  StringField, IntegerField, BooleanField, UserField,
  ChannelField, RoleField, MentionableField, NumberField
]

/**
 * Command option types.
 */
export type CommandOptionType = Subcommand | SubcommandGroup |
  StringField | IntegerField | BooleanField | UserField |
  ChannelField | RoleField | MentionableField | NumberField;