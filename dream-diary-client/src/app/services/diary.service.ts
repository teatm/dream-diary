import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/diaries'

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl, data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByDate(date) {
    return this.http.get(`${baseUrl}?date=${date}`)
  }

  search(term) {
    var diaries = this.findByDate(term).pipe(
      debounceTime(300),
      map(
        (data:any) => {
          return data.length != 0 ? data as any[] : [{"DiaryContent": "No record found"} as any];
        }
      )
    )

    return diaries;
  }
}
