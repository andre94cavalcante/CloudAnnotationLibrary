import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css'],
})
export class RegisterScreenComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    public http: HttpClient,
    private router: Router
  ) {}

  // readonly apiUrl = 'http://localhost:5000/api/';
  readonly apiUrl = environment.apiURL;

  user = {
    name: '',
    email: '',
    password: '',
  };

  passwordConfirmation = '';

  register = () => {
    if (this.passwordConfirmation === this.user.password) {
      const registerUrl = this.apiUrl + 'register';
      this.http.post(registerUrl, this.user).subscribe((responseData) => {});
      this.http.get<any>(registerUrl).subscribe((confirmation) => {
        if (confirmation === true) {
          this.user = {
            name: '',
            email: '',
            password: '',
          };
          this.router.navigate(['/']);
          this.toastr.success('Cadastramento efetuado com sucesso  :)');
        } else {
          this.toastr.warning('E-mail já cadastrado!');
        }
      });
    } else {
      this.toastr.error('Senhas não conferem!');
    }
  };

  ngOnInit(): void {}
}
