const {Options} = require('../utilities/command.js');

class ActionRow {

  /**
   * Action row structure
   * @param {array<Button|SelectMenu>} components row components
   */
  constructor(components) {
    this.components = components;
    this._components = new Options(components);
  }


  // Get as object
  get data() {
    return ({
      type: 1,
      components: this._components.data
    })
  }
}

module.exports = ActionRow;