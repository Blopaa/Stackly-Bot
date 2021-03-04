import { MessageEmbed } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';
import { UserServer } from '../types/entities/userServer';

export default class Inventory extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'inventory';
  public readonly description: string = 'show your inventory';
  public readonly authorization: string = 'everyone';
  public readonly alias = 'i';

  async on({ msg }: commandParametres) {
    if (!msg.guild) throw new Error('no guild');

    let userServer: UserServer = await this.services.getUserServer(
      msg.guild.id,
      msg.author.id
    );

    // console.log(userServer.userServerItem)    

    let embed = new MessageEmbed()
      .setTitle('Inventory')
      .setColor(
        await this.services.getConfigColumn(msg.guild?.id || '', 'embedColor')
      );
    userServer.userServerItem.map((e) => {
      embed.addField(`${e.item.name} - ${e.quantity}`, e.item.description);
    });

    await msg.channel.send(embed);
  }
}
