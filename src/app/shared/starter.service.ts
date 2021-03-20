import { Injectable } from '@angular/core';
import { Starter } from './starter.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StarterService {
  selectedUser: Starter;
  users: Starter[];

  readonly baseURL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  postUser(newUser: Starter) {
    return this.httpClient.post(this.baseURL, newUser);
  }

  getUserList() {
    return this.httpClient.get(this.baseURL);
  }

  putUser(user: Starter) {
    return this.httpClient.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.httpClient.delete(this.baseURL + `/${_id}`);
  }
}
