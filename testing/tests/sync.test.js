const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');
const ping = require('../structures/ping.js');

const client = new Discord.Client();
client.slash = new LocalClient();


test('sync commands', async() => {
  await client.login(client.slash.token);
  
  await client.slash.syncCommands(client);

  const commands = await client.api.applications(client.user.id).commands.get();
  var command = commands.find(command => command.name == ping.name);
  expect(commands.length).toEqual(1);
  expect(command).not.toEqual(undefined);

  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500));
});