const {Options} = require('../utilities/command.js');

class Command {

  /**
   * Command structure
   * @param {array<SubCommand|SubCommand|Field>} [options] command options
   * @property {string} name command name
   * @property {string} description command description
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


  /**
   * Verify user if user executed the command
   * @param {InteractionService} service instance of InteractionService
   */
  async userCheck(service) {
    if(service.member.user.id != service.message.interaction.user.id) {
      throw `Only the user can interact with these components`;
    }
  }


  // Get as object
  get data() {
    return({
      name: this.name,
      description: this.description,
      options: this._options.data
    })
  }

  
  // Get buttons
  get buttons() {
    var buttons = [];
    if (!this.components) {
      return undefined;
    }
    for (let row of this.components){
      for (let component of row.components) {
        if (component.type == 2) {
          buttons.push(component);
        }
      }
    }
    return buttons;
  }


  // Get menus
  get menus() {
    var menus = [];
    if (!this.components) {
      return undefined;
    }
    for (let row of this.components){
      for (let component of row.components) {
        if (component.type == 3) {
          menus.push(component);
        }
      }
    }
    return menus;
  }


  // Post to Discord
  async post(client) {
    await client.api.applications(client.user.id).commands.post({data: this.data});
  }
}

module.exports = Command;