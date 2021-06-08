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
class help extends command_1.baseCommand {
    constructor(services, client) {
        super(services);
        this.services = services;
        this.client = client;
        this.name = 'help';
        this.description = 'if you need help type prefix + help';
        this.authorization = 'everyone';
        this.alias = "h";
        this.client = client;
    }
    on({ msg, commandCache }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed()
                .setTitle('HELP')
                .setColor(yield this.services.getConfigColumn(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', 'embedColor'));
            commandCache.map((e) => {
                var _a;
                if (e.authorization === 'mod' && ((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission("ADMINISTRATOR"))) {
                    embed.addField(e.name, e.description);
                }
                if (e.authorization === 'everyone') {
                    embed.addField(e.name, e.description);
                }
            });
            yield msg
                .reply('the command help was sent to your DM')
                .then(() => msg.author.send(embed));
        });
    }
}
exports.default = help;
