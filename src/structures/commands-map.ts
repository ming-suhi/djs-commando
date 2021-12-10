import { Command } from "..";

/**
 * Commands Map.
 * Extends Map to easily access commands; store and get commands.
 */
export class CommandsMap extends Map<string, Command>{
  /**
   * Get command by name.
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
  getCommand(array: string[]) {
    array = array.filter(Boolean);
    var command: any = this.get(array[0])!;
    if (array.length > 1) command = command?.options.get(array[1]);
    if (array.length > 2) command = command?.options.get(array[2]);
    return command;
  }
}