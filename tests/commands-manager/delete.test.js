const Discord = require('discord.js');
const {LocalClient} = require('../../src/index.js');

const client = new Discord.Client();
client.slash = new LocalClient();

const commandObject = {
  name: 'ping',
  description: 'pings bot to get latency'
}

test('delete command', async() => {
  
  //login
  await client.login(client.slash.token);

  //get
  const command = client.slash.commands.get(commandObject.name);

  //clean
  await command.get(client);
  await command.delete(client);

  //test
  const commands = await client.api.applications(client.user.id).commands.get();
  expect(commands[0]).toEqual(undefined);

  //close
  client.destroy();
})