import axios from 'axios';

export class Services {
  async getConfigColumn(serverId: string, columnName: string) {
    let res: any;
    try {
      const {
        data,
      } = await axios.get(
        `${process.env.API_URL}serversettings/column/${serverId}/prefix`,
        { headers: { 'bot-token': process.env.BOT_TOKEN_API } }
      );
      res = data;
    } catch (err) {
      console.log(err.response.data);
    }
    return res;
  }

  async createServer(serverName: string, serverId: string): Promise<void> {
    try {
      await axios.post(
        `${process.env.API_URL}server/add`,
        { "name": serverName, "serverId": serverId },
        {
          headers: { 'bot-token': process.env.BOT_TOKEN_API },
        }
      );
    } catch (err) {
      throw err;
    }
  }

  async setConfigColumn(serverId: string, columnName: string, newValue: string | number ){
    try {
      await axios.post(
        `${process.env.API_URL}serversettings/${serverId}`,
        { "columnName": columnName, "newValue": newValue },
        {
          headers: { 'bot-token': process.env.BOT_TOKEN_API },
        }
      );
    } catch (err) {
      throw err;
    }
  }
}
