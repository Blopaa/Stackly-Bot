'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.commandCache = void 0;
const fs_1 = require('fs');
exports.commandCache = [];
class CommandsHandler {
  constructor(services) {
    this.services = services;
    this.services = services;
  }
  commandHandler() {
    const commands = fs_1
      .readdirSync('./src/commands')
      .filter((e) => e.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`./commands/${file}`).default;
      if (pull) {
        exports.commandCache.push(new pull(this.services));
      }
    }
    console.log('commands ready');
  }
}
exports.default = CommandsHandler;
