const {Command, Button, SelectMenu, SelectOption, ActionRow, SubCommand, SubCommandGroup} = require('../../src/index.js');

class Components {
  constructor(prefix) {
    this.prefix = prefix;
  }

  get data() {
    const button = new Button({label: 'button', custom_id: `${this.prefix}_button`, style: 1});
    const optionOne = new SelectOption({label: 'option one', value: 'one'});
    const optionTwo = new SelectOption({label: 'option two', value: 'two'});
    const menu = new SelectMenu([optionOne, optionTwo], {custom_id: `${this.prefix}_menu`});
    return [new ActionRow([button]).data, new ActionRow([menu]).data];
  }
}

const groupCommand = new class extends SubCommand {
  constructor() {
    super();
    this.name = 'groupc';
    this.description = 'sub command';
    this.components = new Components('test_groupc').data;
  }
} 

const subCommandGroup = new class extends SubCommandGroup {
  constructor() {
    super([groupCommand]);
    this.name = 'group';
    this.description = 'sub command group';
  }
} 

const subCommand = new class extends SubCommand {
  constructor() {
    super();
    this.name = 'sub';
    this.description = 'sub command';
    this.components = new Components('test_sub').data;
  }
} 

const topCommand = new class extends Command {
  constructor() {
    super([subCommand, subCommandGroup]);
    this.name = "top";
    this.description = 'top level command';
    this.components = new Components('test_top').data;
  }
}

module.exports = topCommand;