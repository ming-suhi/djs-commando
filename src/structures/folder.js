const {getFiles} = require('../utilities/folder.js');


class Folder {


  /**
   * Structure for folder
   * @param {folderPath} dir absolute path to folder
   * @property {folderPath} dir absolute path to folder
   */
  constructor(dir = "./") {
    this.directory = dir;
  }


  /**
   * Get file, get files if no file name is passed
   * @param {string} name name of file to get
   * @return {folderExports | fileExport}
   */
  get(name = null) {
    const files = getFiles(this.directory, name);
    return files;
  }
}

module.exports = Folder;