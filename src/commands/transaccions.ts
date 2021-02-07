
import { Services } from "../services";
import { baseCommand, command } from "../types/command";

export default class Transaccions extends baseCommand implements command {
    constructor(protected readonly services: Services){
        super(services)
    }
}