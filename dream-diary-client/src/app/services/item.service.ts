import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

const baseUrl = 'http://localhost:8080/api/items'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

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
    return this.http.put(`${baseUrl}/${id}`, data)
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`)
  }

  findByName(name) {
    return this.http.get(`${baseUrl}?name=${name}`)
  }

  search(term) {
    var items = this.findByName(term).pipe(
      debounceTime(300), //wait for 300 miliseconds after each key stroke
      map(
        (data:any) => {
          return data.length != 0 ? data as any[] : [{"ItemName": "No record found"} as any];
        }
      ));
    return items;
  }
}
