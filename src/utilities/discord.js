async function createAPIMessage(client, channel_id, embed) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(channel_id), embed)
    .resolveData()
    .resolveFiles()
  return { ...apiMessage.data, files: apiMessage.files };
}

exports.createAPIMessage = createAPIMessage;