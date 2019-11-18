import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShoppingListService} from '../shopping-list.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-shopping-list',
  templateUrl: './create-shopping-list.component.html',
  styleUrls: ['./create-shopping-list.component.scss']
})
export class CreateShoppingListComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  @Output() listCreated: EventEmitter<boolean> =   new EventEmitter();

  constructor(private formBuilder: FormBuilder, private shoppingListService: ShoppingListService,
              private router: Router

              ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      budget: [0],
    });
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
    this.shoppingListService.createShoppingList(this.form.value).subscribe(item => this.router.navigate(['/']));

  }

}
