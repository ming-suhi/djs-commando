import FieldBuilder from "./field-builder";

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

/** Field Types */
export type FieldType = StringField | IntegerField | BooleanField | UserField |
  ChannelField | RoleField | MentionableField | NumberField;