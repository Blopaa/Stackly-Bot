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
const discord_js_1 = require("discord.js");
const command_1 = require("../types/command");
class Inventory extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'inventory';
        this.description = 'show your inventory';
        this.authorization = 'everyone';
        this.alias = 'i';
    }
    on({ msg }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                throw new Error('no guild');
            let userServer = yield this.services.getUserServer(msg.guild.id, msg.author.id);
            // console.log(userServer.userServerItem)    
            let embed = new discord_js_1.MessageEmbed()
                .setTitle('Inventory')
                .setColor(yield this.services.getConfigColumn(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', 'embedColor'));
            userServer.userServerItem.map((e) => {
                embed.addField(`${e.item.name} - ${e.quantity}`, e.item.description);
            });
            yield msg.channel.send(embed);
        });
    }
}
exports.default = Inventory;
