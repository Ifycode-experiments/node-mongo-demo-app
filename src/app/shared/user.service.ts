import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;

  readonly baseURL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  postUser(newUser: User) {
    return this.httpClient.post(this.baseURL, newUser);
  }
}
