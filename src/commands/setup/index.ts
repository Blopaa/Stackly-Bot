import { Message } from 'discord.js';
import { Services } from '../../services';

export class SetUp {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  async createServer(msg: Message) {
    try {
      await this.services.createServer(
        msg.guild?.name || '',
        msg.guild?.id || ''
      );
      msg.channel.send('server setUp');
    } catch (error) {
        msg.channel.send("an error ocurred trying to setup the server")
    }
  }
}
