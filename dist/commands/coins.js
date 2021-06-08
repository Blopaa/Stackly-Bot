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
class coins extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'coins';
        this.description = 'to show your coins Structure prefix + coins';
        this.authorization = 'everyone';
        this.alias = 'c';
    }
    on({ msg }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coins = yield this.services.getCoins(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', msg.author.id);
                yield msg.reply(`you have ${coins.coins} coins`);
            }
            catch (error) {
                yield msg.reply('maybe you dont have an account,this should be an internal error please contac with a mod');
            }
        });
    }
}
exports.default = coins;
