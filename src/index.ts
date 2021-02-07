import { Client } from 'discord.js';
import Discord from 'discord.js';
import { config } from 'dotenv';
import CommandsHandler, { commandCache } from './commandsHandler';
import { Services } from './services';
import onMessage from './events/onMessage';
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

  public connect(): void {
    this.client.on('ready', async () => {
      console.log('bot online');
      await this.client.user?.setActivity('Conectado');
    });

    this.client.login(`${process.env.BOT_TOKEN}`);
  }

  async Main() {
    await this.connect();
    await this.commandHandler.commandHandler();
    await this.onmessage.on();
  }

  get getClient(): Client {
    return this.client;
  }
}
const main: Main = new Main();
main.Main();
