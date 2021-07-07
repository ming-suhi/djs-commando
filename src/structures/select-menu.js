const {Options} = require('../utilities/command.js');

class SelectMenu {

  /**
   * Select menu structure
   * @param {array<SelectOption>} options select menu choices
   * @param {options} properties select menu properties
   * @param {string} properties.custom_id select menu custom id
   * @param {string} properties.placeholder select menu placeholder
   * @param {string} properties.min_values select menu min value
   * @param {string} properties.max_values select menu max value
   * @param {boolean} properties.disabled if disabled
   */
  constructor(options, {custom_id, placeholder, min_values, max_values, disabled}) {
    this.type = 3;
    this.custom_id = custom_id;
    this.placeholder = placeholder;
    this.min_values = min_values;
    this.max_values = max_values;
    this.disabled = disabled;
    this.options = options;
    this._options = new Options(options);
  }


  // Get as object
  get data() {
    return ({
      type: this.type,
      custom_id: this.custom_id,
      options: this._options.data,
      placeholder: this.placeholder,
      min_values: this.min_values,
      max_values: this.max_values,
      disabled: this.disabled
    })
  }
}

module.exports = SelectMenu;