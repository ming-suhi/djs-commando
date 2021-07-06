const {Command} = require('../../src/index.js');

const ping = new class extends Command {
  constructor() {
    super();
    this.name = "ping";
    this.description = 'pings bot to get latency';
  }
}

module.exports = ping;