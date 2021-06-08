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
const command_1 = require("../types/command");
class Transaccions extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'share';
        this.description = 'with this command you can share coins with your friends or pay something... Structure: prefix + share + NumberOfCoins + mentionToUser';
        this.authorization = 'everyone';
        this.alias = "t";
    }
    on({ msg, params }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (msg.author != msg.mentions.users.first()) {
                    yield this.services.shareCoins(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', msg.author.id, ((_b = msg.mentions.users.first()) === null || _b === void 0 ? void 0 : _b.id) || '', parseInt(params[0]));
                    yield msg.reply(`you send ${params[0]} coins to ${msg.mentions.users.first()}`);
                }
                else {
                    yield msg.channel.send("you can't sent coins to yourself");
                }
            }
            catch (err) {
                yield msg.reply("you can't share coins, maybe you dont have enought");
            }
        });
    }
}
exports.default = Transaccions;
