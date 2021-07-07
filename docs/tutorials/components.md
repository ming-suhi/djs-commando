## Creating buttons

Components on ephemeral message and embed are currently not supported. 
Refer to Discord Developer Portal for an in-depth guide on making component objects.

1. Require/import necessary structures
    ```js
    const {Button, ActionRow} = require('@ming-suhi/djs-local-manager');
    ```

2. Create a button by extending `Button`
    ```js
    const male = new Button({label: "male", custom_id: "12232123", style: 1});
    ```

3. Create an action row by extending `ActionRow`. Pass the buttons in the row in an array.
    ```js
    const firstRow = new ActionRow([male, female, nonBinary]);
    ```

4. Register all buttons and menus by registering action row in components properties of the command that will generate it.
    Make sure that there is no duplicate custom_id within the command. 
    ```js
    //inside command constructor
    this.components = [firstRow, secondRow];
    ```

## Creating select menus

1. Require/import necessary structures
    ```js
    const {ActionRow, SelectMenu, SelectOption} = require('@ming-suhi/djs-local-manager');
    ```

2. Create a select option by extending `SelectOption`
    ```js
    const male = new SelectOption({label: "male", value: "123"});
    ```

3. Create a select menu by extending `SelectMenu`
    ```js
    const gender = new SelectMenu([male, female, nonBinary], {placeholder: "Select gender role"});
    ```

4. Create an action row by extending `ActionRow`. Pass the select menu in the row in an array.
    ```js
    const firstRow = new ActionRow([gender]);
    ```

5. Register all buttons and menus by registering action row in components properties of the command that will generate it.
    ```js
    //inside command constructor
    this.components = [firstRow, secondRow];
    ```

## Sending components

Simply access the data property of the class. 
```js
await service.send("Message Content", [firstRow.data, secondRow.data]);
```

## Handling multiple buttons

onPress receives all button interaction in that command. In the case of multiple buttons, you can handle it by accessing the button's custom_id. You can access it through `service.data.custom_id`.

```js
async onPress(service) {
  switch(service.data.custom_id){
    case "button_one":
    // If button_one is pressed
    break;

    case "button_two":
    // If button_two is pressed
  }
}
```

## Handling multiple select menus

onSelect receives all select menus created in that command. Handling multile select menus is the same as handling multiple buttons.
Access the component's id through `service.data.custom_id`. To get select menu values access it through the `service.data.values`.

```js
async onSelect(service) {
  switch(service.data.custom_id){
    case "menu_one":
    // If menu_one is submitted
    break;

    case "menu_two":
    // If menu_two is submitted
  }
}
```