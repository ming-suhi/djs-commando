import { UserCommand } from "../..";

export const userCommand = new class extends UserCommand {
  constructor() {
    super();
    this.name = "usercommand";
  }
}