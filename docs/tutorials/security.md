## How it works

Security takes a user's permission and verify if all permissions stated by the command have been met.
All security methods throw error if permissions are not met. Setting up security is optional.

## Setting up bot check

This feature is used to check if bot has the set permissions.
It makes sure that the bot has the permissions to execute the commands. 

1. Set `botPermissions` property to the desired permissions
    ```js
    this.botPermissions = ["MANAGE_ROLES"];
    ```

2. Create a try catch statement inside the `execute` method
    ```js
    async execute(service){
      try {

      }catch(e){

      }
    }
    ```

3. Inside try statement call on `botCheck`
    ```js
    await this.botCheck(service);
    ```

4. Handle error, inside catch statement
    ```js
    // It is suggested to send Error message to user
    await service.sendEphemeral(e);
    ```

## Setting up execute check

This feature is used to check if user has the set permissions.
It makes sure that unwanted users will not be able to use the slash command.

1. Set `executePermissions` property to the desired permissions
    ```js
    this.executePermissions = ["MANAGE_ROLES"];
    ```

2. Create a try catch statement inside the `execute` method
    ```js
    async execute(service){
      try {

      }catch(e){

      }
    }
    ```

3. Inside try statement call on `executeCheck`
    ```js
    await this.executeCheck(service);
    ```

4. Handle error, inside catch statement
    ```js
    // It is suggested to send Error message to user
    await service.sendEphemeral(e);

## Setting up interact check

This feature is used to check if user has the set permissions.
It makes sure that unwanted users will not be able to interact with the components.

1. Set `interactPermissions` property to the desired permissions
    ```js
    this.interactPermissions = ["MANAGE_ROLES"];
    ```

2. Create a try catch statement inside the `onPress` or `onSelect` method
    ```js
    async onPress(service){
      try {

      }catch(e){

      }
    }
    ```

3. Inside try statement call on `interactCheck`
    ```js
    await this.interactCheck(service);
    ```

4. Handle error, inside catch statement
    ```js
    // It is suggested to send Error message to user
    await service.sendEphemeral(e);    