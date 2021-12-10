import fetch from "node-fetch";

/**
 * Get all bot commands data from Discord.
 * @param appId Application Id
 * @param token Bot token
 */
export const getCommands = async(appId: string, token: string) => {
  const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands`, {
    method: 'get',
    headers: {'Authorization': `Bot ${token}`}
  });
  const commands = await response.json();
  return commands;
}