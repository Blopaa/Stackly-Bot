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
class UseItem extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'useItem';
        this.description = 'use any item in your inventory';
        this.authorization = 'everyone';
        this.alias = 'ui';
    }
    on({ msg, params }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userServer = yield this.services.getUserServer((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id, msg.author.id);
                const itemFound = userServer.userServerItem.find((e) => e.item.name == params[0]);
                if (!itemFound)
                    throw new Error();
                const item = (yield this.services.useItem({
                    serverId: (_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id,
                    userId: msg.author.id,
                    itemId: itemFound.item.id.toString(),
                }));
                yield msg.reply(item.message).catch(() => {
                    throw new Error();
                });
            }
            catch (error) {
                msg.reply('no item found');
            }
        });
    }
}
exports.default = UseItem;
