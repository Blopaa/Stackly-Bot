import { Guild } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class FlipCoin extends baseCommand implements command {
  constructor(protected readonly services: Services) {
    super(services);
  }

  public readonly name: string = 'flipCoin';
  public readonly description: string =
    'try your luck fliping a coin /n !flipCoin + tails or heads + coinBet';
  public readonly authorization: string = 'everyone';

  async on({ msg, params }: commandParametres): Promise<void> {
    const beted: string = params[0];
    const bet: number = parseInt(params[1]);

    if (beted != 'heads' && beted != 'tails') {
      msg.reply(`You must bet just to tails or heads, not to - ${beted} -`);
      return;
    }

    if(!Number.isSafeInteger(bet) || params[1].endsWith('n')){
      msg.reply("you must bet a real number")
      return;
    }

    if (
      bet >
      (await (
        await this.services.getCoins((<Guild>msg.guild).id, msg.author.id)
      ).coins)
    ) {
      msg.reply('Sorry you dont have enought coins to make this bet');
      return;
    }

    if (bet <= 0) {
      msg.reply('the bet must be upper 0');
      return;
    }

    const result = Math.floor(Math.random() * 10) % 2 == 0 ? 'heads' : 'tails';

    if (result === beted) {
      await this.services.winCoins(
        (<Guild>msg.guild).id,
        msg.author.id,
        bet * 2
      );
      msg.reply(`great you won, you gain ${bet * 2} coins`);
    } else {
      await this.services.winCoins((<Guild>msg.guild).id, msg.author.id, -bet);
      msg.reply(`tough luck, you lost, try again next time`);
    }
  }
}
