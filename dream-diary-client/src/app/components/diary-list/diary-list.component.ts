import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service'

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

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.retrieveDiaries();
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
  }

  // setActiveDiary(diary) {
  //   this.selectedDiary = diary;
  // }

  removeAllDiaries() {
    this.diaryService.getAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveDiaries();
        },
        error => {
          console.log(error);
        }
      );
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
