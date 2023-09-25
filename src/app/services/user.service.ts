import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private router: Router) {}
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

  getUsers({ orderBy }: { orderBy: string }): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { orderBy },
    });
  }
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  updateUser(id: string, body: Partial<User>): Observable<User> {
    return this.httpClient.put<User>(`${this.url}/user/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  createUser(body: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    skills: string[];
    authenticated: boolean;
  }): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/user`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${this.url}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
