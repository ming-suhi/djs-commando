import { ContextMenuInteraction, Message } from 'discord.js';

/**
 * Interface for context menu command creation.
 */
export interface ContextMenuCommand { 
  /**
   * The name of the command
   */
  name: string, 
  /**
   * An array of aliases to call command
   */
  aliases: string[],
  /**
   * The function to execute when command is called by message
   * @param message The discord message that called command
   */
  onReply(message: Message): void,
  /**
   * The function to execute when command is called by context menu
   * @param interaction The context menu interaction object
   */
  execute(interaction: ContextMenuInteraction): void
};

/**
 * Base structure for creating context menu command types.
 * Do not use for creating context menu commands.
 */
export class ContextMenuCommand {
  /**
   * The type of context menu command. Yet to be set.
   */
  protected type?: number;
  /**
   * The raw object for context menu command data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      type: this.type!
    })
  }
}

/** Context menu user command */
export class UserCommand extends ContextMenuCommand {
  readonly type = 2;
}

/** Context menu message command */
export class MessageCommand extends ContextMenuCommand {
  readonly type = 3;
}