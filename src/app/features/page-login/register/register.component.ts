import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService
  ) {}

  user!: User;
  registerForm!: FormGroup;
  @ViewChild('inputCep') inputCep!: ElementRef;

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      rua: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      role: [1, Validators.required],
    });
  }

  register() {
    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('passwordConfirm')?.value
    ) {
      this.notifier.showError('As senhas não coincidem!');
    } else {
      if (this.registerForm.valid) {
        let userDTO = {
          name: this.registerForm.get('name')?.value,
          cpf: this.registerForm.get('cpf')?.value,
          email: this.registerForm.get('email')?.value,
          telefone: this.registerForm.get('telefone')?.value,
          cep: this.registerForm.get('cep')?.value,
          rua: this.registerForm.get('rua')?.value,
          cidade: this.registerForm.get('cidade')?.value,
          bairro: this.registerForm.get('bairro')?.value,
          password: this.registerForm.get('password')?.value,
          role: this.registerForm.get('role')?.value,
        };

        let userInput = new UserInput(userDTO);

        this.userService.create(userInput).subscribe(
          (data) => {
            this.notifier.showSuccess('Usuário cadastrado com sucesso!');

            localStorage.setItem('email', userDTO.email);

            this.router.navigateByUrl('/cms/login');
          },
          (error) => {
            this.notifier.showError(error.error);
          }
        );
      } else {
        this.utilsService.getFormValidationErrors(this.registerForm);
      }
    }
  }

}
