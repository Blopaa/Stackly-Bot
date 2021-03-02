import { Message } from "discord.js";
import { Services } from "../services";

export interface command{
    on: (params: commandParametres) => Promise<void>;
    name: string
    description: string;
    authorization: string;
}

export interface commandParametres{
    msg: Message;
    params: string[];
    commandCache: command[];
}

export class baseCommand {
    constructor(protected services: Services){
        this.services = services
    }
}