if (this.passwordConfirmation === this.user.password) {
  const registerUrl = this.apiUrl + 'register';
  this.http.post(registerUrl, this.user).subscribe((responseData) => {});

  this.http.get<any>(registerUrl).subscribe((confirmation) => {
    if(confirmation === true) {
      this.user = {
        name: '',
        email: '',
        password: '',
      };
      this.router.navigate(['/']);
      this.toastr.success('Cadastramento efetuado com sucesso  :)');
    } else {
      this.toastr.warning('E-mail já cadastrado!')
    }
  }
} else {
    this.toastr.error('Senhas não conferem!')
}

