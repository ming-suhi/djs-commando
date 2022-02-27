import { resolve } from "path";

import Folder from "../../structures/folder";
import CLICommand from "./cli-command";

export default class CLIClient {
  /**
   * Structure representing commands folder.
   */
  readonly commandsFolder: Folder;
  /**
   * Map of CLI Commands.
   */
  readonly commands: Map<string, CLICommand>;
  /**
   * @param appID Id of the application the bot is affiliated with
   * @param botToken Bot token
   * @param commandsFolderPath Path to commands folder
   */
  constructor(readonly appID: string, readonly botToken: string, readonly commandsFolderPath: string) {
    this.commandsFolder = new Folder(resolve(__dirname, "..", "commands"));
    this.commands = new Map();
    this.registerCommands();
  }
  /**
   * Register commands.
   */
  registerCommands() {
    for (let file of this.commandsFolder.files) {
      const command = new file(this);
      this.commands.set(command.name.toLowerCase(), command);
      if (command.aliases) for (let alias of command.aliases) this.commands.set(alias.toLowerCase(), command);
    }
  }
}