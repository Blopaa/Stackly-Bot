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

  userCreation(msg: Message) {
    this.services
      .getUserByDiscordId(msg.author.id)
      .catch(() => {
        this.services.createUser(msg.author.id, msg.author.tag);
        msg.author.send(
          "a new user has been created for you, now you're able to gain coins, you just have to run !coins command"
        );
      })
      .then(() =>
        this.services
          .createUserServer(msg.guild?.id || '', msg.author.id)
          .catch(() => {
            this.services.winCoins(msg.guild?.id || '', msg.author.id);
          })
      );
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

      this.userCreation(msg);

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
