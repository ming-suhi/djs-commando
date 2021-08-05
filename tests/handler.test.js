const { 
  OptionsManager, 
  Command, 
  SubcommandGroup,
  Subcommand, 
  CommandsFolder, 
  InteractionsHandler 
} = require('../dist/index.js');
const { Client, Interaction } = require('discord.js');

// Mocks
jest.mock('discord.js');

// Trackers
const executeCommand = jest.fn();
Command.prototype.execute = executeCommand;
Subcommand.prototype.execute = executeCommand;

// Controlled
Interaction.prototype.isCommand = function() { return true }
CommandsFolder.prototype.command = function() { return new Command() };

OptionsManager.prototype.get= function(name) {
  if (name == "Subcommand Name") {
    return new Subcommand();
  } else {
    return new SubcommandGroup();
  }
}

Interaction.prototype.options = {
  getSubcommandGroup: function() {
    return "Subcommandgroup Name"
  },
  getSubcommand: function() {
    return "Subcommand Name"
  }
};


// tests
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
    Interaction.prototype.options.data = [{type: "SUB_COMMAND"}]
    handler.handleInteraction(new Client(), new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });


  it('should execute subcommand under subcommand group', () => {
    Interaction.prototype.options.data = [{type: "SUB_COMMAND_GROUP"}]
    handler.handleInteraction(new Client(), new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });
})