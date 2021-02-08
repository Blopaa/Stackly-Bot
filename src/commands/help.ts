import { Client, Message, MessageEmbed } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class help extends baseCommand implements command {
  constructor(
    protected readonly services: Services,
    private readonly client: Client
  ) {
    super(services);
    this.client = client;
  }

  public readonly name: string = 'help';
  public readonly description: string = 'if you need help type prefix + help';

  async on({ msg, commandCache }: commandParametres) {
    const embed = new MessageEmbed()
      .setTitle('HELP')
      .setColor(
        await this.services.getConfigColumn(msg.guild?.id || '', 'embedColor')
      );
    commandCache.map((e) => {
      embed.addField(e.name, e.description);
    });
    await msg.channel.send(embed);
  }
}
