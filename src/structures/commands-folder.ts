import Folder from './folder';

class CommandsFolder extends Folder {

  constructor(path: string) {
    super(path);
  }

  get commands() {
    return this.files;
  }

  command(name: string) {
    return this.file(name);
  }
}

export default CommandsFolder;