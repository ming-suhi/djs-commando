const {LocalClient, Command} = require('../../src/index.js');

const slash = new LocalClient();

describe('CommandsManager get method', () => {

  it('should return all commands', () => {
    const commands = slash.commands.get();

    expect(commands).toBeInstanceOf(Array);
  });


  it('should return a specific command', async() => {
    var command = slash.commands.get('ping');

    expect(command).toBeInstanceOf(Command);
  });
});