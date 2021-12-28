import { ContextMenuCommandBuilder } from "./menu-command-builder";

/** Context menu user command */
export class UserCommand extends ContextMenuCommandBuilder {
  readonly type = 2;
}

/** Context menu message command */
export class MessageCommand extends ContextMenuCommandBuilder {
  readonly type = 3;
}