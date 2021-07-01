## A. Installing

##### Run npm install on the command line or terminal.
```
npm install @ming-suhi/djs-local-manager
```

## B. Setting environment

1. Create a `.env` file in the root directory

    ```env
    BOT_TOKEN = 

    COMMANDS_FOLDER =
    ```

2. Get the Discord bot's token and store it as `BOT_TOKEN`.

3. Create a folder to hold command files. Store the folder path from the root as `COMMANDS_FOLDER`.

## C. Setting bot

1. Create an instance of Discord Client
    ```js
    const Discord = require('discord.js');
    const client = new Discord.Client();
    ```

2. Attach an instance of Manager Client to a Discord Client instance property

    Note: chosen property must not be taken

    Quick Info: `msdm` is an acronym for Ming Suhi Discord Manager

    ```js
    const Manager = require('@ming-suhi/djs-manager');
    client.msdm = new Manager.LocalClient();
    ```

3. Login bot
    ```js
    client.login(client.msdm.token);
    ```