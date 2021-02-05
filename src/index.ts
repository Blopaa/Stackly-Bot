import { Client } from 'discord.js';
import Discord from 'discord.js';
import { config } from 'dotenv';
import { CommandsHandler } from './commandsHandler';
import { Services } from './services';
config();

export class Main {
  private readonly client: Client = new Discord.Client();
  private readonly services: Services = new Services()
  private readonly commandHandler: CommandsHandler = new CommandsHandler(this.client, this.services);

  public connect(): void {
    this.client.on('ready', async () => {
      console.log('bot online');
      await this.client.user?.setActivity('Conectado');
    });

    this.client.login(`${process.env.BOT_TOKEN}`);
  }

  Main() {
    this.connect();
    this.commandHandler.commandHandler()
  }

  get getClient(): Client {
    return this.client;
  }
}
const main: Main = new Main();
main.Main();
