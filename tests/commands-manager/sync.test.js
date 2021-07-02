const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('../../src/index.js');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency'
}

const commandObject2 = {
  name: 'ping2',
  description: 'pings bot to get latency'
}

test('sync commands', async() => {

  //setup
  await client.login(client.slash.token);
  
  //test
  await new GlobalCommand(commandObject2).post(client);
  await client.slash.syncCommands(client);

  //check
  const commands = await client.api.applications(client.user.id).commands.get();
  var command = commands.find(command => command.name == commandObject.name);
  expect(commands.length).toEqual(1);
  expect(command).toHaveProperty("name", commandObject.name);
  expect(command).toHaveProperty("description", commandObject.description);

  //cleanup
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});