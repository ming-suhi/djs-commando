const {LocalClient, GlobalCommand} = require('../../src/index.js');

slash = new LocalClient();

const request = {
  type: 2,
  data: { name: 'ping', id: '837977489711431740' }
}

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency',
  permissions: ["SEND_MESSAGES"],
}

test('get commands', async() => {
  const command = slash.commands.get(commandObject.name);
  expect(command).toBeInstanceOf(GlobalCommand);
  expect(command).toHaveProperty('name', commandObject.name);
  expect(command).toHaveProperty('description', commandObject.description);
  expect(command).toHaveProperty('permissions');
})