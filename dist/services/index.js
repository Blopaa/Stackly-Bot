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
exports.Services = void 0;
const BaseServices_1 = require("./BaseServices");
class Services {
    getConfigColumn(serverId, columnName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.getRequest(`server-settings/column/${serverId}/${columnName}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCoins(serverId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.getRequest(`user-server/coins/${userId}/${serverId}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserByDiscordId(discordId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.getRequest(`user/${discordId}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createServer(serverName, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`server`, {
                    name: serverName,
                    serverId: serverId,
                }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUser(userDiscordId, discordTag) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`user`, {
                    discordId: userDiscordId,
                    discordTag: discordTag,
                }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createUserServer(serverId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`user-server/add/${serverId}/${userId}`, {}).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    setConfigColumn(serverId, columnName, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.putRequest(`server-settings/${serverId}`, {
                    columnName: columnName,
                    newValue: newValue,
                }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    winCoins(serverId, userId, customCoinsSet) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.putRequest(`user-server/coins`, customCoinsSet
                    ? {
                        serverId: serverId,
                        userId: userId,
                        customCoinsSet: customCoinsSet,
                    }
                    : { serverId: serverId, userId: userId }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    shareCoins(serverId, payerId, payedId, customCoinsSet) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.putRequest(`user-server/sharecoins`, {
                    serverId: serverId,
                    payerId: payerId,
                    payedId: payedId,
                    customCoinsSet: customCoinsSet,
                }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    createStore(serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`store`, { serverId }).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`items`, item).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.getRequest(`store/${id}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    buyItem(buyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`user-server-item/buy`, buyInfo).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getUserServer(serverId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.getRequest(`user-server/${userId}/${serverId}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    useItem(buyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.postRequest(`user-server-item/use`, buyInfo).then((d) => {
                    console.log(d.data);
                    return d.data;
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    removeItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BaseServices_1.deleteRequest(`items/${id}`).then((d) => d.data);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Services = Services;
