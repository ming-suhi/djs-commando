/** 
 * Interface for field choices.
 */
 export interface choice { 
  /**
   * The name of the choice
   */
  name: string, 
  /**
   * The value to pass when choice is selected
   */
  value: string | number
};

/**
 * Managed field structure for creating field types.
 */
 export default abstract class FieldBuilder {
  /**
   * The type of field.
   */
  abstract type: number;
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
  ) {
  }
  /**
   * The raw object for field data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      description: this.description,
      required: this.required,
      choices: this.choices,
      type: this.type
    })
  }
}

/** String Field */
export class StringField extends FieldBuilder {
  readonly type = 3;
};

/** Integer Field */
export class IntegerField extends FieldBuilder {
  readonly type = 4;
};

/** Boolean Field */
export class BooleanField extends FieldBuilder {
  readonly type = 5;
};

/** User Field */
export class UserField extends FieldBuilder {
  readonly type = 6;
};

/** Channel Field */
export class ChannelField extends FieldBuilder {
  readonly type = 7;
};

/** Role Field */
export class RoleField extends FieldBuilder {
  readonly type = 8;
};

/** Mentionable Field */
export class MentionableField extends FieldBuilder {
  readonly type = 9;
};

/** Number Field */
export class NumberField extends FieldBuilder {
  readonly type = 10;
};

/** Attachment Field */
export class AttachmentField extends FieldBuilder {
  readonly type = 11;
};

/** Field Types */
export type FieldType = StringField | IntegerField | BooleanField | UserField |
  ChannelField | RoleField | MentionableField | NumberField | AttachmentField;