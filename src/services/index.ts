import axios from 'axios';

export class Services {
  async getConfigColumn(serverId: string, columnName: string) {
    let res: any;
    try {
      const {
        data,
      } = await axios.get(
        `${process.env.API_URL}serversettings/${serverId}/${columnName}`,
        { headers: { 'bot-token': 123456 } }
      );
      res = data;
    } catch (err) {
      console.log(err.response.data);
      res = null;
    }
    return res;
  }
}
