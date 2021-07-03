const {LocalClient, Command} = require('../../src/index.js');

const slash = new LocalClient();

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency',
  permissions: ["SEND_MESSAGES"],
}

describe('get commands', () => {

  test('gets all commands', () => {

    //test
    const commands = slash.commands.get();

    //check
    expect(commands).toBeInstanceOf(Array);
  });

  test('gets a specific command', async() => {

    //test
    var command = slash.commands.get(commandObject.name);

    //check
    expect(new command()).toBeInstanceOf(Command);
    expect(new command()).toHaveProperty('name', commandObject.name);
    expect(new command()).toHaveProperty('description', commandObject.description);
  });
});