import { Message } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command } from '../types/command';

export default class coins extends baseCommand implements command {
  constructor(protected readonly services: Services) {
    super(services);
  }

  public readonly name: string = 'coins';

  public async on(msg: Message) {
    try {
      const coins = await this.services.getCoins(
        msg.guild?.id || '',
        msg.author.id
      );
      msg.reply(`you have ${coins}`);
    } catch (error) {
        msg.reply('maybe you dont have an account,this should be an internal error please contac with a mod')
    }
  }
}
