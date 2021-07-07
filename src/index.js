const Fields = require('./structures/fields.js');

module.exports = {
  "LocalClient": require('./local-client.js'),
  "Command": require('./structures/command.js'),
  "SubCommand": require('./structures/subcommand.js'),
  "SubCommandGroup": require('./structures/subcommand-group.js'),
  "Button": require('./structures/button.js'),
  "ActionRow": require('./structures/action-row.js'),
  "SelectMenu": require('./structures/select-menu.js'),
  "SelectOption": require('./structures/select-option.js'),
  "Options": require('./utilities/command.js').Options,
  ...Fields
}