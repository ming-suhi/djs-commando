const {Command, CommandsFolder, InteractionsHandler} = require('../../dist/index.js');
const { Client, Interaction } = require('discord.js');

jest.mock('discord.js');

const executeCommand = jest.fn();
Command.prototype.execute = execute;

Interaction.prototype.isCommand = function() {
  return true;
}

CommandsFolder.prototype.command = function() {
  return new Command();
}

describe('InteractionsHandler', () => {

  const handler = new InteractionsHandler();

  
  beforeEach(() => {
    executeCommand.mockClear();
  });


  it('should execute command', () => {
    handler.handleInteraction(null, new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });
})