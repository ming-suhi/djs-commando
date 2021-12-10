import { rawChoice, rawField } from "./raws";

/** 
 * Interface for field choices
 */
export interface choice extends rawChoice {};

/**
 * Base field structure for creating field types.
 * Do not use for creating fields.
 */
export class Field {
  /**
   * The type of field. Yet to be set.
   */
  protected type?: number;
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @param choices The choices for the field
   */
  constructor(
    readonly name: string, 
    readonly description: string, 
    readonly required: boolean = false, 
    readonly choices: choice[] = []
  ) {}
  /**
   * The raw object for field data. Used to interact with discord.
   */
  get rawData(): rawField {
    return ({
      name: this.name,
      description: this.description,
      required: this.required,
      choices: this.choices,
      type: this.type!
    })
  }
}

/** String Field */
export class StringField extends Field {
  readonly type = 3;
};

/** Integer Field */
export class IntegerField extends Field {
  readonly type = 4;
};

/** Boolean Field */
export class BooleanField extends Field {
  readonly type = 5;
};

/** User Field */
export class UserField extends Field {
  readonly type = 6;
};

/** Channel Field */
export class ChannelField extends Field {
  readonly type = 7;
};

/** Role Field */
export class RoleField extends Field {
  readonly type = 8;
};

/** Mentionable Field */
export class MentionableField extends Field {
  readonly type = 9;
};

/** Number Field */
export class NumberField extends Field {
  readonly type = 10;
};