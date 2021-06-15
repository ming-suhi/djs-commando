const Folder = require('../structures/folder.js');


class CommandsManager extends Folder {

  /**
   * Manages the commands folder
   * Path: local/{path}
   * @augments Folder
   * @param {folderPath} path path from root leading to folder
   */
  constructor(path) {
    super(path);
  }
}

module.exports = CommandsManager;