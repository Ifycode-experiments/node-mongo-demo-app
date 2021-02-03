import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.getUsers();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.userService.selectedUser = {
        _id: "",
        name: "",
        address: "",
        email: "",
        phone: null
      }
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
      });
  }

  getUsers() {
    this.userService.getUserList().subscribe(res => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = user;
  }

}
