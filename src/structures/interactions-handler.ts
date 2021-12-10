import dotenv from 'dotenv';
import { CommandsMap } from './commands-map';
import { Folder } from './folder';

export class InteractionsHandler {
  public readonly commandsFolder: Folder;
  public readonly commands: CommandsMap = new CommandsMap();
  constructor(commandsFolderPath: string) {
    dotenv.config();
    this.commandsFolder = new Folder(commandsFolderPath);
    this.commands = new CommandsMap();
  }
}