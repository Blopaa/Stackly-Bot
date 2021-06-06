import { Message } from 'discord.js';
import { Services } from '../services';
import { command, commandParametres } from '../types/command';
import { UserServer } from '../types/entities/userServer';

export default class SetUp implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = 'removeItem';
  public readonly description: string = 'remove ann item from the store';
  public readonly authorization: string = 'mod';
  public readonly alias = 'ri';

  public async on({ msg, params }: commandParametres) {
    try {
      if (msg.member?.hasPermission('ADMINISTRATOR')) {
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

        if (!itemFound) throw new Error();
        await this.services.removeItem(<number>itemFound?.id);
        await msg.reply('succesfully removed');
      }
    } catch (error) {
      msg.reply('item not found');
    }
  }
}
