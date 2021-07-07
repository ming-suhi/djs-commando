const {Options} = require('../utilities/command.js');

class ActionRow {
  constructor(components) {
    this.components = components;
    this._components = Options(components);
  }

  get data() {
    return ({
      type: 1,
      components: this._components.data
    })
  }
}

module.exports = ActionRow;