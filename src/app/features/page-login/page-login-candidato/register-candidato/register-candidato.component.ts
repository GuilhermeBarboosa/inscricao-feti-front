import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register-candidato',
  templateUrl: './register-candidato.component.html',
  styleUrls: ['./register-candidato.component.css'],
})
export class RegisterCandidatoComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  user!: User;
  registerForm!: FormGroup;
  role = 2; //CANDIDATO

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [
        'Guilherme Barbosa Rocha',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        'guilherme.strg@gmail.com',
        [Validators.required, Validators.email],
      ],
      telefone: ['(34) 98403-9344', [Validators.required]],
      cep: ['38035-205', [Validators.required]],
      rua: ['Rua Arnaldo Augusto dos Reis', [Validators.required]],
      data_de_nascimento: ['29/11/2000', [Validators.required]],
      cidade: ['Uberaba', [Validators.required]],
      bairro: ['Jardim', [Validators.required]],
      password: ['1234', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['1234', [Validators.required, Validators.minLength(3)]],
      cpf: ['019.756.946-85', [Validators.required]],
      role: [this.role, Validators.required],
      valid: [false],
    });
  }

  register() {
    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('passwordConfirm')?.value
    ) {
      this.notifier.showError('As senhas não coincidem!');
    } else {
      if(!this.registerForm.get("valid")?.value){
        this.notifier.showError("Você precisa aceitar os termos de uso")
      }else{
        this.getFormValidationErrors();
        if (this.registerForm.valid) {
          let userDTO = {
            name: this.registerForm.get('name')?.value,
            cpf: this.registerForm.get('cpf')?.value,
            email: this.registerForm.get('email')?.value,
            telefone: this.registerForm.get('telefone')?.value,
            data_de_nascimento: this.utilsService.formatarDataToSQL(
              this.registerForm.get('data_de_nascimento')?.value
            ),
            cep: this.registerForm.get('cep')?.value,
            rua: this.registerForm.get('rua')?.value,
            cidade: this.registerForm.get('cidade')?.value,
            bairro: this.registerForm.get('bairro')?.value,
            password: this.registerForm.get('password')?.value,
            role: this.registerForm.get('role')?.value,
          };

          let userInput = new UserInput(userDTO);
          this.userService.createCandidato(userInput).subscribe(
            (data) => {
              this.notifier.showSuccess('Usuário cadastrado com sucesso!');

              localStorage.setItem('email', userDTO.email);

              this.router.navigateByUrl('/login-candidato/login');
            },
            (error) => {
              this.notifier.showError(error.error);
            }
          );
        } else {
          this.utilsService.getFormValidationErrors(this.registerForm)
        }
      }

    }
  }

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      if (control) {
        const controlErrors: ValidationErrors | null = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              'Key control: ' +
                key +
                ', keyError: ' +
                keyError +
                ', err value: ',
              controlErrors[keyError]
            );
          });
        }
      }
    });
  }
}
