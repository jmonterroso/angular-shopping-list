import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {CreateShoppingListComponent} from './create-shopping-list/create-shopping-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // },
  {
    path: 'shopping/create',
    component: CreateShoppingListComponent,
  },
  {
  path: 'shopping/:id',
  component: ShoppingListComponent
},

  {
  path: '',
  component: ShoppingComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
