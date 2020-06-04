import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service'
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css']
})
export class DiaryListComponent implements OnInit {

  diaries;
  selectedDiary;
  selectedIndex = -1;
  date = '';

  searchTerm: FormControl = new FormControl();
  searchDiaries = <any>[];

  constructor(private diaryService: DiaryService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveDiaries();

    this.searchTerm.valueChanges.subscribe(
      term => {
        if (term != "") {
          this.diaryService.search(term).subscribe(
            data => {
              this.searchDiaries = data as any[]
            }
          )
        }
      }
    )
  }

  retrieveDiaries() {
    this.diaryService.getAll()
      .subscribe(
        data => {
          this.diaries = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList() {
    this.retrieveDiaries();
    this.selectedDiary = null;
    this.selectedIndex = -1;
  }

  setActiveDiary(diary, index) {
    this.selectedDiary = diary;
    this.selectedIndex = index;

    this.router.navigate(['diary/', diary.id]);
  }

  searchDate() {
    this.diaryService.findByDate(this.date)
      .subscribe(
        data => {
          this.diaries = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
