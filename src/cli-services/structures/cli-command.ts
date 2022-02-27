import CLIClient from "./client";

/**
 * Interface for CLI Command creation.
 */
export default interface CLICommand {
  /**
   * The name of the command.
   */
  name: string;
  /**
   * Aliases to execute command.
   */
  aliases?: string[];
  /**
   * A description of the command. 
   */
  description: string;
  /**
   * The command line usage of the command.
   */
  usage: string;
  /**
   * The function to execute when command is triggered.
   * @param args Command arguments
   */
  execute(args?: string[]): void;
}

export default class CLICommand {
  /**
   * @param client A CLI client
   */
  constructor(readonly client: CLIClient) {}
}