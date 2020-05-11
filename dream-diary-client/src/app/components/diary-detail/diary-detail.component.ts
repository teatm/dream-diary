import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.css']
})
export class DiaryDetailComponent implements OnInit {
  currentDiary = null;
  message = '';

  constructor(private diaryService: DiaryService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getDiary(this.route.snapshot.paramMap.get('id'));
  }

  getDiary(id) {
    this.diaryService.get(id)
      .subscribe(
        data => {
          this.currentDiary = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateDiary() {
    this.diaryService.update(this.currentDiary.id, this.currentDiary)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The diary was updated successfully';
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteDiary() {
    this.diaryService.delete(this.currentDiary.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/diaries']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
