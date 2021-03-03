import { Message } from 'discord.js';
import { Services } from '../services';
import { command, commandParametres } from '../types/command';

export default class SetUp implements command {
  constructor(private readonly services: Services) {
    this.services = services;
  }

  public readonly name: string = 'setup';
  public readonly description: string =
    'to setUp your server in the database to configure it. structure: prefix + setup';
    public readonly authorization: string = 'mod'
    public readonly alias = "su"

  public async on({msg}: commandParametres) {
    try {
      if(msg.member?.hasPermission("ADMINISTRATOR")){
        await this.services.createServer(
          msg.guild?.name || '',
          msg.guild?.id || ''
        );
        msg.channel.send('server setUp');
      }else{
        return
      }
    } catch (error) {
      msg.channel.send('an error ocurred trying to setup the server');
    }
  }
}
