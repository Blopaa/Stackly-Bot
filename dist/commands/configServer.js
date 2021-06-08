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
class config {
    constructor(services) {
        this.services = services;
        this.name = 'config';
        this.description = 'to config your server';
        this.authorization = 'mod';
        this.alias = "cg";
        this.services = services;
    }
    on({ msg, params }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = msg.member) === null || _a === void 0 ? void 0 : _a.hasPermission('ADMINISTRATOR')) {
                    yield this.services.setConfigColumn(((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.id) || '', params[0], params[1]);
                    yield msg.channel.send(`${params[0]} has been changed to ${params[1]}`);
                }
                else {
                    return;
                }
            }
            catch (error) {
                yield msg.channel.send("an error ocurred trying to configure, maybe what you're tying to configure no exists");
            }
        });
    }
}
exports.default = config;
