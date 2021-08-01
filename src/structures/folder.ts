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

export default Folder;