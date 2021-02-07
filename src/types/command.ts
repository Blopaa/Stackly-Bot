import { Message } from "discord.js";
import { Services } from "../services";

export interface command{
    on: (msg: Message, params: string[],) => Promise<void>;
    name: string
}

export class baseCommand {
    constructor(protected services: Services){
        this.services = services
    }
}