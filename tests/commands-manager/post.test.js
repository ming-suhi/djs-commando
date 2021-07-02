const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('../../src/index.js');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping2',
  description: 'pings bot to get latency'
}

test('post command', async() => {

  //setup
  await client.login(client.slash.token);

  //test
  await new GlobalCommand(commandObject).post(client);

  //check
  const commands = await client.api.applications(client.user.id).commands.get();
  const command = commands.find(command => command.name == commandObject.name);
  expect(command).toHaveProperty("name", commandObject.name);
  expect(command).toHaveProperty("description", commandObject.description);

  //cleanup
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});