import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/dto/user';
import { LoginService } from 'src/app/routes/login.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserService } from '../../../routes/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService
  ) {}

  user?: User;
  userForm!: FormGroup;
  jogadorForm!: FormGroup;
  isDisabled = true;
  tipoPagina = 'CMS';

  ngOnInit() {
    this.loginService.obterClaims().subscribe(
      (res) => {
        var data = JSON.parse(JSON.stringify(res));
        this.userService.getById(Number(data.id)).subscribe((res) => {
          var userResponse = JSON.parse(JSON.stringify(res));
          this.user = userResponse;

          this.user!.name = this.utilsService.formatterString(this.user!.name);

          this.user!.created = this.utilsService.formatarData(
            this.user!.created
          );

          this.user!.updated = this.utilsService.formatarData(
            this.user!.updated
          );

          this.createTable();
        });
      },
      (error) => {
        this.loginService.logout();
      }
    );
  }

  createTable() {
    this.userForm = this.formBuilder.group({
      name: [
        { value: this.user?.name, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        [Validators.required],
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
        [Validators.required],
      ],
      cep: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        [Validators.required],
      ],
      rua: [
        { value: this.user?.rua, disabled: this.isDisabled },
        [Validators.required],
      ],
      data_de_nascimento: [
        { value: this.user?.data_de_nascimento, disabled: this.isDisabled },
        [Validators.required],
      ],
      cidade: [
        { value: this.user?.cidade, disabled: this.isDisabled },
        [Validators.required],
      ],
      bairro: [
        { value: this.user?.bairro, disabled: this.isDisabled },
        [Validators.required],
      ],
      cpf: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        [Validators.required],
      ],
    });
  }

  findInfo(idRacha: number, idQuadra: number) {
    this.router.navigateByUrl(`quadra/racha/info/${idRacha}/${idQuadra}`);
  }

  editProfile() {
    this.router.navigateByUrl(`user/edit/${this.user?.id}`);
  }
}
