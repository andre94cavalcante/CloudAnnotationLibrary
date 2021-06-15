import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  readonly apiUrl = 'http://localhost:5000/api/';

  user = {
    email: '',
    password: '',
  };

  authorizedId = 'null';

  login = () => {
    const userUrl = this.apiUrl + 'users';
    this.http.post(userUrl, this.user).subscribe((responseData) => {});

    this.http.get<any>('http://localhost:5000/userID').subscribe((data) => {
      this.authorizedId = data.msg;
      console.log('Session ID hash', data.msg);

      if (
        this.authorizedId.toString() === 'null' ||
        this.authorizedId.toString() === 'E-mail não Cadastrado' ||
        this.authorizedId.toString() === 'Senha Incorreta'
      ) {
        this.toastr.error(this.authorizedId);
        this.user.password = '';
      } else {
        this.user = {
          email: '',
          password: '',
        };

        this.router.navigate(['/home']);
      }
    });
  };

  register = () => {
    this.router.navigate(['/registration']);
  };

  ngOnInit(): void {}
}
