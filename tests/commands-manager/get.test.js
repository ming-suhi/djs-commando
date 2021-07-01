const {LocalClient, GlobalCommand} = require('../../src/index.js');

const slash = new LocalClient();

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency',
  permissions: ["SEND_MESSAGES"],
}

test('get commands', async() => {

  //get
  const command = slash.commands.get(commandObject.name);

  //test
  expect(command).toBeInstanceOf(GlobalCommand);
  expect(command).toHaveProperty('name', commandObject.name);
  expect(command).toHaveProperty('description', commandObject.description);
  expect(command).toHaveProperty('permissions');
})