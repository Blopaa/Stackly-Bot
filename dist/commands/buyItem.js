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
class BuyItem extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'buyItem';
        this.description = 'buy an item from the store';
        this.authorization = 'everyone';
        this.alias = 'bi';
    }
    on({ msg, params }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.guild)
                throw new Error('no guild');
            let item = params[0];
            let items = (yield this.services.getStore(msg.guild.id)).items;
            let itemFound = items.find((e) => e.name == item) ||
                items.find((e) => {
                    var _a, _b, _c;
                    return ((_a = e.name) === null || _a === void 0 ? void 0 : _a.slice(3, e.name.length - 1)) == ((_c = (_b = msg.member) === null || _b === void 0 ? void 0 : _b.guild.roles.cache.find((z) => { var _a; return z.id == ((_a = e.name) === null || _a === void 0 ? void 0 : _a.slice(3, e.name.length - 1)); })) === null || _c === void 0 ? void 0 : _c.id);
                });
            if (itemFound) {
                if (itemFound.price <
                    (yield this.services.getCoins(msg.guild.id, msg.author.id))
                        .coins) {
                    yield this.services.buyItem({
                        serverId: msg.guild.id,
                        userId: msg.author.id,
                        itemId: itemFound.id.toString(),
                    });
                    if (itemFound.type === 'role') {
                        let role = (_a = msg.member) === null || _a === void 0 ? void 0 : _a.guild.roles.cache.find((z) => { var _a; return z.id == ((_a = itemFound === null || itemFound === void 0 ? void 0 : itemFound.name) === null || _a === void 0 ? void 0 : _a.slice(3, itemFound.name.length - 1)); });
                        if (role) {
                            try {
                                yield ((_b = msg.member) === null || _b === void 0 ? void 0 : _b.roles.add(role));
                            }
                            catch (error) {
                                msg.channel.send("missing perms to add the role");
                            }
                        }
                        else {
                            yield msg.channel.send("role doesn't exists");
                        }
                    }
                    yield msg.channel.send('sucesfully bought');
                }
                else {
                    yield msg.reply('not enought coins');
                }
            }
            else {
                yield msg.reply("the item you are trying to buy doesn't exists");
            }
        });
    }
}
exports.default = BuyItem;
