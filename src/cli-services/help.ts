import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";

export default function help() {
  clear();
  const figletArt = chalk.blue(figlet.textSync('commando', { horizontalLayout: 'universal smushing' }));
  console.log(figletArt);
  console.log("Your friendly cli tool for managing your discord application commands.");
  console.log("Brought to you by @ming-suhi/djs-commando.");
  console.log("\n");
  console.log(chalk.green("Usage: npx djsc <command> <option?>"));
  console.log("Sample Usage: npx djsc help");
  console.log("\n");
  console.log(chalk.green("Commands:"));
  console.log("help                     View usage and other documentation");
  console.log("cc                       Compare local commands with Discord commands.");
  console.log("sc                       Sync Discord with local. Deletes from Discord");
  console.log("                         unexisting files in the local commands folder.");
  console.log("                         Posts existing local files that is not posted");
  console.log("                         on Discord.")
  console.log("gc                       Get and print all bot commands from Discord");
  console.log("gc <commandName>         Get and print a specific command from Discord");
  console.log("                         by name.")
  console.log("dc <commandName>         Delete a specific command from Discord by name");
  console.log("pc <commandName>         Post a specific command from your commands");
  console.log("                         folder to Discord by name.");
  console.log("\n");
}