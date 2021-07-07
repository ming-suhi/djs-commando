class Button {
  /**
   * Button structure
   * @param {object} properties button properties
   * @param {int} properties.style button style
   * @param {string} properties.label button label
   * @param {object} properties.emoji button emoji
   * @param {string} properties.url button url
   * @param {boolean} properties.disabled if disables 
   */
  constructor({style, label, emoji, custom_id, url, disabled}) {
    this.type = 2;
    this.style = style;
    this.label = label;
    this.emoji = emoji;
    this.custom_id = custom_id;
    this.url = url;
    this.disabled = disabled;
  }


  // Get as object
  get data(){
    return({
      type: this.type,
      style: this.style,
      label: this.label,
      emoji: this.emoji,
      custom_id: this.custom_id,
      url: this.url,
      disabled: this.disabled,
    })
  }
}

module.exports = Button;