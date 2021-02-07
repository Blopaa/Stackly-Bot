import { Services } from './services';
import { readdirSync } from 'fs';
import { command } from './types/command';

export const commandCache: command[] = [];
export default class CommandsHandler {
  constructor(
    private readonly services: Services
  ) {
    this.services = services;
  }

  public commandHandler() {
    const commands = readdirSync('./src/commands').filter((e) =>
      e.endsWith('.ts')
    );

    for (let file of commands) {
      let pull = require(`./commands/${file}`).default;

      if (pull) {
        commandCache.push(new pull(this.services));
      }
    }
  }
}
