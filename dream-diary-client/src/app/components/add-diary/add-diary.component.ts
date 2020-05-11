import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-add-diary',
  templateUrl: './add-diary.component.html',
  styleUrls: ['./add-diary.component.css']
})
export class AddDiaryComponent implements OnInit {
  diary = {
    date: '',
    content: ''
  };
  submitted = false;

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
  }

  saveDiary() {
    const data = {
      id: 50,
      date: this.diary.date,
      content: this.diary.content
    };

    this.diaryService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  newDiary() {
    this.submitted = false;
    this.diary = {
      date: '',
      content: ''
    }
  }

}
