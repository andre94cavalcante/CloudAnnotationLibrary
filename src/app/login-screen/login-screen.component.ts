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

  // readonly apiUrl = 'http://localhost:5000/api/';

  readonly apiUrl = 'http://tcc-andre.herokuapp.com/';

  user = {
    email: '',
    password: '',
  };

  authorizedID = 'null';

  login = () => {
    const userUrl = this.apiUrl + 'login';
    this.http.post(userUrl, this.user).subscribe((responseData) => {});

    this.http.get<any>(userUrl).subscribe((data) => {
      this.authorizedID = data.msg;
      console.log('Session Hash ID', this.authorizedID);

      if (
        this.authorizedID.toString() === 'null' ||
        this.authorizedID.toString() === 'E-mail não Cadastrado' ||
        this.authorizedID.toString() === 'Senha Incorreta'
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
  };

  register = () => {
    this.router.navigate(['/registration']);
  };

  ngOnInit(): void {}
}
