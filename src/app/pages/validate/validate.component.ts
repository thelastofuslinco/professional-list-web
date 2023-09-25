import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css'],
})
export class ValidateComponent implements OnInit {
  id: string = '';
  user: User = {
    id: '',
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
    authenticated: false,
    skills: [],
    created_at: new Date(),
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.userService.getUserById(this.id).subscribe({
        next: (response) => (this.user = response),
        error: (error) => {
          console.error(error.error.message);
          alert(
            'Ocorreu um erro ao acessar conta de usuario. Tente novamente mais tarde.'
          );
        },
      });
    });
  }

  onSubmit() {
    const authenticated = this.user?.authenticated;

    this.userService.updateUser(this.id, { authenticated }).subscribe({
      next: (response) => {
        alert(`Registro do ${response.name} !`);
        this.router.navigate(['registros']);
      },
      error: (error) => {
        console.error('Erro ao registrar:', error.error.message);
        alert('Ocorreu um erro ao registrar. Tente novamente mais tarde.');
      },
    });
  }
}
