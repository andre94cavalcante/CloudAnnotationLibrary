import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public http: HttpClient,
    private router: Router
  ) {}

  readonly apiUrl = 'http://localhost:5000/api/';

  user = {
    email: '',
    password: '',
  };

  login = () => {
    const userUrl = this.apiUrl + 'users';
    this.http.post(userUrl, this.user).subscribe((responseData) => {});

    this.user = {
      email: '',
      password: '',
    };

    this.router.navigate(['/home']);
  };

  register = () => {
    this.router.navigate(['/registration']);
  };

  ngOnInit(): void {}
}
