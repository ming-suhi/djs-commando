const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');
const ping2 = require('../structures/ping2.js');

const client = new Discord.Client();
client.slash = new LocalClient();


test('post command', async() => {
  await client.login(client.slash.token);

  await ping2.post(client);

  const commands = await client.api.applications(client.user.id).commands.get();
  const command = commands.find(command => command.name == ping2.name);
  expect(command).not.toEqual(undefined);

  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500));
});