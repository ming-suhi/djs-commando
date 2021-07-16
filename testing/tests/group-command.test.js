const CommandsManager = require('../../src/managers/commands-manager');
const InteractionService = require('../../src/structures/interaction-service');
const SubCommand = require('../../src/structures/subcommand');
const Command = require('../structures/command');

jest.mock('../../src/structures/interaction-service');

const execute = jest.fn();
const onPress = jest.fn();
const onSelect = jest.fn();

SubCommand.prototype.execute = execute;
SubCommand.prototype.onPress = onPress;
SubCommand.prototype.onSelect = onSelect;

CommandsManager.prototype.get = function() {
  return Command;
}

describe('SubCommand class', () => {

  const commandsManager = new CommandsManager();

  
  beforeEach(() => {
    InteractionService.mockClear();
    execute.mockClear();
    onPress.mockClear();
    onSelect.mockClear();
  });


  it('should call execute', () => {
    commandsManager.match(null, {type: 2, data: {name: 'ping', options: [{type: 2, name: 'group', options: [{type: 1, name: 'groupc'}]}]}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledTimes(1);
  });


  it('should call onPress', () => {
    commandsManager.match(null, {type: 3, data: {component_type: 2, custom_id: 'test_groupc_button'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  });


  it('should call onSelect', () => {
    commandsManager.match(null, {type: 3, data: {component_type: 3, custom_id: 'test_groupc_menu'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
})