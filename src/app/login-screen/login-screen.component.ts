import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    public http: HttpClient,
    private router: Router
  ) {}

  // readonly apiUrl = 'http://localhost:5000/api/';

  readonly apiUrl = environment.apiURL;

  user = {
    email: '',
    password: '',
  };

  authorizedID = 'null';

  login = () => {
    console.log(environment);
    console.log(process.env);
    if (this.user.email !== '' && this.user.password !== '') {
      const userUrl = this.apiUrl + 'login';
      this.http.post(userUrl, this.user).subscribe((responseData) => {});

      this.http.get<any>(userUrl).subscribe((data) => {
        this.authorizedID = data.msg;
        console.log('Session Hash ID', this.authorizedID);

        if (
          this.authorizedID.toString() === 'null' ||
          this.authorizedID.toString() === 'Dados Incorretos'
        ) {
          this.toastr.error(this.authorizedID);
          this.user.password = '';
        } else {
          this.user = {
            email: '',
            password: '',
          };

          this.router.navigate(['/home']);
        }
      });
    } else {
      this.toastr.warning('Preencha os Campos');
    }
  };

  register = () => {
    this.router.navigate(['/registration']);
  };
}
