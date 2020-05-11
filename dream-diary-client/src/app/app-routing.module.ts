import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryListComponent } from './components/diary-list/diary-list.component';
import { DiaryDetailComponent } from './components/diary-detail/diary-detail.component';
import { AddDiaryComponent } from './components/add-diary/add-diary.component';


const routes: Routes = [
  { path: '', redirectTo: 'diary', pathMatch: 'full' },
  { path: 'diaries', component: DiaryListComponent },
  { path: 'diary/:id', component: DiaryDetailComponent },
  { path: 'add', component: AddDiaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
