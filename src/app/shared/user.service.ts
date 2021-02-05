import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];

  readonly baseURL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  postUser(newUser: User) {
    return this.httpClient.post(this.baseURL, newUser);
  }

  getUserList() {
    return this.httpClient.get(this.baseURL);
  }

  putUser(user: User) {
    return this.httpClient.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.httpClient.delete(this.baseURL + `/${_id}`);
  }
}
