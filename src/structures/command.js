class Command{

  constructor() {
  }

  async botCheck(service) {
    const guild = await service.client.guilds.fetch(service.guild_id);
    const bot = await guild.members.fetch(service.client.user.id);
    const missingPermissions = (this.botPermissions).filter(p => !bot.hasPermission(p));

    if (missingPermissions.length != 0) {
      throw `Bot missing permissions to run this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }

  async executeCheck(service) {
    const guild = await service.client.guilds.fetch(service.guild_id);
    const user = await guild.members.fetch(service.member.user.id);
    const missingPermissions = (this.executePermissions).filter(p => !user.hasPermission(p));

    if (missingPermissions.length != 0) {
      throw `You are missing permissions to run this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }

  async interactCheck(service) {
    const guild = await service.client.guilds.fetch(service.guild_id);
    const user = await guild.members.fetch(service.member.user.id);
    const missingPermissions = (this.interactPermissions).filter(p => !user.hasPermission(p));

    if (missingPermissions.length != 0) {
      throw `You are missing permissions to interact with this command: \`${missingPermissions.join(' | ').replace(/_/g, ' ')}\``
    }
  }

  async getID(client) {
    const commands = await client.api.applications(client.user.id).commands.get();
    const command = commands.find(command => command.name === this.name);
    return command.id;
  }

  async post(client) {
    const data = {
      name: this.name,
      description: this.description,
      options: this.options
    }
    await client.api.applications(client.user.id).commands.post({data: data});
  }

  async delete(client) {
    const id = await this.getID(client);
    await client.api.applications(client.user.id).commands(id).delete();
  }
}

module.exports = Command;