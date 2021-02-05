import { Client, Message } from 'discord.js';
import { SetUp } from './commands/setup';
import { Services } from './services';

export class CommandsHandler {
  constructor(
    private readonly client: Client,
    private readonly services: Services
  ) {
    this.client = client;
    this.services = services;
  }

  private readonly setUpCommand = new SetUp(this.services);

  public commandHandler() {
    this.client.on('message', async (msg: Message) => {
      let prefix: string = await this.services.getConfigColumn(
        msg.guild?.id || '',
        'prefix'
      );

      if (!prefix) {
        prefix = '!!';
      }
      const commandArgument = msg.content.slice(prefix.length).split(' ');
      const command = commandArgument[0];
      const parametres = commandArgument.slice(1);
      if (msg.content.startsWith(prefix)) {
        switch (command) {
          case 'setup':
            this.setUpCommand.createServer(msg);
            break;
          default:
            msg.channel.send('command not found');
        }
      }
    });
  }
}
