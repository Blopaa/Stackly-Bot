import { Item } from './item';

export interface UserServer {
  //   coins: number;
  //   user: {};

  //   server: {};

  userServerItem: Array<{item: Item, quantity: number}>;
}
