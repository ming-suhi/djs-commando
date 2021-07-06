const Fields = require('./structures/fields.js');

module.exports = {
  "LocalClient": require('./local-client.js'),
  "Command": require('./structures/command.js'),
  "SubCommand": require('./structures/subcommand.js'),
  "SubCommandGroup": require('./structures/subcommand-group.js'),
  ...Fields
}