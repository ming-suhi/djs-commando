const {Command} = require('../../src/index.js');

class Ping extends Command {
  constructor() {
    super();
    this.name = "ping";
    this.description = 'pings bot to get latency';
    this.botPermissions = ["SEND_MESSAGES"];
    this.executePermissions = ["SEND_MESSAGES"];
    this.interactPermissions = ["SEND_MESSAGES"];
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

  async onSubmit(service) {
    try {
      await this.botCheck(service);
      await this.interactCheck(service);
      await service.sendEphemeral(`Pong`);
    } catch(e) {
      await service.sendEphemeral(e);
    }
  }
}

module.exports = Ping;