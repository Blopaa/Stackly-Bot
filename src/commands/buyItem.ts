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

    let itemFound =
      items.find((e) => e.name == item) ||
      items.find(
        (e) =>
          e.name?.slice(3, e.name.length - 1) ==
          msg.member?.guild.roles.cache.find(
              (z) => z.id == e.name?.slice(3, e.name.length - 1)
          )?.id
      );

    if (itemFound) {
      if (
        <number>itemFound.price <
        (await this.services.getCoins((<Guild>msg.guild).id, msg.author.id))
          .coins
      ) {
        await this.services.buyItem({
          serverId: msg.guild.id,
          userId: msg.author.id,
          itemId: (<number>itemFound.id).toString(),
        });
        if (itemFound.type === 'role') {
          let role = msg.member?.guild.roles.cache.find(
            (z) => z.id == itemFound?.name?.slice(3, itemFound.name.length - 1)
          );
          if (role) {
            try {
                await msg.member?.roles.add(role)
            } catch (error) {
                msg.channel.send("missing perms to add the role")
            }
          } else {
            await msg.channel.send("role doesn't exists");
          }
        }
        await msg.channel.send('sucesfully bought');
      } else {
        await msg.reply('not enought coins');
      }
    } else {
      await msg.reply("the item you are trying to buy doesn't exists");
    }
  }
}
