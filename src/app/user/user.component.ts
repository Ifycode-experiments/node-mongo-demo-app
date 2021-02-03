import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.resetForm();
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

}
