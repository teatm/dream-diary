import { Component, OnInit } from '@angular/core';
import { DiaryService } from 'src/app/services/diary.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.component.html',
  styleUrls: ['./diary-detail.component.css']
})
export class DiaryDetailComponent implements OnInit {

  diary = null;
  message = '';
  removable = true;
  selectable = true;

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
          this.diary = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateDiary() {
    this.diaryService.update(this.diary.id, this.diary)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The diary was updated successfully';
          this.router.navigate(['diary-list']);
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteDiary() {
    this.diaryService.delete(this.diary.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['diary-list']);
        },
        error => {
          console.log(error);
        }
      );
  }

  backToList() {
    this.router.navigate(['diary-list']);
  }
}
