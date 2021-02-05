import { Client, Message } from 'discord.js';
import { Services } from './services';

export class CommandsHandler {
  constructor(
    private readonly client: Client,
    private readonly services: Services
  ) {
    this.client = client;
    this.services = services;
  }

  public commandHandler() {
    this.client.on('message', async (msg: Message) => {
      let prefix: string = await this.services.getConfigColumn(
        msg.guild?.id || '',
        'prefix'
      );

      if (!prefix) {
        prefix = '!!';
      }
      const commandArgument = msg.content.slice(prefix.length);
      switch (commandArgument) {
        case 'ping':
          msg.channel.send('pong');
      }
    });
  }
}
