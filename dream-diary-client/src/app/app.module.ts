import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AppComponent } from './app.component';
import { AddDiaryComponent } from './components/add-diary/add-diary.component';
import { DiaryDetailComponent } from './components/diary-detail/diary-detail.component';
import { DiaryListComponent } from './components/diary-list/diary-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDiaryComponent,
    DiaryDetailComponent,
    DiaryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
