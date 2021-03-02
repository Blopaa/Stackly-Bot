import { Client } from 'discord.js';
import Discord from 'discord.js';
import { config } from 'dotenv';
import CommandsHandler, { commandCache } from './commandsHandler';
import { Services } from './services';
import onMessage from './events/onMessage';
import { OnNewMember } from './events/onNewMember';
config();

export class Main {
  private readonly client: Client = new Discord.Client();
  private readonly services: Services = new Services();
  private readonly commandHandler: CommandsHandler = new CommandsHandler(
    this.services
  );
  private readonly onmessage: onMessage = new onMessage(
    this.client,
    this.services,
    commandCache
  );
  private readonly onnewmember: OnNewMember = new OnNewMember(
    this.client,
    this.services
  );

  public connect(): void {
    this.client.on('ready', async () => {
      console.log('bot online');
      await (<Discord.ClientUser>this.client.user).setActivity(
        'Estoy siendo desarrollado por Blopa'
      );
    });

    this.client.login(`${process.env.BOT_TOKEN}`);
  }

  async Main() {
    await this.connect();
    await this.commandHandler.commandHandler();
    await this.onmessage.on();
    await this.onnewmember.on();
  }

  get getClient(): Client {
    return this.client;
  }
}
const main: Main = new Main();
main.Main();
