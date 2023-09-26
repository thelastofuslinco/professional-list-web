import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  users: User[] = [];
  filter: {
    orderBy: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
  } = { orderBy: 'asc', name: '', cpf: '', email: '', phone: '' };

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getUsers();
  }

  getUser(user: User) {
    this.userService.getUserById(user.id).subscribe({
      next: (response) => {
        this.router.navigate([response.id, 'validar']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getUsers() {
    this.userService.getUsers(this.filter).subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  onKey(event: any) {
    const { name } = event.target;

    this.filter.name = name.value;
    this.getUsers();
  }
  setOrderBy() {
    this.filter.orderBy = this.filter.orderBy === 'asc' ? 'desc' : 'asc';
    this.getUsers();
  }
}
