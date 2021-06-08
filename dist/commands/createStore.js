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
class createStore extends command_1.baseCommand {
    constructor(services) {
        super(services);
        this.services = services;
        this.name = 'createStore';
        this.description = 'create an store for your server';
        this.authorization = 'mod';
        this.alias = 'cs';
    }
    on({ msg }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (msg.member.hasPermission('ADMINISTRATOR')) {
                    yield this.services.createStore(msg.guild.id);
                    yield msg.reply('sucesfully created');
                }
                return;
            }
            catch (err) {
                yield msg.reply('alredy created');
            }
        });
    }
}
exports.default = createStore;
