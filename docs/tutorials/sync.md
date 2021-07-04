## Synching commands

Sync commands posts to Discord all commands on the commands folder. To prevent errors, sync commands also deletes from Discord, commands that dont have files in the commands folder. 

It is suggested to sync commands on client ready. To sync commands just simply call on `syncCommands` method.

```js
client.on('ready', async() => {
  client.msdm.syncCommands(client);
});
```