import { Message } from 'discord.js';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';

export default class Transaccions extends baseCommand implements command {
  constructor(protected readonly services: Services) {
    super(services);
  }

  public readonly name: string = 'share';
  public readonly description: string =
    'with this command you can share coins with your friends or pay something... Structure: prefix + share + NumberOfCoins + mentionToUser';

  public async on({msg, params}: commandParametres) {
    try {
      if(msg.author != msg.mentions.users.first()){
        await this.services.shareCoins(
            msg.guild?.id || '',
            msg.author.id,
            msg.mentions.users.first()?.id || '',
            parseInt(params[0])
          );
          msg.reply(`you send ${params[0]} coins to ${msg.mentions.users.first()}`);
      }else{
          msg.channel.send("you can't sent coins to yourself")
      }
    } catch (err) {
      msg.reply("you can't share coins, maybe you dont have enought");
    }
  }
}
