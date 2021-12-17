/**
 * Interface for context menu command creation.
 */
export default interface ContextMenuCommand {
  /**
   * The type of context menu command.
   */
  type: number;
  /**
   * The name of the command
   */
  name: string
};

/**
 * Base structure for creating context menu command types.
 * Do not use for creating context menu commands.
 */
export default class ContextMenuCommand {
  /**
   * The raw object for context menu command data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      type: this.type
    })
  }
}