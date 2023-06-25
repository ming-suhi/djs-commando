import { ContextMenuInteraction } from "discord.js";

/**
 * Interface for context menu command creation.
 */
interface ContextMenuCommandBuilder {
  /**
   * The name of the command
   */
  name: string
  /**
   * The function to execute when command is called by context menu
   * @param interaction The context menu interaction object
   */
  execute(interaction: ContextMenuInteraction): void
}

/**
 * Managed class for creating context menu command types.
 */
abstract class ContextMenuCommandBuilder {
  /**
   * The type of context menu command.
   */
  abstract type: number;
}

/** Context menu user command */
export abstract class UserCommand extends ContextMenuCommandBuilder {
  readonly type = 2;
}

/** Context menu message command */
export abstract class MessageCommand extends ContextMenuCommandBuilder {
  readonly type = 3;
}