import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../../../services/diary.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-diary-create',
  templateUrl: './diary-create.component.html',
  styleUrls: ['./diary-create.component.css']
})
export class DiaryCreateComponent implements OnInit {
  diary = {
    date: '',
    content: ''
  };
  submitted = false;

  constructor(private diaryService: DiaryService, private router: Router) { }

  ngOnInit(): void {
  }

  createDiary() {
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
          this.router.navigate(['diary-list']);
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
