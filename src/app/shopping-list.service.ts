import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IShoppingList} from './shopping-list';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private http: HttpClient) { }
  configUrl: 'http://localhost:3000';
  getShoppingList(): Observable<any[]> {
    return this.http.get(`http://localhost:3000/shopping-list`).pipe(
      map(res => res['edges'] || [])
    );
  }

  getShoppingListById(id): Observable<any> {
    return this.http.get(`http://localhost:3000/shopping-list/${id}`);
  }


  createShoppingList(item) {
    return this.http.post(`http://localhost:3000/shopping-list`, item);
  }
  deleteShoppingList(id) {
    return this.http.delete(`http://localhost:3000/shopping-list/${id}`);
  }
  addToShoppingList(id, item) {
    return this.http.post(`http://localhost:3000/shopping-list/${id}`, item);
  }

  removeFromShoppingList(id, itemId) {
    return this.http.delete(`http://localhost:3000/shopping-list/${id}/item/${itemId}`);
  }


}
