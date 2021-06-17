const {createAPIMessage} = require('../utilities/discord.js');


class Interaction{

  /**
   * Interaction structure
   * @param {Discord.Client} client discord client
   * @param {request} request interaction create request
   * @property {Discord.Client} client discord client
   * @property {request} request interaction create request
   * @property {responseType} responseType response type to slash command
   */
  constructor(client, request) {
    this.client = client;
    this.request = request;
    this.responseType = 4;
  }


  /**
   * Gets request author 
   * @returns {Discord.GuildMember} request author
   */
  async author() {
    let guild = await this.guild();
    let author = await guild.members.fetch(this.request.member.user.id);
    return author;
  }


  /**
   * Gets request guild
   * @returns {Discord.Guild} request guild
   */
  async guild() {
    let guild = await this.client.guilds.fetch(this.request.guild_id);
    return guild;
  }


  /**
   * Gets request guild channel
   * @returns {Discord.TextChannel} request guild channel
   */
  async channel() {
    let channel = await this.client.channels.fetch(this.request.channel_id);
    return channel;
  }


  /**
   * Gets bot user
   * @returns {Discord.GuildMember} bot user
   */
  async bot() {
    let guild = await this.guild();
    let bot = await guild.members.fetch(this.client.user.id);
    return bot;
  }


  /**
   * Sends message to request channel
   * @param {string} content message to send
   */
  async sendMessage(content) {
    const client = this.client;
    const request = this.request;
    const type = this.responseType;
    const data = {
      type: type,
      data: {
        content: content,
      }
    }
    client.api.interactions(request.id, request.token).callback.post({data});
  }
  

  /**
   * Sends ephemeral message to request channel
   * @param {string} content message to send
   */
  async sendEphemeral(content) {
    const client = this.client;
    const request = this.request;
    const type = this.responseType;
    const data = {
      type: type,
      data: {
        content: content,
        flags: 64
      }
    }
    client.api.interactions(request.id, request.token).callback.post({data});
  }

  
  /**
   * Sends embed to request channel
   * @param {Discord.Embed} content embed to send
   */
  async sendEmbed(embed) {
    const client = this.client;
    const request = this.request;
    const type = this.responseType;
    const data = {
      type: type,
      data: await createAPIMessage(client, request, embed)
    }
    client.api.interactions(request.id, request.token).callback.post({data});
  }
}

module.exports = Interaction;