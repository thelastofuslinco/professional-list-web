import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css'],
})
export class ValidateComponent implements OnInit {
  id: string = '';
  formValidate: FormGroup = this.formBuilder.group({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.userService.getUserById(this.id).subscribe({
        next: (response) => this.buildForm(response),
        error: (error) => {
          console.error(error.error.message);
          alert(
            'Ocorreu um erro ao acessar conta de usuario. Tente novamente mais tarde.'
          );
        },
      });
    });
  }

  buildForm(user: User) {
    this.formValidate = this.formBuilder.group({
      name: [user.name, [Validators.required, Validators.maxLength(100)]],
      email: [
        user.email,
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      cpf: [
        user.cpf,
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
        ],
      ],
      skills: [user.skills.join(','), [Validators.required]],
      phone: [user.phone],
      authenticated: [!!user.authenticated],
    });
  }
  onSubmit() {
    if (this.formValidate?.invalid) {
      alert('Por favor preencha todos os campos corretamente.');
      return;
    }
    const formData = this.formValidate?.getRawValue();

    formData.skills = formData.skills.split(',');
    formData.authenticated = formData.authenticated ? new Date() : 'false';
    this.userService.updateUser(this.id, formData).subscribe({
      next: (response) => {
        alert(`Registro do ${response.name} !`);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error.error.message);
        alert('Ocorreu um erro ao registrar. Tente novamente mais tarde.');
      },
    });
  }
}
