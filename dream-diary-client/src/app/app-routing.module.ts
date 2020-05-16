import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryListComponent } from './components/diary-list/diary-list.component';
import { DiaryDetailComponent } from './components/diary-detail/diary-detail.component';
import { DiaryCreateComponent } from './components/diary-create/diary-create.component';


const routes: Routes = [
  { path: '', redirectTo: 'diary-list', pathMatch: 'full' },
  { path: 'diary-list', component: DiaryListComponent },
  { path: 'diary/:id', component: DiaryDetailComponent },
  { path: 'diary-create', component: DiaryCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
