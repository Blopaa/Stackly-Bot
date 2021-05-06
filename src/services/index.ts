import {Item} from '../types/entities/item';
import {Store} from '../types/entities/store';
import {getRequest, postRequest, putRequest} from "./BaseServices";

export class Services {

    async getConfigColumn(serverId: string, columnName: string) {
        return getRequest(`server-settings/column/${serverId}/${columnName}`).then(d => d.data)
    }

    async getCoins(serverId: string, userId: string): Promise<{ coins: number }> {
        return getRequest(`user-server/coins/${userId}/${serverId}`).then(d => d.data)
    }

    async getUserByDiscordId(discordId: string) {
        return getRequest(`user/${discordId}`).then(d => d.data)
    }

    async createServer(serverName: string, serverId: string): Promise<void> {
        return postRequest(`server`, {name: serverName, serverId: serverId}).then(d => d.data)
    }

    async createUser(userDiscordId: string, discordTag: string): Promise<void> {
        return postRequest(`user`, {discordId: userDiscordId, discordTag: discordTag}).then(d => d.data)
    }

    async createUserServer(serverId: string, userId: string): Promise<void> {
        return postRequest(`user-server/add/${serverId}/${userId}`, {}).then(d => d.data)
    }

    async setConfigColumn(
        serverId: string,
        columnName: string,
        newValue: string | number
    ) {
        return putRequest(`server-settings/${serverId}`, {columnName: columnName, newValue: newValue}).then(d => d.data)
    }

    async winCoins(serverId: string, userId: string, customCoinsSet?: number) {
        return putRequest(`user-server/coins`, customCoinsSet
            ? {
                serverId: serverId,
                userId: userId,
                customCoinsSet: customCoinsSet,
            }
            : {serverId: serverId, userId: userId}).then(d => d.data)
    }

    async shareCoins(
        serverId: string,
        payerId: string,
        payedId: string,
        customCoinsSet: number
    ) {
        return putRequest(`user-server/sharecoins`, {
            serverId: serverId,
            payerId: payerId,
            payedId: payedId,
            customCoinsSet: customCoinsSet,
        }).then(d => d.data)
    }

    async createStore(serverId: string): Promise<void> {
        return postRequest(`store`, {serverId}).then(d => d.data)
    }

    async addItem(item: Item): Promise<void> {
        return postRequest(`items`, item).then(d => d.data)
    }

    async getStore(id: string): Promise<Store> {
        return getRequest(`store/${id}`).then(d => d.data)
    }

    async buyItem(buyInfo: { serverId: string, userId: string, itemId: string }): Promise<void> {
        return postRequest(`user-server-item/buy`, buyInfo).then(d => d.data)
    }

    async getUserServer(serverId: string, userId: string) {
        return getRequest(`user-server/${userId}/${serverId}`).then(d => d.data)
    }
}
