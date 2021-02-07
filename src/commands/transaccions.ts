
import { Message } from "discord.js";
import { Services } from "../services";
import { baseCommand, command } from "../types/command";

export default class Transaccions extends baseCommand implements command {
    constructor(protected readonly services: Services){
        super(services)
    }

    public readonly name: string = 'share'

    public async on(msg: Message, params: string[]){
        this.services.shareCoins(msg.guild?.id || '', msg.author.id, msg.mentions.users.first()?.id || '', parseInt(params[0]))
    }
}