const {Command} = require('../../src/index.js');

const ping2 = new class extends Command {
  constructor() {
    super();
    this.name = "ping2";
    this.description = 'pings bot to get latency';
  }
}

module.exports = ping2;