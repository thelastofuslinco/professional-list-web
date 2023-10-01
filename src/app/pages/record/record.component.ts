import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
})
export class RecordComponent {
  formRecord: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(100)],
    ],
    cpf: [
      '',
      [Validators.required, Validators.maxLength(11), Validators.minLength(11)],
    ],
    skills: ['', [Validators.required]],
    phone: [''],
    authenticated: [false],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit() {
    if (this.formRecord?.invalid) {
      alert('Por favor preencha todos os campos corretamente.');
      return;
    }
    const formData = this.formRecord?.getRawValue();
    formData.skills = formData.skills.split(',');

    this.userService.createUser(formData).subscribe({
      next: (response) => {
        alert(`Registro do ${response.name} enviado!`);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error.error.message);
        alert('Ocorreu um erro ao registrar. Tente novamente mais tarde.');
      },
    });
  }
}
