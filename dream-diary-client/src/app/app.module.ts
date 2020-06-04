import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { DiaryCreateComponent } from './components/diary/diary-create/diary-create.component';
import { DiaryDetailComponent } from './components/diary/diary-detail/diary-detail.component';
import { DiaryListComponent } from './components/diary/diary-list/diary-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemListComponent } from './components/item/item-list/item-list.component';
import { ItemCreateComponent } from './components/item/item-create/item-create.component';
import { ItemDetailComponent } from './components/item/item-detail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DiaryCreateComponent,
    DiaryDetailComponent,
    DiaryListComponent,
    HeaderComponent,
    FooterComponent,
    ItemListComponent,
    ItemCreateComponent,
    ItemDetailComponent,
  ],
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
