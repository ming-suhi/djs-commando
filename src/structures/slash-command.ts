/** 
 * Interface for slash command creation 
 */
export default interface SlashCommand {
  /**
   * Type of command or option.
   */
  type: number;
  /**
   * The name of the command.
   */
  name: string,
  /**
   * The description of the command.
   */
  description: string,
  /**
   * The options of the command.
   */
  options: any[];
}

/**
 * Base structure for creating slash command types.
 * Limit option types with `TOptions`.
 * Do not use for creating commands.
 */
export default class SlashCommand {
  /**
   * The raw object for command data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      description: this.description,
      options: this.options,
      type: this.type
    })
  }
}