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
exports.putRequest = exports.deleteRequest = exports.postRequest = exports.getRequest = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const apiUri = process.env.API_URL;
exports.getRequest = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.get(apiUri + url, { headers: { 'bot-token': process.env.BOT_TOKEN_API } });
        return { data, status };
    }
    catch (e) {
        throw e;
    }
});
exports.postRequest = (url, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.post(apiUri + url, body, { headers: { 'bot-token': process.env.BOT_TOKEN_API } });
        return { data, status };
    }
    catch (e) {
        throw e;
    }
});
exports.deleteRequest = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.delete(apiUri + url, { headers: { 'bot-token': process.env.BOT_TOKEN_API } });
        return { data, status };
    }
    catch (e) {
        throw e;
    }
});
exports.putRequest = (url, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, status } = yield axios_1.default.put(apiUri + url, body, { headers: { 'bot-token': process.env.BOT_TOKEN_API } });
        return { data, status };
    }
    catch (e) {
        throw e;
    }
});
