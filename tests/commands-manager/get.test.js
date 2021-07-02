const {LocalClient, GlobalCommand} = require('../../src/index.js');

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
    const command = slash.commands.get(commandObject.name);

    //check
    expect(command).toBeInstanceOf(GlobalCommand);
    expect(command).toHaveProperty('name', commandObject.name);
    expect(command).toHaveProperty('description', commandObject.description);
    expect(command).toHaveProperty('permissions');
  });
});