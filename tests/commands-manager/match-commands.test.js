const CommandsManager = require('../../src/managers/commands-manager');
const InteractionService = require('../../src/structures/interaction-service');
const Ping = require('../commands/ping');

jest.mock('../../src/structures/interaction-service');

const execute = jest.fn();
const onPress = jest.fn();
const onSelect = jest.fn();

Ping.execute = execute;
Ping.onPress = onPress;
Ping.onSelect = onSelect;

CommandsManager.prototype.get = function() {
  return Ping;
}

describe('Command class', () => {

  beforeEach(() => {
    InteractionService.mockClear();
    execute.mockClear();
    onPress.mockClear();
    onSelect.mockClear();
  });

  it('should call execute', () => {
    const commandsManager = new CommandsManager();
  
    commandsManager.match(null, {type: 2, data: {name: 'ping'}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it('should call onPress', () => {
    const commandsManager = new CommandsManager();
  
    commandsManager.match(null, {type: 3, data: {component_type: 2, custom_id: 'test_button'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
  })

  it('should call onSelect', () => {
    const commandsManager = new CommandsManager();
  
    commandsManager.match(null, {type: 3, data: {component_type: 3, custom_id: 'test_menu'}, message: {interaction: {name: 'ping'}}});
    expect(InteractionService).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
  })
})