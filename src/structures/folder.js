const {getFiles} = require('../utilities/folder.js');


class Folder {

  constructor(dir = "./") {
    this.directory = dir;
  }

  get(name = null) {
    const files = getFiles(this.directory, name);
    return files;
  }
}

module.exports = Folder;