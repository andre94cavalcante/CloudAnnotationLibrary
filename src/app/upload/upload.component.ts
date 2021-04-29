import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private toastr: ToastrService, public http: HttpClient) {}

  readonly apiUrl = 'http://localhost:5000/api/';

  public uploader: FileUploader = new FileUploader({
    url: this.apiUrl + 'imgUpload',
    itemAlias: 'image',
  });

  fileQueue: Array<string> = [];

  emptyQueue = () => {
    if (this.fileQueue.length != 0) {
      document.getElementById('queue').className += 'active';
    } else {
      document.getElementById('queue').className = 'filesQueued';
    }
  };

  showQueue = () => {
    if (document.getElementById('namesFiles').className == 'namesFilesQueued') {
      document.getElementById('namesFiles').className += 'active';
    } else {
      document.getElementById('namesFiles').className = 'namesFilesQueued';
    }
  };

  notebook = {
    projectName: '',
    projectTags: '',
    subject: '',
    tags: [],
    pages: 0,
    tempQueueImgs: 0,
  };

  tagsToSlice = '';

  separateTags = () => {
    const separators = [' ', ',', ';'];
    this.tagsToSlice = this.tagsToSlice.toLowerCase();
    for (let i = 0; i < 3; i++) {
      this.notebook.tags = this.tagsToSlice.split(separators[i]);
      if (this.notebook.tags.length !== 1) {
        break;
      }
    }
  };

  getNotebookInfo = (callback) => {
    this.separateTags();
    console.log(this.notebook);
    const infoUrl = this.apiUrl + 'infoUpload';
    this.http.post(infoUrl, this.notebook).subscribe((responseData) => {});
    this.notebook = {
      projectName: '',
      projectTags: '',
      subject: '',
      tags: [],
      pages: 0,
      tempQueueImgs: 0,
    };
    this.tagsToSlice = '';
  };

  filesUploaded = () => {
    this.uploader.uploadAll();
    this.toastr.success(
      `${this.fileQueue.length} imagem(ns) adicionada(s)! '\nSeu caderno agora está ainda mais completo!  :)`
    );
    this.fileQueue = [];
    this.emptyQueue();
  };

  updateFilesAndInfo = () => {
    this.getNotebookInfo(this.filesUploaded());
  };

  findNotebookName = () => {
    this.getNotebookInfo(() => {
      console.log('find');
    });
  };

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      this.fileQueue.push(file.file.name);
      console.log(this.fileQueue);
      this.notebook.tempQueueImgs = this.fileQueue.length;
      console.log(this.notebook);
      file.withCredentials = false;
      this.emptyQueue();
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }
}
