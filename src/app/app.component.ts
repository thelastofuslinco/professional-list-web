import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedOn: boolean = false;
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit() {
    this.loggedOn = this.userService.loggedOn;
  }

  logout() {
    localStorage.clear();
    this.loggedOn = false;
    this.router.navigate(['login']);
  }
}
