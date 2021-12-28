import chalk from "chalk";

export function checkEnv() {
  if(!process.env.APP_ID) console.log(chalk.red("APP_ID not defined in .env file"));
  if(!process.env.BOT_TOKEN) console.log(chalk.red("BOT_TOKEN not defined in .env file"));
  if(!process.env.COMMANDS_FOLDER) console.log(chalk.red("COMMANDS_FOLDER not defined in .env file"));
  return (process.env.APP_ID && process.env.BOT_TOKEN && process.env.COMMANDS_FOLDER);
}