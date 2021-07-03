const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');
const CommandClassInstance = require('../test-objects/ping2.js');

const client = new Discord.Client();
client.slash = new LocalClient();


test('post command', async() => {

  //setup
  await client.login(client.slash.token);

  //test
  await new CommandClassInstance().post(client);

  //check
  const commands = await client.api.applications(client.user.id).commands.get();
  const command = commands.find(command => command.name == new CommandClassInstance().name);
  expect(command).toHaveProperty("name", new CommandClassInstance().name);
  expect(command).toHaveProperty("description", new CommandClassInstance().description);

  //clean
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500));
});