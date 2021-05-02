import { Message } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class coins extends baseCommand implements command {
  constructor(protected readonly services: Services) {
    super(services);
  }

  public readonly name: string = 'coins';
  public readonly description: string =
    'to show your coins Structure prefix + coins';
  public readonly authorization: string = 'everyone';
  public readonly alias = 'c';

  public async on({ msg }: commandParametres) {
    try {
      const coins = await this.services.getCoins(
        msg.guild?.id || '',
        msg.author.id
      );
      await msg.reply(`you have ${coins.coins} coins`);
    } catch (error) {
      await msg.reply(
        'maybe you dont have an account,this should be an internal error please contac with a mod'
      );
    }
  }
}
