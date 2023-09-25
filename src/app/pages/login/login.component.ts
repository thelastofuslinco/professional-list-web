import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    this.userService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.accessToken);
          this.router.navigate(['/registros']);
        },
        error: (error) => {
          console.error('Erro ao fazer login:', error.error.message);
          alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
        },
      });
  }
}
