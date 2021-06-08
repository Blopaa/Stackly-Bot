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
class Store extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'store';
        this.description = 'show the store';
        this.authorization = 'everyone';
        this.alias = 's';
    }
    on({ msg }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                throw new Error('no guild');
            let store = yield this.services.getStore(msg.guild.id);
            let embed = new discord_js_1.MessageEmbed()
                .setTitle(`${msg.guild.name} store`)
                .setColor(yield this.services.getConfigColumn(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', 'embedColor'));
            if (!store.items || !store) {
                yield msg.reply('there are no items in the shop or you have no shop, type `!cs` to create a store or type `!ai itemName price` and create an item');
            }
            store.items.map((e) => {
                var _a, _b;
                if (e.type == 'role') {
                    embed.addField(`${e.price} - ${(_b = (_a = msg.member) === null || _a === void 0 ? void 0 : _a.guild.roles.cache.find((z) => { var _a; return z.id === ((_a = e.name) === null || _a === void 0 ? void 0 : _a.slice(3, e.name.length - 1)); })) === null || _b === void 0 ? void 0 : _b.name}`, e.description);
                }
                else {
                    embed.addField(`${e.price} - ${e.name}`, e.description);
                }
            });
            yield msg.channel.send(embed);
        });
    }
}
exports.default = Store;
