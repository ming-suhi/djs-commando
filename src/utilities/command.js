class Options {

  // Class for parsing classes
  constructor(options) {
    this.options = options;
  }


  // Returns classes as object
  get data() {
    var options = [];
    for (let option in this.options) {
      options.push(this.options[option].data);
    }
    return options;
  }
}

function commandType(interaction){
  switch (interaction.data.options) {
    case undefined:
    return 0;
    break;

    default:
      switch (interaction.data.options[0].type) {
      case 1:
      return 1;
      break;

      case 2:
      return 2;
    }
  }
}

module.exports = {Options, commandType};