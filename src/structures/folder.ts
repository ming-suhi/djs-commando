import { getFiles } from '../utilities/folder';

class Folder {
path: string;

  constructor(path: string) {
    this.path = path;
  }

  get files() {
    return getFiles(this.path);
  }

  file(name: string) {
    return require.main?.require(`./${this.path}/${name}`);
  }
}

export default Folder;