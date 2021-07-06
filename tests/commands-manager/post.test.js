const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');
const ping2 = require('../test-objects/ping2.js');

const client = new Discord.Client();
client.slash = new LocalClient();


test('post command', async() => {

  //setup
  await client.login(client.slash.token);

  //test
  await ping2.post(client);

  //check
  const commands = await client.api.applications(client.user.id).commands.get();
  const command = commands.find(command => command.name == ping2.name);
  expect(command).toHaveProperty("name", ping2.name);
  expect(command).toHaveProperty("description", ping2.description);

  //clean
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500));
});