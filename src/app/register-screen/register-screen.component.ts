import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  readonly apiUrl = 'http://localhost:5000/api/';

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

      this.user = {
        name: '',
        email: '',
        password: '',
      };

      this.router.navigate(['/']);
      this.toastr.success(`Cadastramento efetuado com sucesso  :)`);
    } else {
      alert('Senhas nao conferem');
    }
  };

  ngOnInit(): void {}
}
