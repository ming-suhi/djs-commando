async function createAPIMessage(client, request, embed) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(request.channel_id), embed)
    .resolveData()
    .resolveFiles()
  return { ...apiMessage.data, files: apiMessage.files };
}

exports.createAPIMessage = createAPIMessage;