import { BooleanField, ChannelField, IntegerField, MentionableField, NumberField, RoleField, StringField, UserField, FieldType } from "../structures/field-consumer";
import { MessageCommand, UserCommand } from "../structures/menu-command-consumer";
import { Command, Subcommand, SubcommandGroup } from "../structures/slash-command-consumer";
import { ApplicationCommandType, CommandOptionType, commandOptionStructures } from "../structures/application-commands";
import CommandsMap from "../structures/commands-map";

/**
 * Transform a field data to a managed field class.
 * @param fieldData The raw object for field data
 */
export function makeField(fieldData: FieldType["rawData"]) {
  const structure = commandOptionStructures[fieldData.type - 1] as typeof StringField | typeof IntegerField | typeof BooleanField | typeof UserField | typeof ChannelField | typeof RoleField | typeof MentionableField | typeof NumberField;
  return new structure(fieldData.name, fieldData.description, fieldData.required, fieldData.choices);
}

/**
 * Transform a subcommand data to a managed subcommand class.
 * @param commandData The raw object for command data
 */
export function makeSubcommand(commandData: Subcommand["rawData"]) {
  const options = commandData.options?.map(option => makeField(option));
  const subcommand = new Subcommand(options);
  subcommand.name = commandData.name;
  subcommand.description = commandData.description;
  return subcommand;
}

/**
 * Transform a subcommand group data to a managed subcommand group class.
 * @param commandData The raw object for command data
 */
export function makeSubcommandGroup(commandData: SubcommandGroup["rawData"]) {
  const options = commandData.options?.map(option => makeSubcommand(option));
  const subcommandGroup = new SubcommandGroup(options);
  subcommandGroup.name = commandData.name;
  subcommandGroup.description = commandData.description;
  return subcommandGroup;
}

/**
 * Transform a command option data to a managed command option class.
 * @param optionData The raw object for command option data
 */
export function makeCommandOption(optionData: CommandOptionType["rawData"]) {
  if(optionData.type == 1) return makeSubcommand(optionData as Subcommand["rawData"]);
  if(optionData.type == 2) return makeSubcommandGroup(optionData as SubcommandGroup["rawData"]);
  if(optionData.type > 2) return makeField(optionData as FieldType["rawData"]);
}

/**
 * Transform a top level slash command data to a managed command class.
 * @param commandData The raw object for command data
 */
export function makeCommand(commandData: Command["rawData"]) {
  const commandOptions = commandData.options?.map(option => makeCommandOption(option)) as (SubcommandGroup | Subcommand)[] | FieldType[];
  const command = new Command(commandOptions);
  command.name = commandData.name;
  command.description = commandData.description;
  return command;
}

/**
 * Transform a user command data to a user command class.
 * @param commandData The raw object for command data
 */
export function makeUserCommand(commandData: UserCommand["rawData"]) {
  const command = new UserCommand();
  command.name = commandData.name;
  return command;
}

/**
 * Transform a message command data to a message command class.
 * @param commandData The raw object for command data
 */
export function makeMessageCommand(commandData: MessageCommand["rawData"]) {
  const command = new MessageCommand();
  command.name = commandData.name;
  return command;
}

/**
 * Transform a command data to a command class.
 * @param commandData The raw object for command data
 */
export function makeApplicationCommand(commandData: ApplicationCommandType["rawData"]) {
  if(commandData.type == 1) return makeCommand(commandData as Command["rawData"]);
  if(commandData.type == 2) return makeUserCommand(commandData);
  if(commandData.type == 3) return makeMessageCommand(commandData);
}

/**
 * Transform command datas to corresponding command class and store them on a commands map.
 * @param commandData The raw object for command data
 */
export function makeApplicationCommands(commandDatas: ApplicationCommandType["rawData"][]) {
  const commandsMap = new CommandsMap(commandDatas.map(data => [data.name, makeApplicationCommand(data)!])); 
  return commandsMap;
}