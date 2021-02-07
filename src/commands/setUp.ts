import { Message } from 'discord.js';
import { Services } from '../services';
import { command } from '../types/command';

export default class SetUp implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = "setup"

  public async on(msg: Message) {
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