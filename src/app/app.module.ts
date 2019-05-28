import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ShoppingListService} from './shopping-list.service';
import { CreateShoppingListComponent } from './create-shopping-list/create-shopping-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { FormsModule } from '@angular/forms';

import { ShoppingComponent } from './shopping/shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateShoppingListComponent,
    ShoppingListComponent,
    ShoppingComponent
  ],
  imports: [
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
