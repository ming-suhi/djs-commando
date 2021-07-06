const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');
const ping = require('../test-objects/ping.js');

const client = new Discord.Client();
client.slash = new LocalClient();


test('sync commands', async() => {

  //setup
  await client.login(client.slash.token);
  
  //test
  await client.slash.syncCommands(client);

  //check
  const commands = await client.api.applications(client.user.id).commands.get();
  var command = commands.find(command => command.name == ping.name);
  expect(commands.length).toEqual(1);
  expect(command).toHaveProperty("name", ping.name);
  expect(command).toHaveProperty("description", ping.description);

  //cleanup
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});