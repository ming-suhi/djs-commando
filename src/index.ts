export * from "./structures/slash-command";
export * from "./structures/menu-command";
export * from "./structures/field";
export * from "./structures/interactions-handler";

import { getFilePaths } from "./services/file-system";
export function mapCommands(commandsDir: string) {
  const commands = [];
  for(let path of getFilePaths(commandsDir)) {
    const command = require(path);
    commands.push(command.rawData);
  }
  return commands;
}