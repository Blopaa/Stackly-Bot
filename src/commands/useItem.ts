import { Guild, GuildMember } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class UseItem extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'useItem';
  public readonly description: string = 'use any item in your inventory';
  public readonly authorization: string = 'everyone';
  public readonly alias = 'ui';

  async on({ msg }: commandParametres) {
    
  }
}
