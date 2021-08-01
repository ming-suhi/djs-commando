import Command from './command';
import Folder from './folder';

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

export default CommandsFolder;