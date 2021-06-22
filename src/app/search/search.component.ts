import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(public http: HttpClient) {}

  readonly apiUrl = 'http://localhost:5000/api/';
  // readonly searchUrl = this.apiUrl + 'search';

  info = {
    keywordSearch: '',
  };

  search = () => {
    this.reloadRecomendation();
    this.info.keywordSearch = '';
  };

  clear = () => {
    this.info.keywordSearch = '';
  };

  reloadRecomendation = () => {
    const searchUrl = this.apiUrl + 'search';
    console.log(this.info.keywordSearch);
    return this.http.post(searchUrl, this.info).subscribe((responseData) => {});
  };

  ngOnInit(): void {}
}
