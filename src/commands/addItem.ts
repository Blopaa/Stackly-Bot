import {
  Collection,
  Collector,
  Guild,
  GuildMember,
  Message,
  MessageEmbed,
  Role,
} from 'discord.js';
import { totalmem } from 'os';
import { Services } from '../services';
import { baseCommand, command, commandParametres } from '../types/command';
import { Item } from '../types/entities/item';
import { Store } from '../types/entities/store';

export default class addItem extends baseCommand implements command {
  constructor(protected services: Services) {
    super(services);
  }
  public readonly name = 'addItem';
  public readonly description: string = 'create an store for your server';
  public readonly authorization: string = 'mod';
  public readonly alias = 'ai';

  async on({ msg, params }: commandParametres) {
    try {
      // console.log(msg.member?.guild.roles.cache);
      if ((<GuildMember>msg.member).hasPermission('ADMINISTRATOR')) {
        const item: Item = {};
        const roleData: { name?: string; color?: string } = {};
        item.name = params[0];
        item.price = +params[1];
        if (!params[0] || !params[1]) {
          msg.reply('missing params');
          return;
        }
        const collector = async (message: Message) => {
          return await msg.channel.awaitMessages(
            (m) => m.author.id === message.author.id,
            {
              max: 1,
              time: 30000,
              errors: ['time'],
            }
          );
        };
        const itemQuiz = async () => {
          await msg.channel.send(
            'write a short description, type `cancel` to stop'
          );
          const descCollector = await collector(msg);
          if (descCollector.first()?.content == 'cancel') {
            await msg.reply('stoped');
            return;
          }
          item.description = descCollector.first()?.content;
          await msg.channel.send(
            'tell me a message to say when somebody use the item, type `cancel` to stop'
          );
          const msgCollector = await collector(msg);
          if (msgCollector.first()?.content == 'cancel') {
            await msg.reply('stoped');
            return;
          }
          item.message = msgCollector.first()?.content;

          await msg.channel.send(
            'last question, the item type is a role or other? type `role` to select role or `type any letter` to not select role, type `cancel` to stop'
          );
          const typeCollector = await collector(msg);
          if (typeCollector.first()?.content == 'cancel') {
            await msg.reply('stoped');
            return;
          }
          if (typeCollector.first()?.content === 'role') {
            item.type = 'role';
            const role = msg.member?.guild.roles.cache.find(
              (z) => z.name === item.name
            );
            if (!role) {
              roleData.name = item.name;
              msg.reply('write a color to show on the role');
              const roleColorCollector = await collector(msg);
              if (roleColorCollector.first()?.content) {
                roleData.color = roleColorCollector.first()?.content;
              }
            }
          } else {
            item.type = 'no role';
          }
          let created = await new MessageEmbed()
            .setTitle('New Item Preview')
            .setColor(
              await this.services.getConfigColumn(
                msg.guild?.id || '',
                'embedColor'
              )
            );
          let itemEntries = Object.entries(item);
          itemEntries.map((e) => {
            if (e[0] != 'storeId') {
              created.addField(e[0], e[1]);
            }
          });
          await msg.channel.send(created);
          let isCorrect = await msg.channel.send('is this correct?');
          await isCorrect.react('✅');
          await isCorrect.react('❌');
          let reactionCollector = await isCorrect.createReactionCollector(
            (r, u) => r.emoji.name === '✅' || ('❌' && u.id === msg.author.id),
            { time: 10000 }
          );
          reactionCollector.on('collect', async (r) => {
            if (r.emoji.name == '✅') {
              await isCorrect.reactions.cache
                .get('❌')
                ?.remove()
                .catch((err) => console.log(err));
              Role;
              const createRole = await msg.guild?.roles.create({
                data: {
                  name: roleData.name,
                  color: roleData.color,
                },
              });
              item.name = `<@$&{createRole?.id}>`;
              if (!msg.guild) throw new Error('no guild');
              item.serverId = (<Guild>msg.guild).id;
              await this.services.addItem(item);
              await msg.channel.send('saved');
            } else {
              await isCorrect.reactions.cache
                .get('✅')
                ?.remove()
                .catch((err) => console.log(err));
              await itemQuiz();
            }
          });
        };

        try {
          await itemQuiz();
        } catch (error) {
          await msg.channel.send('an error ocurred');
        }
      }
    } catch (error) {}
  }
}
