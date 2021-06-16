const Command = require('./command.js');


class GlobalCommand extends Command{

  /**
   * Global Command Structure
   * @augments Command
   * @param {command} data command data
   */
  constructor(data) {
    super();
    Object.assign(this, data);
  }


  /**
   * Initializes local command structure
   * @param {Discord.Client} client discord client
   * @returns {this} this instance
   */
  async get(client) {
    const commands = await client.api.applications(client.user.id).commands.get();
    const command = commands.find(command => command.name === this.name);
    this.id = command.id;
    return this;
  }


  /**
   * Posts command to Discord
   * @param {Discord.Client} client discord client
   * @returns {this} this instance
   */
  async post(client) {
    const data = {
      name: this.name,
      description: this.description,
      options: this.options
    }
    await client.api.applications(client.user.id).commands.post({data: data});
    return this;
  }


  /**
   * Deletes command from Discord
   * @param {Discord.Client} client discord client
   * @returns {this} this instance
   */
  async delete(client) {
    await client.api.applications(client.user.id).commands(this.id).delete();
    return this;
  }
}

module.exports = GlobalCommand;