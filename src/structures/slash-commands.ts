import { CommandInteraction } from 'discord.js';
import { Field } from './fields';

/** 
 * Interface for slash command creation 
 */
export interface SlashCommand<TOptions> { 
  /**
   * The name of the command
   */
  name: string, 
  /**
   * The description of the command
   */
  description: string, 
  /**
   * The function to execute when command is called
   * @param interaction The command interaction object
   */
  execute(interaction: CommandInteraction): void, 
}

/**
 * Base structure for creating slash command types.
 * Limit option types with `TOptions`.
 * Do not use for creating commands.
 */
export class SlashCommand<TOptions extends Array<any>> {
  /**
   * Type of command or option.
   */
  protected type?: number;
  /**
   * The mapped options.
   * Used for easily finding options using option name.
   */
  readonly options: Map<string, TOptions[number]>
  /**
   * @param options The options for the command.
   */
  public constructor(readonly _options: TOptions|[] = []) {
    this.options = new Map(_options.map(option => [option.name, option]));
  }
  /**
   * The raw object for command data. Used to interact with discord.
   */
  get rawData() {
    return({
      name: this.name,
      description: this.description,
      options: this._options.map(option => option.rawData).filter(option => option != undefined),
      type: this.type
    })
  }
}

/** Subcommand */
export class Subcommand extends SlashCommand<Field[]> {
  readonly type = 1;
}

/** Subcommand Group */
export class SubcommandGroup extends SlashCommand<Subcommand[]> {
  readonly type = 2;
}

/** Command */
export class Command extends SlashCommand<(SubcommandGroup | Subcommand)[] | Field[]> {
  readonly type = 1;
}