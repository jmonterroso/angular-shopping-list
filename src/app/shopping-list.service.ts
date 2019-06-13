import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private http: HttpClient) { }
  getShoppingList() {
    return this.http.get(`${environment.apiUrl}/shopping-list`);
  }

  getShoppingListById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/shopping-list/${id}`);
  }


  createShoppingList(item) {
    return this.http.post(`${environment.apiUrl}/shopping-list`, item);
  }
  deleteShoppingList(id) {
    return this.http.delete(`${environment.apiUrl}/shopping-list/${id}`);
  }
  addToShoppingList(id, item) {
    return this.http.post(`${environment.apiUrl}/shopping-list/${id}`, item);
  }

  removeFromShoppingList(id, itemId) {
    return this.http.delete(`${environment.apiUrl}/shopping-list/${id}/item/${itemId}`);
  }


}
