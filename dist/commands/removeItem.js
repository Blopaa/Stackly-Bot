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
        this.name = 'removeItem';
        this.description = 'remove ann item from the store';
        this.authorization = 'mod';
        this.alias = 'ri';
        this.services = services;
    }
    on({ msg, params }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission('ADMINISTRATOR')) {
                    if (!msg.guild)
                        throw new Error('no guild');
                    let item = params[0];
                    let items = (yield this.services.getStore(msg.guild.id)).items;
                    let itemFound = items.find((e) => e.name == item) ||
                        items.find((e) => {
                            var _a, _b, _c;
                            return ((_a = e.name) === null || _a === void 0 ? void 0 : _a.slice(3, e.name.length - 1)) == ((_c = (_b = msg.member) === null || _b === void 0 ? void 0 : _b.guild.roles.cache.find((z) => { var _a; return z.id == ((_a = e.name) === null || _a === void 0 ? void 0 : _a.slice(3, e.name.length - 1)); })) === null || _c === void 0 ? void 0 : _c.id);
                        });
                    if (!itemFound)
                        throw new Error();
                    yield this.services.removeItem(itemFound === null || itemFound === void 0 ? void 0 : itemFound.id);
                    yield msg.reply('succesfully removed');
                }
            }
            catch (error) {
                msg.reply('item not found');
            }
        });
    }
}
exports.default = SetUp;
