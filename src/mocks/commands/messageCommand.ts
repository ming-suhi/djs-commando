import { MessageCommand } from "../..";

export const messageCommand = new class extends MessageCommand {
  constructor() {
    super();
    this.name = "messagecommand";
  }
}