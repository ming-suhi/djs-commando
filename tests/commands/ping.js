const {GlobalCommand} = require('../../src/index.js');

module.exports = new GlobalCommand({
  name: 'ping',
  description: 'pings bot to get latency',
  permissions: ["SEND_MESSAGES"],
  async execute(interaction) {
    const bot = await interaction.bot();

    if (!bot.hasPermission('SEND_MESSAGES')) {
      interaction.sendEphemeral(`Bot has no permission: \`SEND_MESSAGES\``);
      return;
    };
    
    //interaction.sendMessage(`:ping_pong: Bot ping is: ${Math.round(interaction.client.ws.ping)}ms`);
  }
});