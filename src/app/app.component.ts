import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IShoppingList} from './shopping-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  title = 'list';
  shoppingList;
  ngOnInit(): void {
    this.loadShoppingList();
  }

  loadShoppingList() {
    this.shoppingListService.getShoppingList().subscribe(item => this.shoppingList = item);
  }
}
