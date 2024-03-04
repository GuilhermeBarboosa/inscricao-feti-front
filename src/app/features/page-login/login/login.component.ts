import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { LoginService } from 'src/app/routes/login.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenJwtService: TokenJwtService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private permissionsGuardService: PermissionsGuardService
  ) {}

  loginForm!: FormGroup;
  tipoPagina = 'USER';

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['root@codiub.com.br', Validators.required],
      password: ['admin', Validators.required],
    });

    // this.loginForm = this.formBuilder.group({
    //   email: ['a@a.com', Validators.required],
    //   password: ['admin', Validators.required],
    // });

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
        (data: any) => {
          var data = JSON.parse(JSON.stringify(data));
          this.tokenJwtService.setToken(data);
          this.loginService.obterClaims().subscribe(
            (data: any) => {
              var data = JSON.parse(JSON.stringify(data));
              localStorage.setItem('user', data.user);
              this.permissionsGuardService.ngOnInit();
              this.notifier.showSuccess('Login efetuado com sucesso!');
              this.router.navigate(['/dashboard']);
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
