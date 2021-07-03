const {Command} = require('../../src/index.js');

class Ping extends Command {
  constructor() {
    super();
    this.name = "ping";
    this.description = 'pings bot to get latency';
  }
}

module.exports = Ping;