const {Command} = require('../../src/index.js');

class Ping2 extends Command {
  constructor() {
    super();
    this.name = "ping2";
    this.description = 'pings bot to get latency';
  }
}

module.exports = Ping2;