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
class SetUp {
    constructor(services) {
        this.services = services;
        this.name = 'setup';
        this.description = 'to setUp your server in the database to configure it. structure: prefix + setup';
        this.authorization = 'mod';
        this.alias = "su";
        this.services = services;
    }
    on({ msg }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission("ADMINISTRATOR")) {
                    yield this.services.createServer(((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.name) || '', ((_c = msg.guild) === null || _c === void 0 ? void 0 : _c.id) || '');
                    yield msg.channel.send('server setUp');
                }
                else {
                    return;
                }
            }
            catch (error) {
                yield msg.channel.send('an error ocurred trying to setup the server');
            }
        });
    }
}
exports.default = SetUp;
