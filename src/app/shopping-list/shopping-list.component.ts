import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingListService} from '../shopping-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private shoppingListService: ShoppingListService, private formBuilder: FormBuilder) {}
  form: FormGroup;
  id: string;
  submitted = false;
  shoppingList;
  total = 0;
  @ViewChild('name') nameField: ElementRef;

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.loadShoppingList();

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  loadShoppingList() {
  this.shoppingListService.getShoppingListById(this.id).subscribe(item => {
    this.shoppingList = item;
    console.log(this.shoppingList, 'this.shoppingList '); // deleteinbuild
    if (this.shoppingList.items) {
      this.total = this.shoppingList.items.reduce((sum, bioy) => {
        return sum + bioy.price;
      }, 0);
      console.log(this.total);
    }
  });

  }
  onSubmit() {
    this.submitted = true;

    if (!this.form.valid) {
      console.log('not valid');
      return;
    }

    this.shoppingListService.addToShoppingList(this.id, this.form.value).subscribe(() => this.loadShoppingList());
    this.form.reset();
    this.nameField.nativeElement.focus();

  }
  onDelete(id) {
    this.shoppingListService.removeFromShoppingList(this.id, id).subscribe(() => this.loadShoppingList());
  }

}
