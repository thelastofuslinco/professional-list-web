import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, public router: Router) {}
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/auth/login`, {
      email,
      password,
    });
  }

  getUsers({
    orderBy,
    name,
    cpf,
    email,
    phone,
  }: {
    orderBy: string;
    name: string;
    cpf: string;
    email: string;
    phone: string;
  }): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/user`, {
      params: { orderBy, name, cpf, email, phone },
    });
  }
  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/user/${name}`);
  }
  updateUser(name: string, body: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/user/${name}`, body);
  }
  createUser(body: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    skills: string[];
    authenticated: boolean;
  }): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/user`, body);
  }
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/user/${id}`);
  }
  get loggedOn() {
    return localStorage.getItem('token') !== null;
  }
}
