import { MessageCommand, UserCommand } from "./menu-command";
import { SlashCommand, Subcommand, SubcommandGroup } from "./slash-command";

/**
 * Commands Map.
 * Extends Map to easily access commands; store and get commands.
 */
export default class CommandsMap extends Map<string, SlashCommand | UserCommand | MessageCommand>{
  /**
   * Get an array of raw data of all commands.
   */
  get rawData() {
    return Array.from(this.entries()).map(([, value]) => ({...value}));
  }
  /**
   * Get a slash command by name.
   * Can be used to easily get subcommands under command or subcommand group.
   * To get a nested subcommand or subcommand group, enter all parent nodes from top level command in order.
   * @param array Array of strings
   * @example 
   * // Sample Arguments:
   * 
   * // To get top level command
   * ["toplevelcommand"]
   * 
   * // To get subcommand under top level command
   * ["toplevelcommand", "subcommand"]
   * 
   * // To get subcommand under subcommand group
   * ["toplevelcommand", "subcommandgroup", "subcommand"] 
   */
  getSlashCommand(array: string[]) {
    array = array.filter(Boolean);
    var command = this.get(array[0]);
    if(!command || command instanceof UserCommand || command instanceof MessageCommand) return undefined;
    if(array.length == 1) return command;
    var commandchild;
    if (array.length > 1) commandchild = command.getOption(array[1]);
    if (!commandchild || !(commandchild instanceof Subcommand || commandchild instanceof SubcommandGroup)) return undefined;
    if (array.length > 2) commandchild = commandchild.getOption(array[2]);
    if (!commandchild || !(commandchild instanceof Subcommand || commandchild instanceof SubcommandGroup)) return undefined;
    return commandchild;
  }
  /**
   * Get a context menu command by name
   * @param name Command name
   */
  getContextMenuCommand(name: string) {
    var command = this.get(name);
    if(command instanceof SlashCommand) return;
    return command; 
  }
}