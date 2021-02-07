import { Message } from 'discord.js';
import { Services } from '../services';
import { command } from '../types/command';

export default class config implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = 'config';

  public async on(msg: Message, params: string[]) {
   try {
    await this.services.setConfigColumn(
        msg.guild?.id || '',
        params[0],
        params[1]
      );
        
        msg.channel.send(`${params[0]} has been changed to ${params[1]}`)
   } catch (error) {
       msg.channel.send("an error ocurred trying to configure, maybe what you're tying to configure no exists")
   }
  }
}
