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
class onMessage {
    constructor(client, services, commandCache) {
        this.client = client;
        this.services = services;
        this.commandCache = commandCache;
        this.client = client;
        this.services = services;
        this.commandCache = commandCache;
    }
    userCreation(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.services
                .getUserByDiscordId(msg.author.id)
                .catch(() => {
                this.services.createUser(msg.author.id, msg.author.tag);
                msg.author.send("a new user has been created for you, now you're able to gain coins, you just have to run !coins command");
            })
                .then(() => {
                var _a;
                return this.services
                    .createUserServer(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', msg.author.id)
                    .catch(() => {
                    var _a;
                    this.services.winCoins(((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id) || '', msg.author.id);
                });
            });
            return true;
        });
    }
    on() {
        this.client.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!((_a = msg.guild) === null || _a === void 0 ? void 0 : _a.id))
                return;
            let prefix = yield this.services
                .getConfigColumn(yield msg.guild.id, 'prefix')
                .catch((e) => '!!');
            if (!prefix) {
                prefix = '!!';
            }
            this.userCreation(msg).then(() => {
                const commandArgument = msg.content.slice(prefix.length).split(' ');
                const parametres = commandArgument.slice(1);
                if (msg.content.startsWith(prefix)) {
                    if (this.commandCache.length) {
                        for (let command of this.commandCache) {
                            if (command.name === commandArgument[0] ||
                                command.alias === commandArgument[0]) {
                                command.on({
                                    msg,
                                    params: parametres,
                                    commandCache: this.commandCache,
                                });
                            }
                        }
                    }
                }
            });
        }));
    }
}
exports.default = onMessage;
