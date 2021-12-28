import Field from "./field";
import { choice } from "./field";

/**
 * Managed field structure for creating field types.
 */
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