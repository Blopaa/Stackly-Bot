import { Guild } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class FlipCoin extends baseCommand implements command {
  constructor(protected readonly services: Services) {
    super(services);
  }

  public readonly name: string = 'flipCoin';
  public readonly description: string =
    'try your luck flipping a coin /n !flipCoin + tails or heads + coinBet';
  public readonly authorization: string = 'everyone';
  public readonly alias = "fc"

  async on({ msg, params }: commandParametres): Promise<void> {
    const beted: string = params[0];
    const bet: number = parseInt(params[1]);

    if (beted != 'heads' && beted != 'tails') {
      await msg.reply(`You must bet just to tails or heads, not to - ${beted} -`);
      return;
    }

    if(!Number.isSafeInteger(bet) || params[1].endsWith('n')){
      await msg.reply("you must bet a real number")
      return;
    }

    if (
      bet >
       (
        await this.services.getCoins(await (<Guild>msg.guild).id, await msg.author.id)
      ).coins
    ) {
      await msg.reply('Sorry you dont have enough coins to make this bet');
      return;
    }

    if (bet <= 0) {
      await msg.reply('the bet must be upper 0');
      return;
    }

    const result = Math.floor((Math.random() * 10) * bet) % 2 == 0 ? 'heads' : 'tails';

    if (result === beted) {
      await this.services.winCoins(
        await (<Guild>msg.guild).id,
        msg.author.id,
        bet * 2
      );
      await msg.reply(`great you won, you gain ${bet * 2} coins`);
    } else {
      await this.services.winCoins( await (<Guild>msg.guild).id, await msg.author.id, -bet);
      await msg.reply(`tough luck, you lost, try again next time`);
    }
  }
}
