import { ContextMenuInteraction, Message } from "discord.js";
import ContextMenuCommand from "./menu-command";

export interface ContextMenuCommandBuilder extends ContextMenuCommand {
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
}

export class ContextMenuCommandBuilder extends ContextMenuCommand { }