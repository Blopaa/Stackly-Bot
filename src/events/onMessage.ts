import { Client, Guild, Message } from 'discord.js';
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

  async userCreation(msg: Message) {
    await this.services
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

    return true;
  }

  on() {
    this.client.on('message', async (msg: Message) => {
      if(!msg.guild?.id) return;

      let prefix: string = await this.services.getConfigColumn(
        await (<Guild>msg.guild).id,
        'prefix'
      );
      if (!prefix) {
        prefix = '!!';
      }

      this.userCreation(msg).then(() => {
        const commandArgument = msg.content.slice(prefix.length).split(' ');
        const parametres = commandArgument.slice(1);
        if (msg.content.startsWith(prefix)) {
          if (this.commandCache.length) {
            for (let command of this.commandCache) {
              if (command.name === commandArgument[0] || command.alias === commandArgument[0]) {
                command.on({
                  msg,
                  params: parametres,
                  commandCache: this.commandCache,
                });
              }
            }
          }
        }
      });
    });
  }
}
