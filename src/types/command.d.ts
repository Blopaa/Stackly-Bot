import { Message } from "discord.js";

export interface command{
    on: (msg: Message, params: string[],) => Promise<void>;
    name: string
}