import Field from "./field";
import { choice } from "./field";

export default class FieldBuilder extends Field {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly required: boolean = false,
    readonly choices: choice[] = []
  ) {
    super();
  }
}