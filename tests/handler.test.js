const { OptionsManager, Command, SubcommandGroup, Subcommand, InteractionsHandler, Folder } = require('../dist/index.js');
const { Interaction } = require('discord.js');

// Mocks
jest.mock('discord.js');

// Trackers
const executeCommand = jest.fn();
Command.prototype.execute = executeCommand;
Subcommand.prototype.execute = executeCommand;

// Controlled
Interaction.prototype.isCommand = function() { return true }
Folder.prototype = {get files(){ return [] }};

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

  const handler = new class extends InteractionsHandler {
    constructor() {
      super();
      this.commands = {get: function() { return new Command() }}
    }
  };

  beforeEach(() => {
    executeCommand.mockClear();
  });


  it('should execute command', async() => {
    await handler.handleInteraction(new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });


  it('should execute subcommand', async() => {
    Interaction.prototype.options.data = [{type: "SUB_COMMAND"}]
    await handler.handleInteraction(new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });


  it('should execute subcommand under subcommand group', async() => {
    Interaction.prototype.options.data = [{type: "SUB_COMMAND_GROUP"}]
    await handler.handleInteraction(new Interaction());
    expect(executeCommand).toHaveBeenCalledTimes(1);
  });
})