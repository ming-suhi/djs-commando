const {getFiles} = require('../utilities/folder.js');


class Folder {

  /**
   * Folder structure
   * @param {folderPath} [dir] path from root leading to folder
   */
  constructor(dir = "./") {

    this.directory = dir;
  }


  /**
   * Get exports from file
   * @param {fileName} [name] file name
   * @returns {fileData|folderData} exports from file
   */
  async get(name = null) {

    const files = getFiles(this.directory, name);
    return files;
  }
}

module.exports = Folder;