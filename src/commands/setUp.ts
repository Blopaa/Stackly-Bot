import { Message } from 'discord.js';
import { Services } from '../services';
import { command, commandParametres } from '../types/command';

export default class SetUp implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = 'setup';
  public readonly description: string =
    'to setUp your server in the database to configure it. structure: prefix + setup';
    public readonly authorized: string = 'mod'

  public async on({msg}: commandParametres) {
    try {
      await this.services.createServer(
        msg.guild?.name || '',
        msg.guild?.id || ''
      );
      msg.channel.send('server setUp');
    } catch (error) {
      msg.channel.send('an error ocurred trying to setup the server');
    }
  }
}
