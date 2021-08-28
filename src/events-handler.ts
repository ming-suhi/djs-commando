import { Client } from 'discord.js'
import dotenv from 'dotenv';
import { Folder } from './structures/folder';

/** Interface for creating an event handler */
export interface Event {
  /** Event name */
  name: string;
  /** Event function */
  run: (...args: any) => void;
}

/** Structure for managing events */
export class EventsHandler {
  /** Structure for managing events folder */
  public readonly eventsFolder: Folder;
  /** Structure for storing event handlers */
  public readonly events: Map<string, Event>;

  constructor() {
    dotenv.config();
    this.eventsFolder = new Folder(process.env.EVENTS_FOLDER || "events");
    this.events = new Map();
    this.initializeEvents();
  }

  /**
   * Register events to client
   * @param client Discord client
   */
  registerEvents(client: Client) {
    for(let event of this.eventsFolder.files) {
      client.on(event.name, event.run);
    }
  }

  // Store events to memory
  initializeEvents() {
    for (let event of this.eventsFolder.files) {
      this.events.set(event.name.toLowerCase(), event);
    }
  }
}