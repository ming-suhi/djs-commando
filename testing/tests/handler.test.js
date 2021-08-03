const { Command, SubCommand, CommandsFolder, InteractionsHandler } = require('../../dist/index.js');
const { Client, Interaction } = require('discord.js');

jest.mock('discord.js');

const executeCommand = jest.fn();
Command.prototype.execute = executeCommand;
SubCommand.prototype.execute = executeCommand;

Array.prototype.find = function() {
  return new SubCommand();
}

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
    handler.handleInteraction(new Client(), new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });

  it('should execute subcommand', () => {
    Interaction.prototype.options = {
      data: [{type: "SUB_COMMAND"}] 
    };
    handler.handleInteraction(new Client(), new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });
})