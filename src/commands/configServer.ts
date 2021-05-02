import { Message } from 'discord.js';
import { Services } from '../services';
import { command, commandParametres } from '../types/command';

export default class config implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = 'config';
  public readonly description: string = 'to config your server'
  public readonly authorization: string = 'mod'
  public readonly alias = "cg"

  public async on({msg, params}: commandParametres) {
   try {
    if(msg.member?.hasPermission('ADMINISTRATOR')){
      await this.services.setConfigColumn(
        msg.guild?.id || '',
        params[0],
        params[1]
      );
        
        await msg.channel.send(`${params[0]} has been changed to ${params[1]}`)
    }else{
      return
    }
   } catch (error) {
       await msg.channel.send("an error ocurred trying to configure, maybe what you're tying to configure no exists")
   }
  }
}