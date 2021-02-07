import { Client, Message } from 'discord.js';
import { Services } from '../services';
import { command } from '../types/command';

export default class onMessage {
  constructor(
    private readonly client: Client,
    private readonly services: Services,
    private readonly commandCache: command[]
  ) {
    this.client = client;
    this.services = services;
    this.commandCache = commandCache;
  }

  on() {
    this.client.on('message', async (msg: Message) => {
      let prefix: string = await this.services.getConfigColumn(
        msg.guild?.id || '',
        'prefix'
      );
      if (!prefix) {
        prefix = '!!';
      }
      const commandArgument = msg.content.slice(prefix.length).split(' ');
      const parametres = commandArgument.slice(1);
      if (msg.content.startsWith(prefix)) {
        if (this.commandCache.length) {
          for await (let command of this.commandCache) {
            if (command.name === commandArgument[0]) {
              command.on(msg, parametres);
            }
          }
        }
      }
    });
  }
}
