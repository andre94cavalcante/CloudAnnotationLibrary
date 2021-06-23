import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  observable: Observable<number>;
  constructor(public http: HttpClient) {}

  readonly apiUrl = 'http://localhost:5000/api/';
  readonly searchUrl = this.apiUrl + 'search';
  readonly downloadUrl = this.apiUrl + 'download';

  info = {
    keywordSearch: '',
  };

  notes = [];
  filtersLoaded: Promise<boolean>;

  search = () => {
    this.notes = [];
    this.http.post(this.searchUrl, this.info).subscribe((responseData) => {});
    this.http.get(this.searchUrl).subscribe((data) => {
      Object.values(data).map((note) => {
        console.log(note);
        this.notes.push(note);
      });
      this.filtersLoaded = Promise.resolve(true);
    });
    this.info.keywordSearch = '';
  };

  clear = () => {
    this.info.keywordSearch = '';
  };

  download = (i) => {
    this.http
      .post(this.downloadUrl, this.notes[i])
      .subscribe((responseData) => {});
    this.http.get(this.downloadUrl).subscribe((responseData) => {});
  };

  ngOnInit(): void {}
}
