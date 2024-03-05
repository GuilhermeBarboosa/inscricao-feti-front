import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsGuardService } from 'src/app/guards/permissions-guard.service';
import { RoleTela } from 'src/app/interfaces/dto/roleTela';
import { Tela } from 'src/app/interfaces/dto/tela';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { LoginService } from 'src/app/routes/login.service';
import { RoleTelaService } from 'src/app/routes/role-tela.service';
import { TelaService } from 'src/app/routes/tela.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { RouteInfoService } from 'src/app/services/route-info.service';
import { TokenJwtService } from 'src/app/services/token-jwt.service';
import { roles } from 'src/roles';

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
    private permissionsGuardService: PermissionsGuardService,
    private roleTela: RoleTelaService,
    private telaService: TelaService
  ) {}

  loginForm!: FormGroup;
  tipoPagina = 'USER';

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['root@codiub.com.br', Validators.required],
    //   password: ['admin', Validators.required],
    // });

    this.loginForm = this.formBuilder.group({
      email: ['a@a.com', Validators.required],
      password: ['admin', Validators.required],
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
        (loginResponse: any) => {
          var loginJson = JSON.parse(JSON.stringify(loginResponse));
          this.tokenJwtService.setToken(loginJson);
          this.loginService.obterClaims().subscribe(
            (claims: any) => {
              var claimsResponse = JSON.parse(JSON.stringify(claims));
              localStorage.setItem('user', claimsResponse.user);
              this.permissionsGuardService.ngOnInit();
              this.notifier.showSuccess('Login efetuado com sucesso!');
              this.router.navigate(['/profile']);

              // if (claimsResponse.role != roles.ROLE_ADMIN) {
              //   this.verifyRouteAcess(claimsResponse);
              // } else {
              //
              // }
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

  // async verifyRouteAcess(user: any) {
  //   let tela: Tela[] = [];
  //   let roleTela: RoleTela[] = [];

  //   await this.telaService.telasVariables$.subscribe((telaResponse: any) => {
  //     telaResponse.forEach((element: any) => {
  //       if (
  //         element &&
  //         element.identificador &&
  //         typeof element.identificador === 'string' &&
  //         !element.identificador.includes('-')
  //       ) {
  //         tela.push(element);
  //       }
  //     });
  //   });

  //   await this.roleTela
  //     .getByRole(user.idRole)
  //     .subscribe((responseRoleTela: any) => {
  //       roleTela = JSON.parse(JSON.stringify(responseRoleTela));

  //       if(roleTela.length == 0){
  //         this.notifier.showError('Usuário sem permissão para acessar o sistema!');
  //       }else{
  //         tela!.forEach((tela: Tela) => {
  //           roleTela!.forEach((roleTela: RoleTela) => {
  //             if (tela.id == roleTela.idTela) {
  //               this.notifier.showSuccess('Login efetuado com sucesso!');
  //               this.router.navigate([tela.identificador]);
  //             }
  //           });
  //         });
  //       }
  //     });
  // }
}
