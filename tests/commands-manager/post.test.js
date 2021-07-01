const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('../../src/index.js');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping2',
  description: 'pings bot to get latency'
}

test('post command', async() => {

  //login
  await client.login(client.slash.token);
  
  //post
  const command = new GlobalCommand(commandObject);
  await command.post(client);

  //get
  const commands = await client.api.applications(client.user.id).commands.get();

  //test
  expect(commands[0]).toHaveProperty("name", commandObject.name);
  expect(commands[0]).toHaveProperty("description", commandObject.description);

  //close
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});