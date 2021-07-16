const CommandsManager = require('../../src/managers/commands-manager');
const InteractionService = require('../../src/structures/interaction-service');
const TopCommand = require('../../src/structures/command');
const Command = require('../structures/command');

jest.mock('../../src/structures/interaction-service');

const execute = jest.fn();
const onPress = jest.fn();
const onSelect = jest.fn();

TopCommand.prototype.execute = execute;
TopCommand.prototype.onPress = onPress;
TopCommand.prototype.onSelect = onSelect;

CommandsManager.prototype.get = function() {
  return Command;
}

describe('Command class', () => {

  const commandsManager = new CommandsManager();

  
  beforeEach(() => {
    InteractionService.mockClear();
    execute.mockClear();
    onPress.mockClear();
    onSelect.mockClear();
  });


  it('should call execute', () => {
    commandsManager.match(null, {type: 2, data: {name: 'ping'}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledTimes(1);
  });


  it('should call onPress', () => {
    commandsManager.match(null, {type: 3, data: {component_type: 2, custom_id: 'test_top_button'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  })


  it('should call onSelect', () => {
    commandsManager.match(null, {type: 3, data: {component_type: 3, custom_id: 'test_top_menu'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
  })
})