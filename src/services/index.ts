import { Item } from '../types/entities/item';
import { Store } from '../types/entities/store';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from './BaseServices';

export class Services {
  async getConfigColumn(serverId: string, columnName: string) {
    try {
      return await getRequest(
        `server-settings/column/${serverId}/${columnName}`
      ).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async getCoins(serverId: string, userId: string): Promise<{ coins: number }> {
    try {
      return await getRequest(`user-server/coins/${userId}/${serverId}`).then(
        (d) => d.data
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserByDiscordId(discordId: string) {
    try {
      return await getRequest(`user/${discordId}`).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async createServer(serverName: string, serverId: string): Promise<void> {
    try {
      return await postRequest(`server`, {
        name: serverName,
        serverId: serverId,
      }).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async createUser(userDiscordId: string, discordTag: string): Promise<void> {
    try {
      return await postRequest(`user`, {
        discordId: userDiscordId,
        discordTag: discordTag,
      }).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async createUserServer(serverId: string, userId: string): Promise<void> {
    try {
      return await postRequest(
        `user-server/add/${serverId}/${userId}`,
        {}
      ).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async setConfigColumn(
    serverId: string,
    columnName: string,
    newValue: string | number
  ) {
    try {
      return await putRequest(`server-settings/${serverId}`, {
        columnName: columnName,
        newValue: newValue,
      }).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async winCoins(serverId: string, userId: string, customCoinsSet?: number) {
    try {
      return await putRequest(
        `user-server/coins`,
        customCoinsSet
          ? {
              serverId: serverId,
              userId: userId,
              customCoinsSet: customCoinsSet,
            }
          : { serverId: serverId, userId: userId }
      ).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async shareCoins(
    serverId: string,
    payerId: string,
    payedId: string,
    customCoinsSet: number
  ) {
    try {
      return await putRequest(`user-server/sharecoins`, {
        serverId: serverId,
        payerId: payerId,
        payedId: payedId,
        customCoinsSet: customCoinsSet,
      }).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async createStore(serverId: string): Promise<void> {
    try {
      return await postRequest(`store`, { serverId }).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async addItem(item: Item): Promise<void> {
    try {
      return await postRequest(`items`, item).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async getStore(id: string): Promise<Store> {
    try {
      return await getRequest(`store/${id}`).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }

  async buyItem(buyInfo: {
    serverId: string;
    userId: string;
    itemId: string;
  }): Promise<void> {
    try {
      return await postRequest(`user-server-item/buy`, buyInfo).then(
        (d) => d.data
      );
    } catch (error) {
      throw error;
    }
  }

  async getUserServer(serverId: string, userId: string) {
    try {
      return await getRequest(`user-server/${userId}/${serverId}`).then(
        (d) => d.data
      );
    } catch (error) {
      throw error;
    }
  }

  async useItem(buyInfo: {
    serverId: string;
    userId: string;
    itemId: string;
  }): Promise<Item> {
    try {
      return await postRequest(`user-server-item/use`, buyInfo).then((d) => {
        console.log(d.data);
        return d.data;
      });
    } catch (error) {
      throw error;
    }
  }

  async removeItem(id: number): Promise<void> {
    try {
      return await deleteRequest(`items/${id}`).then((d) => d.data);
    } catch (error) {
      throw error;
    }
  }
}
