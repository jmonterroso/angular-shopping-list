import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingListService} from '../shopping-list.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IShoppingItem} from '../shopping-item';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router,
              private shoppingListService: ShoppingListService, private formBuilder: FormBuilder) {
  }

  form: FormGroup;
  id: string;
  submitted = false;
  shoppingList;
  total = 0;
  currentItem: IShoppingItem = null;
  @ViewChild('name') nameField: ElementRef;

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    this.loadShoppingList();

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      unitPrice: ['', Validators.required],
      qty: [1, Validators.required]
    });
  }

  loadShoppingList() {
    this.shoppingListService.getShoppingListById(this.id).subscribe(item => {
      this.shoppingList = item;
      console.log(this.shoppingList, 'this.shoppingList '); // deleteinbuild
      // if (this.shoppingList.items) {
      //   this.total = this.shoppingList.items.reduce((sum, bioy) => {
      //     return sum + bioy.price;
      //   }, 0);
      //   console.log(this.total);
      // }
      this.form.reset({qty: 1});
      this.nameField.nativeElement.focus();
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.form.valid) {
      console.log('not valid');
      return;
    }

    let req;
    if (this.currentItem) {
      req = this.shoppingListService.editShoppingItem(this.id, this.currentItem._id, this.form.value);
    } else {
      req = this.shoppingListService.addToShoppingList(this.id, this.form.value);
    }

    req.subscribe(() => {
      this.loadShoppingList();
      this.currentItem = null;
    });

  }

  onDelete(id) {
    this.shoppingListService.removeFromShoppingList(this.id, id).subscribe(() => this.loadShoppingList());
  }

  onEdit(id) {
    this.shoppingListService.getShoppingItemFromList(id).subscribe((item) => {
      this.currentItem = item;
      this.form.patchValue(item);
    });
  }
}
