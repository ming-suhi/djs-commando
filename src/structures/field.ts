/** Field classes */
export type FieldStructures = StringField | IntegerField | BooleanField | UserField | ChannelField | RoleField | MentionableField | NumberField;

/** Interface for choice creation */
export interface Choice { name: string, value: string };

/** Interface for field creation */
export interface Field {
  /** The name of the field */
  name: string,
  /** The description of the field */
  description: string,
  /** If field is required */
  required: boolean,
  /** The choices of the field */
  choices?: Choice[]
}

/** Interface for field JSON */
export interface FieldData {
  /** Field name */
  name: string,
  /** Field description */
  description: string,
  /** Field type */
  type: number,
  /** If field is required */
  required: boolean,
  /** Field choices */
  choices?: Choice[]
}

/** Base structure for fields */
export class Field {
  /** Field type */
  protected type?: number;
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param type The type of the field
   * @param required If field is required
   * @param choices The choices of the field
   */
  constructor(name: string, description: string, required: boolean = false, choices?: Choice[]) {
    this.name = name;
    this.description = description;
    this.required = required;
    this.choices = choices;
  }

  /**
   * Get field data
   * @returns Field as object
   */
  get data(): FieldData {
    const name = this.name;
    const description = this.description;
    const type = this.type!;
    const required = this.required;
    const choices = this.choices;
    return({ name, description, type, required, choices });
  }
}

/** Structure for creating a string field */
export class StringField extends Field {
  protected readonly type = 3;
}

/** Structure for creating an integer field */
export class IntegerField extends Field {
  protected readonly type = 4;
}

/** Structure for creating a boolean field */
export class BooleanField extends Field {
  protected readonly type = 5;
}

/** Structure for creating a user field */
export class UserField extends Field {
  protected readonly type = 6;
}

/** Structure for creating a channel field */
export class ChannelField extends Field {
  protected readonly type = 7;
}

/** Structure for creating a role field */
export class RoleField extends Field {
  protected readonly type = 8;
}

/** Structure for creating a mentionable field */
export class MentionableField extends Field {
  protected readonly type = 9;
}

/** Structure for creating a number field */
export class NumberField extends Field {
  protected readonly type = 10;
}