import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  observable: Observable<number>;
  constructor(public http: HttpClient, private toastr: ToastrService) {}

  // readonly apiUrl = 'http://localhost:5000/api/';
  readonly apiUrl = environment.apiURL;
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
      if (data !== null) {
        Object.values(data).map((note) => {
          console.log(note);
          this.notes.push(note);
        });
        this.filtersLoaded = Promise.resolve(true);
      } else {
        this.toastr.warning('Nenhum resultado encontrado :(');
      }
    });
    this.info.keywordSearch = '';
  };

  clear = () => {
    this.info.keywordSearch = '';
  };

  download = (i) => {
    this.toastr.success('Seu caderno está ficando pronto  :)');
    this.http
      .post(this.downloadUrl, this.notes[i])
      .subscribe((responseData) => {});
    this.http
      .get(this.downloadUrl, { responseType: 'blob' as 'json' })
      .subscribe((res) => {
        console.log(res);
        const blob = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = blob;
        link.download = this.notes[i].projectName + '.pdf';
        link.click();
        window.URL.revokeObjectURL(blob);
        link.remove();
        this.http
          .post(this.downloadUrl + '/done', { info: true })
          .subscribe((data) => {});
      });
  };

  ngOnInit(): void {}
}
