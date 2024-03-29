import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
@Component({
  selector: 'app-login-candidato',
  templateUrl: './login-candidato.component.html',
  styleUrls: ['./login-candidato.component.css'],
})
export class LoginCandidatoComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenJwtService: TokenJwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['guilherme@gmail.com', Validators.required],
      password: ['1234', Validators.required],
    });

    if (localStorage.getItem('email') != null) {
      this.loginForm.get('email')?.setValue(localStorage.getItem('email'));
      localStorage.removeItem('email');
    }
  }

  login() {
    if (this.loginForm.valid) {
      let loginInput = new LoginInput(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
      this.loginService.login(loginInput).subscribe(
        (response: any) => {
          var login = JSON.parse(JSON.stringify(response));
          this.tokenJwtService.setToken(login);
          this.loginService.obterClaims().subscribe(
            (claims: any) => {
              var claims = JSON.parse(JSON.stringify(claims));
              localStorage.setItem('user', claims.name);
              this.notifier.showSuccess('Login efetuado com sucesso!');
              this.router.navigateByUrl('/inicio');
            },
            (error: any) => {
              this.notifier.showError('Login ou senha incorretos!');
            }
          );
        },
        (error: any) => {
          this.notifier.showError('Login ou senha incorretos!');
        }
      );
    }
  }

  showPassword() {
    let input = document.querySelector('#password') as HTMLInputElement;
    input!.type = input!.type === 'text' ? 'password' : 'text';
  }
}
