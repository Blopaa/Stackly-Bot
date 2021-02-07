import {
  Client,
  GuildMember,
  MessageEmbed,
  PartialGuildMember,
  TextChannel,
} from 'discord.js';
import { Services } from '../services';
import { command } from '../types/command';

export class OnNewMember {
  constructor(
    private readonly client: Client,
    private readonly services: Services
  ) {
    this.client = client;
    this.services = services;
  }

  on() {
    this.client.on(
      'guildMemberAdd',
      async (member: GuildMember | PartialGuildMember) => {
        const welcomeId = await this.services.getConfigColumn(
          member.guild.id,
          'welcomeChannelId'
        );
        const guestRoleId = await this.services.getConfigColumn(
          member.guild.id,
          'guestRoleId'
        );

        if (guestRoleId) {
          const role = await member.guild.roles.cache.find(
            (r) => r.id == guestRoleId
          );
          if (role) {
            member.roles.add(role);
          }
        }

        if (welcomeId) {
          let welcomeChannel = member.guild.channels.cache.find(
            (c) => c.id == welcomeId
          );

          if (welcomeChannel) {
            await (welcomeChannel as TextChannel).send(
              new MessageEmbed()
                .setTitle('BIENVENIDO')
                .setDescription(
                  `bienvenido a ${member.guild.name} ${member} esperamos que lo pases muy bien`
                )
                .setColor(
                  await this.services.getConfigColumn(
                    member.guild.id,
                    'embedColor'
                  )
                )
            );
          }
        }
      }
    );
  }
}
