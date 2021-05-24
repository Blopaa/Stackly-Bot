import { Guild, GuildMember } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';
import { Item } from '../types/entities/item';
import { UserServer } from '../types/entities/userServer';

export default class UseItem extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'useItem';
  public readonly description: string = 'use any item in your inventory';
  public readonly authorization: string = 'everyone';
  public readonly alias = 'ui';

  async on({ msg, params }: commandParametres) {
    try {
      const userServer: UserServer = await this.services.getUserServer(
        msg.guild?.id as string,
        msg.author.id
      );

      const itemFound = userServer.userServerItem.find(
        (e) => e.item.name == params[0]
      );

      if (!itemFound) throw new Error();
      const item = (await this.services.useItem({
        serverId: msg.guild?.id as string,
        userId: msg.author.id,
        itemId: (<number>itemFound.item.id).toString(),
      })) as Item;

      console.log({
        serverId: msg.guild?.id as string,
        userId: msg.author.id,
        itemId: (<number>itemFound.item.id).toString(),
      });

      await msg.reply(item.message as string).catch((e) => {
        throw new Error();
      });
    } catch (error) {
      msg.reply('no item found');
    }
  }
}
