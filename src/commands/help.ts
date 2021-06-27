import { Client, Message, MessageEmbed } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';
import ServerSettings from '../types/entities/server-settings';

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
  public readonly authorization: string = 'everyone';
  public readonly alias = 'h';

  async on({ msg, commandCache, params }: commandParametres) {
    const embed = new MessageEmbed()
      .setTitle('HELP')
      .setColor(
        await this.services.getConfigColumn(msg.guild?.id || '', 'embedColor')
      );

    if (params[0] === 'c' || params[0] === 'config') {
      const serverSettings = new ServerSettings();
      const properties = Object.getOwnPropertyNames(serverSettings) as Array<
        keyof ServerSettings
      >;
      properties.map((e) => {
        embed.addField(e, serverSettings[e]);
      });
    } else {
      commandCache.map((e) => {
        if (
          e.authorization === 'mod' &&
          msg.member?.hasPermission('ADMINISTRATOR')
        ) {
          embed.addField(e.name, e.description);
        }
        if (e.authorization === 'everyone') {
          embed.addField(e.name, e.description);
        }
      });
    }
    await msg
      .reply('the command help was sent to your DM')
      .then(() => msg.author.send(embed));
  }
}
