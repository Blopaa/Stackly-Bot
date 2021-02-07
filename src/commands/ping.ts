import { Message } from "discord.js"
import { command } from "../types/command"

export default class ping implements command {
    public readonly name: string = "ping"

    async on(msg: Message){
        msg.channel.send('pong')
    }
}