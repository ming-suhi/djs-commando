class SelectOption {
  constructor({label, value, description, emoji}) {
    this.label = label;
    this.value = value;
    this.description = description;
    this.emoji = emoji;
  }

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