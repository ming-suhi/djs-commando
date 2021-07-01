const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('../../src/index.js');

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency'
}

test('post command', async() => {
  const client = new Discord.Client();
  client.slash = new LocalClient();

  await client.login(client.slash.token);
  const command = client.slash.commands.get(commandObject.name);
  await command.post(client);
  const commands = await client.api.applications(client.user.id).commands.get();
  expect(commands[0]).toHaveProperty("name", commandObject.name);
  expect(commands[0]).toHaveProperty("description", commandObject.description);
  client.destroy();
})