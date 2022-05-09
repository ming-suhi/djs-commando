import { ContextMenuCommandInteraction } from "discord.js";

/**
 * Interface for context menu command creation.
 */
export default interface ContextMenuCommand {
  /**
   * The name of the command
   */
  name: string
  /**
   * The function to execute when command is called by context menu
   * @param interaction The context menu interaction object
   */
  execute(interaction: ContextMenuCommandInteraction): void
}

/**
 * Managed class for creating context menu command types.
 */
export default abstract class ContextMenuCommandBuilder {
  /**
   * The type of context menu command.
   */
  abstract type: number;
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

/** Context menu user command */
export abstract class UserCommand extends ContextMenuCommandBuilder {
  readonly type = 2;
}

/** Context menu message command */
export abstract class MessageCommand extends ContextMenuCommandBuilder {
  readonly type = 3;
}