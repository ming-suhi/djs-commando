class Button {
  constructor({style, label, emoji, custom_id, url, disabled}) {
    this.type = 2;
    this.style = style;
    this.label = label;
    this.emoji = emoji;
    this.custom_id = custom_id;
    this.url = url;
    this.disabled = disabled;
  }

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