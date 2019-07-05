import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) {}
  total = 0;
  shoppingList;
  ngOnInit(): void {
    this.loadShoppingList();
  }
  deleteShoppingList(id) {
    this.shoppingListService.deleteShoppingList(id).subscribe(() => this.loadShoppingList());
  }
  loadShoppingList() {
    this.shoppingListService.getShoppingList().subscribe(item => {
      this.shoppingList = item;
      console.log(this.shoppingList);
      if (this.shoppingList) {
        this.total = this.shoppingList.reduce((sum, item) => {
          return sum + item.total;
        }, 0);
      }

    });
  }


}
