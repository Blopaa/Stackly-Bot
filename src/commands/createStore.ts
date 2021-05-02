import { Guild, GuildMember } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class createStore extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'createStore';
  public readonly description: string = 'create an store for your server';
  public readonly authorization: string = 'mod';
  public readonly alias = 'cs';

  async on({ msg }: commandParametres) {
    try {
      if ((<GuildMember>msg.member).hasPermission('ADMINISTRATOR')) {
        await this.services.createStore((<Guild>msg.guild).id);
        await msg.reply('sucesfully created');
      }
      return
    } catch (err) {
      await msg.reply('alredy created');
    }
  }
}
