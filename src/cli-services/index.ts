#!node

import dotenv from "dotenv";

import { red } from "chalk";

import CLIClient from "./structures/client";

dotenv.config();

async function main() {
  const appID = process.env.APP_ID;
  const botToken = process.env.BOT_TOKEN;
  const commandsFolder = process.env.COMMANDS_FOLDER;

  if(!appID) return console.log(red("APP_ID not defined in .env file\n"));
  if(!botToken) return console.log(red("BOT_TOKEN not defined in .env file\n"));
  if(!commandsFolder) return console.log(red("COMMANDS_FOLDER not defined in .env file\n"));

  const client = new CLIClient(appID, botToken, commandsFolder);
  const commandName = process.argv?.[2]?.toString()?.toLowerCase();
  const args = process.argv.slice(3);
  const command = client.commands.get(commandName) || client.commands.get("help")!;
  await command.execute(args);
}

main();