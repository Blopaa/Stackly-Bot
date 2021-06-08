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
class FlipCoin extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'flipCoin';
        this.description = 'try your luck flipping a coin /n !flipCoin + tails or heads + coinBet';
        this.authorization = 'everyone';
        this.alias = "fc";
    }
    on({ msg, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            const beted = params[0];
            const bet = parseInt(params[1]);
            if (beted != 'heads' && beted != 'tails') {
                yield msg.reply(`You must bet just to tails or heads, not to - ${beted} -`);
                return;
            }
            if (!Number.isSafeInteger(bet) || params[1].endsWith('n')) {
                yield msg.reply("you must bet a real number");
                return;
            }
            if (bet >
                (yield this.services.getCoins(yield msg.guild.id, yield msg.author.id)).coins) {
                yield msg.reply('Sorry you dont have enough coins to make this bet');
                return;
            }
            if (bet <= 0) {
                yield msg.reply('the bet must be upper 0');
                return;
            }
            const result = Math.floor((Math.random() * 10) * bet) % 2 == 0 ? 'heads' : 'tails';
            if (result === beted) {
                yield this.services.winCoins(yield msg.guild.id, msg.author.id, bet * 2);
                yield msg.reply(`great you won, you gain ${bet * 2} coins`);
            }
            else {
                yield this.services.winCoins(yield msg.guild.id, yield msg.author.id, -bet);
                yield msg.reply(`tough luck, you lost, try again next time`);
            }
        });
    }
}
exports.default = FlipCoin;
