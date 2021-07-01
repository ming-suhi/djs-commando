const Discord = require('discord.js');
const {LocalClient, GlobalCommand} = require('../../src/index.js');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping2',
  description: 'pings bot to get latency'
}

test('delete command', async() => {
  //login
  await client.login(client.slash.token);

  //get
  const command = new GlobalCommand(commandObject);
  await command.get(client);
  await command.delete(client);

  //test
  const commands = await client.api.applications(client.user.id).commands.get();
  expect(commands[0]).toEqual(undefined);

  //close
  client.destroy();
})

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});