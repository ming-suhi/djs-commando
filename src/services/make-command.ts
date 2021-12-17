import { BooleanField, ChannelField, IntegerField, MentionableField, NumberField, RoleField, StringField, UserField, FieldType } from "../structures/field-consumer";
import { MessageCommand, UserCommand } from "../structures/menu-command-consumer";
import { Command, Subcommand, SubcommandGroup } from "../structures/slash-command-consumer";
import { ApplicationCommandType, CommandOptionType, commandOptionStructures } from "../structures/application-commands";

/**
 * Transform raw objects to managed classes.
 */
export default class MakeCommandService {
  /**
   * Transform a field data to a managed field class.
   * @param fieldData The raw object for field data
   */
  static makeField(fieldData: FieldType["rawData"]) {
    const structure = commandOptionStructures[fieldData.type - 1] as typeof StringField | typeof IntegerField | typeof BooleanField | typeof UserField | typeof ChannelField | typeof RoleField | typeof MentionableField | typeof NumberField ;
    return new structure(fieldData.name, fieldData.description, fieldData.required, fieldData.choices);
  }
  
  /**
   * Transform a subcommand data to a managed subcommand class.
   * @param commandData The raw object for command data
   */
  static makeSubcommand(commandData: Subcommand["rawData"]) {
    const options = commandData.options.map(option => this.makeField(option));
    const subcommand = new Subcommand(options);
    subcommand.name = commandData.name;
    subcommand.description = commandData.description;
    return subcommand;
  }
  
  /**
   * Transform a subcommand group data to a managed subcommand group class.
   * @param commandData The raw object for command data
   */
  static makeSubcommandGroup(commandData: SubcommandGroup["rawData"]) {
    const options = commandData.options.map(option => this.makeSubcommand(option));
    const subcommandGroup = new SubcommandGroup(options);
    subcommandGroup.name = commandData.name;
    subcommandGroup.description = commandData.description;
    return subcommandGroup;
  }
  
  /**
   * Transform a command option data to a managed command option class.
   * @param optionData The raw object for command option data
   */
  static makeCommandOption(optionData: CommandOptionType["rawData"]) {
    if(optionData.type == 1) return this.makeSubcommand(optionData as Subcommand["rawData"]);
    if(optionData.type == 2) return this.makeSubcommandGroup(optionData as SubcommandGroup["rawData"]);
    if(optionData.type > 2) return this.makeField(optionData as FieldType["rawData"]);
  }
  
  /**
   * Transform a top level slash command data to a managed command class.
   * @param commandData The raw object for command data
   */
  static makeCommand(commandData: Command["rawData"]) {
    const commandOptions = commandData.options.map(option => this.makeCommandOption(option)) as (SubcommandGroup | Subcommand)[] | FieldType[];
    const command = new Command(commandOptions);
    command.name = commandData.name;
    command.description = commandData.description;
    return command;
  }
  
  /**
   * Transform a user command data to a user command class.
   * @param commandData The raw object for command data
   */
  static makeUserCommand(commandData: UserCommand["rawData"]) {
    const command = new UserCommand();
    command.name = commandData.name;
    return command;
  }
  
  /**
   * Transform a message command data to a message command class.
   * @param commandData The raw object for command data
   */
  static makeMessageCommand(commandData: MessageCommand["rawData"]) {
    const command = new MessageCommand();
    command.name = commandData.name;
    return command;
  }

  /**
   * Transform a command data to a command class.
   * @param commandData The raw object for command data
   */
  static makeApplicationCommand(commandData: ApplicationCommandType["rawData"]) {
    if(commandData.type == 1) return this.makeCommand(commandData as Command["rawData"]);
    if(commandData.type == 2) return this.makeUserCommand(commandData);
    if(commandData.type == 3) return this.makeMessageCommand(commandData);
  }
}