const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('@ming-suhi/djs-local-manager');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency'
}

test('post command', async() => {
  await client.login(client.slash.token);
  const command = client.slash.commands.get(commandObject.name);
  await command.post(client);
  const commands = await client.api.applications(client.user.id).commands.get();
  expect(commands[0]).toHaveProperty("name", commandObject.name);
  expect(commands[0]).toHaveProperty("description", commandObject.description);
})