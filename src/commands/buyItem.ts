import { Guild } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class BuyItem extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'buyItem';
  public readonly description: string = 'buy an item from the store';
  public readonly authorization: string = 'everyone';
  public readonly alias = 'bi';

  async on({ msg, params }: commandParametres) {
    if (!msg.guild) throw new Error('no guild');

    let item = params[0];

    let items = (await this.services.getStore(msg.guild.id)).items;

    let itemFound = items.find((e) => e.name == item);

    if (itemFound) {
      if (
        <number>itemFound.price <
        (await (
          await this.services.getCoins((<Guild>msg.guild).id, msg.author.id)
        ).coins)
      ) {
        this.services.buyItem({
          serverId: msg.guild.id,
          userId: msg.author.id,
          itemId: (<number>itemFound.id).toString(),
        });
        msg.channel.send('sucesfully bought');
      } else {
        msg.reply('not enought coins');
      }
    } else {
      msg.reply("the item you are trying to buy doesn't exists");
    }
  }
}
