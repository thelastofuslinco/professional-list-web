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
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getUser(user: User) {
    this.userService.getUserById(user.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([response.id, 'validar']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
