class SelectOption {

  /**
   * 
   * @param {object} properties select option properties
   * @param {string} properties.label select option label
   * @param {string} properties.value select option value
   * @param {string} properties.description select option description
   * @param {object} properties.emoji select option emoji
   */
  constructor({label, value, description, emoji}) {
    this.label = label;
    this.value = value;
    this.description = description;
    this.emoji = emoji;
  }


  // Get as object
  get data() {
    return ({
      label: this.label,
      value: this.value,
      description: this.description,
      emoji: this.emoji
    })
  }
}

module.exports = SelectOption;