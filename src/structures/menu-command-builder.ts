import { ContextMenuInteraction, Message } from "discord.js";
import ContextMenuCommand from "./menu-command";

/**
 * Interface for creating context menu commands.
 */
export interface ContextMenuCommandBuilder extends ContextMenuCommand {
  /**
    * The function to execute when command is called by context menu
    * @param interaction The context menu interaction object
    */
  execute(interaction: ContextMenuInteraction): void
}

/**
 * Managed class for creating context menu command types.
 */
export class ContextMenuCommandBuilder extends ContextMenuCommand { }