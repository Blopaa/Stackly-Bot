"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnNewMember = void 0;
const discord_js_1 = require("discord.js");
class OnNewMember {
    constructor(client, services) {
        this.client = client;
        this.services = services;
        this.client = client;
        this.services = services;
    }
    on() {
        this.client.on('guildMemberAdd', (member) => __awaiter(this, void 0, void 0, function* () {
            const welcomeId = yield this.services.getConfigColumn(member.guild.id, 'welcomeChannelId');
            const guestRoleId = yield this.services.getConfigColumn(member.guild.id, 'guestRoleId');
            if (guestRoleId) {
                const role = yield member.guild.roles.cache.find((r) => r.id == guestRoleId);
                if (role) {
                    member.roles.add(role);
                }
            }
            if (welcomeId) {
                let welcomeChannel = member.guild.channels.cache.find((c) => c.id == welcomeId);
                if (welcomeChannel) {
                    yield welcomeChannel.send(new discord_js_1.MessageEmbed()
                        .setTitle('BIENVENIDO')
                        .setDescription(`bienvenido a ${member.guild.name} ${member} esperamos que lo pases muy bien`)
                        .setColor(yield this.services.getConfigColumn(member.guild.id, 'embedColor')));
                }
            }
        }));
    }
}
exports.OnNewMember = OnNewMember;
