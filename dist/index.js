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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = require("dotenv");
const commandsHandler_1 = __importDefault(require("./commandsHandler"));
dotenv_1.config();
class Main {
    constructor() {
        this.client = new discord_js_1.default.Client();
        this.commandHandler = new commandsHandler_1.default();
    }
    connect() {
        this.client.on('ready', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('bot online');
            yield ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.setActivity('Conectado'));
        }));
        this.client.login(`${process.env.BOT_TOKEN}`);
    }
    Main() {
        this.connect();
        this.commandHandler.commandHandler();
    }
    get getClient() {
        return this.client;
    }
}
exports.Main = Main;
const main = new Main();
main.Main();
