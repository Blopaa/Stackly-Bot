import { MessageEmbed } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class Store extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'store';
  public readonly description: string = 'show the store';
  public readonly authorization: string = 'everyone';
  public readonly alias = 's';

  async on({ msg }: commandParametres) {
    if (!msg.guild) throw new Error('no guild');

    let store = await this.services.getStore(msg.guild.id);
    let embed = new MessageEmbed()
      .setTitle(`${msg.guild.name} store`)
      .setColor(
        await this.services.getConfigColumn(msg.guild?.id || '', 'embedColor')
      );
    if (!store.items || !store) {
      await msg.reply(
        'there are no items in the shop or you have no shop, type `!cs` to create a store or type `!ai itemName price` and create an item'
      );
    }
    store.items.map((e) => {
      if (e.type == 'role') {
        embed.addField(
          `${e.price} - ${
            msg.member?.guild.roles.cache.find(
              (z) => z.id === e.name?.slice(3, e.name.length - 1)
            )?.name
          }`,
          e.description
        );
      } else {
        embed.addField(`${e.price} - ${e.name}`, e.description);
      }
    });
    await msg.channel.send(embed);
  }
}
