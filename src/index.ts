export * from "./structures/slash-command";
export * from "./structures/menu-command";
export * from "./structures/field";
export * from "./structures/interactions-handler";

import { getFilePaths } from "./services/file-system";
import { MessageCommand, UserCommand } from "./structures/menu-command";
import { SlashCommand } from "./structures/slash-command";

export function mapCommands(commandsDir: string) {
  const commands = [];
  for(let path of getFilePaths(commandsDir)) {
    const command = require(path);
    if(command instanceof SlashCommand || command instanceof UserCommand || command instanceof MessageCommand) {
      commands.push({...command});
    }
  }
  return commands;
}