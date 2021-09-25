import { Injectable } from '@angular/core';
import { Demo } from './starter.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  selectedUser: Demo;
  users: Demo[];

  readonly baseURL = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) { }

  postUser(newUser: Demo) {
    return this.httpClient.post(this.baseURL, newUser);
  }

  getUserList() {
    return this.httpClient.get(this.baseURL);
  }

  putUser(user: Demo) {
    return this.httpClient.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.httpClient.delete(this.baseURL + `/${_id}`);
  }
}
