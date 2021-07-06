const {Options} = require('../utilities/command.js');

class SubCommand {

  /**
   * Sub command structure
   * @param {array<Field>} [options] subcommand options
   */
  constructor(options) {
    this.options = options;
    this._options = new Options(options);
  }


  /**
   * Verify bot permissions
   * @param {InteractionService} service instance of InteractionService
   */
   async botCheck(service) {

    // Verify bot permissions
    const guild = await service.client.guilds.fetch(service.guild_id);
    const bot = await guild.members.fetch(service.client.user.id);
    const missingPermissions = (this.botPermissions).filter(p => !bot.hasPermission(p));

    // Throw missing permissions error
    if (missingPermissions.length != 0) {
      throw `Bot missing permissions to run this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }


  /**
   * Verify user permissions
   * @param {InteractionService} service instance of InteractionService
   */
  async executeCheck(service) {

    // Verify user permissions
    const guild = await service.client.guilds.fetch(service.guild_id);
    const user = await guild.members.fetch(service.member.user.id);
    const missingPermissions = (this.executePermissions).filter(p => !user.hasPermission(p));

    // Throw missing permissions error
    if (missingPermissions.length != 0) {
      throw `You are missing permissions to run this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }


  /**
   * Verify user permissions
   * @param {InteractionService} service instance of InteractionService
   */
  async interactCheck(service) {

    // Verify user permissions
    const guild = await service.client.guilds.fetch(service.guild_id);
    const user = await guild.members.fetch(service.member.user.id);
    const missingPermissions = (this.interactPermissions).filter(p => !user.hasPermission(p));

    // Throw missing permissions error
    if (missingPermissions.length != 0) {
      throw `You are missing permissions to interact with this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }


  // Returns class as object
  get data() {
    return({
      name: this.name,
      description: this.description,
      type: 1,
      options: this._options.data
    })
  }
}


module.exports = SubCommand;