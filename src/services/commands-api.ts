import fetch from "node-fetch";

/**
 * For interacting with Discord API.
 */
export default class CommandsAPIService {
  /**
   * Get all bot commands data from Discord.
   * @param appId Application Id
   * @param token Bot token
   */
  static async getCommands(appId: string, token: string) {
    const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands`, {
      method: 'GET',
      headers: {'Authorization': `Bot ${token}`}
    });
    const commands = await response.json();
    return commands;
  }

  /**
   * Post command data to Discord.
   * @param appId Application Id
   * @param token Bot token
   * @param data Command data
   */
  static async postCommand(appId: string, token: string, data: any) {
    const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands`, {
      method: 'POST',
      headers: {'Authorization': `Bot ${token}`},
      body: JSON.stringify(data)
    });
    const commands = await response.json();
    return commands;
  }
}