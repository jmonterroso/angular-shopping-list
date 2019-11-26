import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShoppingListService} from '../shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-shopping-list',
  templateUrl: './create-shopping-list.component.html',
  styleUrls: ['./create-shopping-list.component.scss']
})
export class CreateShoppingListComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  id: string;
  @Output() listCreated: EventEmitter<boolean> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private shoppingListService: ShoppingListService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      budget: [0],
    });
    if (this.id) {
      this.loadShoppingList();
    }
  }


  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }

    if (this.id) {
      this.shoppingListService.editShoppingLIst(this.id, this.form.value).subscribe(item => this.router.navigate(['/']));
    } else {
      this.shoppingListService.createShoppingList(this.form.value).subscribe(item => this.router.navigate(['/']));
    }


  }

  loadShoppingList() {
    this.shoppingListService.getShoppingListById(this.id).subscribe(item => {
      console.log(item, 'item '); //deleteinbuild
      this.form.patchValue(item);
    });

  }


}
