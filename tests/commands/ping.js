const {Command, Button, SelectMenu, SelectOption, ActionRow} = require('../../src/index.js');

const button = new Button({label: 'button', custom_id: 'test_button', style: 1});
const optionOne = new SelectOption({label: 'option one', value: 'one'});
const optionTwo = new SelectOption({label: 'option two', value: 'two'});
const menu = new SelectMenu([optionOne, optionTwo], {custom_id: 'test_menu'});

const ping = new class extends Command {
  constructor() {
    super();
    this.name = "ping";
    this.description = 'pings bot to get latency';
    this.botPermissions = ["SEND_MESSAGES"];
    this.executePermissions = ["SEND_MESSAGES"];
    this.interactPermissions = ["SEND_MESSAGES"];
    this.components = [new ActionRow([button]).data, new ActionRow([menu]).data];
  }

  async execute(service) {
    try {
      await this.botCheck(service);
      await this.executeCheck(service);
      await service.sendMessage('Pong');
    } catch(e) {
      await service.sendEphemeral(e);
    }
  }

  async onPress(service) {
    try {
      await this.botCheck(service);
      await this.interactCheck(service);
      await service.sendEphemeral(`Pong`);
    } catch(e) {
      await service.sendEphemeral(e);
    }
  }

  async onSelect(service) {
    try {
      await this.botCheck(service);
      await this.interactCheck(service);
      await service.sendEphemeral(`Pong`);
    } catch(e) {
      await service.sendEphemeral(e);
    }
  }
}

module.exports = ping;