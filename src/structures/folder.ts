import { Command } from './command';
import { getFiles } from '../utilities/folder';

class Folder {

  path: string;

  constructor(path: string) {
    this.path = path;
  }

  get files(): Array<any> {
    return getFiles(this.path);
  }

  file(name: string): any {
    return require.main?.require(`./${this.path}/${name}`);
  }
}

class CommandsFolder extends Folder {

  constructor(path: string) {
    super(path);
  }

  get commands(): Array<Command> {
    return this.files;
  }

  command(name: string): Command {
    return this.file(name);
  }
}

export { Folder, CommandsFolder };