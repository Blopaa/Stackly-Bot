import { Message } from "discord.js";
import { Services } from "../../services";

export class SetUp {
    constructor(private readonly services: Services){
        this.services = services;
    }

    async createServer(msg: Message){
        console.log("here")
        await this.services.createServer(msg.guild?.name || '', msg.guild?.id || '');
        msg.channel.send('server setUp')
    }
}