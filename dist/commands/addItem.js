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
class addItem extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'createStore';
        this.description = 'create an store for your server';
        this.authorization = 'mod';
        this.alias = 'ai';
    }
    on({ msg, params }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    const item = {};
                    item.name = params[0];
                    item.price = +params[1];
                    const collector = (message) => __awaiter(this, void 0, void 0, function* () {
                        return yield msg.channel.awaitMessages((m) => m.author.id === message.author.id, {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        });
                    });
                    const itemQuiz = () => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b, _c, _d, _e, _f, _g;
                        yield msg.channel.send('write a short description, type `cancel` to stop');
                        const descCollector = yield collector(msg);
                        if (((_a = descCollector.first()) === null || _a === void 0 ? void 0 : _a.content) == 'cancel') {
                            yield msg.reply('stoped');
                            return;
                        }
                        item.description = (_b = descCollector.first()) === null || _b === void 0 ? void 0 : _b.content;
                        yield msg.channel.send('tell me a message to say when somebody use the item, type `cancel` to stop');
                        const msgCollector = yield collector(msg);
                        if (((_c = msgCollector.first()) === null || _c === void 0 ? void 0 : _c.content) == 'cancel') {
                            yield msg.reply('stoped');
                            return;
                        }
                        item.message = (_d = msgCollector.first()) === null || _d === void 0 ? void 0 : _d.content;
                        yield msg.channel.send('last question, the item type is a role or other? type `role` to select role or `type any letter` to not select role, type `cancel` to stop');
                        const typeCollector = yield collector(msg);
                        if (((_e = typeCollector.first()) === null || _e === void 0 ? void 0 : _e.content) == 'cancel') {
                            yield msg.reply('stoped');
                            return;
                        }
                        if (((_f = typeCollector.first()) === null || _f === void 0 ? void 0 : _f.content) === 'role') {
                            item.type = 'role';
                        }
                        else {
                            item.type = 'no role';
                        }
                        let created = yield new discord_js_1.MessageEmbed()
                            .setTitle('New Item Preview')
                            .setColor(yield this.services.getConfigColumn(((_g = msg.guild) === null || _g === void 0 ? void 0 : _g.id) || '', 'embedColor'));
                        let itemEntries = Object.entries(item);
                        itemEntries.map((e) => {
                            if (e[0] != 'storeId') {
                                created.addField(e[0], e[1]);
                            }
                        });
                        yield msg.channel.send(created);
                        let isCorrect = yield msg.channel.send('is this correct?');
                        yield isCorrect.react('✅');
                        yield isCorrect.react('❌');
                        let reactionCollector = yield isCorrect.createReactionCollector((r, u) => r.emoji.name === '✅' || ('❌' && u.id === msg.author.id), { time: 10000 });
                        reactionCollector.on('collect', (r) => __awaiter(this, void 0, void 0, function* () {
                            var _h, _j;
                            if (r.emoji.name == '✅') {
                                yield ((_h = isCorrect.reactions.cache
                                    .get('❌')) === null || _h === void 0 ? void 0 : _h.remove().catch((err) => console.log(err)));
                                if (!msg.guild)
                                    throw new Error('no guild');
                                item.serverId = msg.guild.id;
                                yield this.services.addItem(item);
                                yield msg.channel.send('saved');
                            }
                            else {
                                yield ((_j = isCorrect.reactions.cache
                                    .get('✅')) === null || _j === void 0 ? void 0 : _j.remove().catch((err) => console.log(err)));
                                yield itemQuiz();
                            }
                        }));
                        // if(await reactionCollector)
                    });
                    try {
                        yield itemQuiz();
                    }
                    catch (error) {
                        yield msg.channel.send('an error ocurred');
                    }
                }
            }
            catch (error) { }
        });
    }
}
exports.default = addItem;
