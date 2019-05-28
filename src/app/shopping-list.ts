import {IShoppingItem} from './shopping-item';

export interface IShoppingList {
  readonly _id?: string;
  readonly name?: string;
  items: [IShoppingItem];

}
