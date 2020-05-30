import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryListComponent } from './components/diary-list/diary-list.component';
import { DiaryDetailComponent } from './components/diary-detail/diary-detail.component';
import { DiaryCreateComponent } from './components/diary-create/diary-create.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemCreateComponent } from './components/item-create/item-create.component';


const routes: Routes = [
  { path: '', redirectTo: 'diary-list', pathMatch: 'full' },
  { path: 'diary-list', component: DiaryListComponent },
  { path: 'diary/:id', component: DiaryDetailComponent },
  { path: 'diary-create', component: DiaryCreateComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'item-create', component: ItemCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
