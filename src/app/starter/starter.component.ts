import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StarterService } from '../shared/starter.service';
import { Starter } from '../shared/starter.model';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  constructor(public userService: StarterService) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUsersList();
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
    if (form.value._id === '') {
      this.userService.postUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }else {
      this.userService.putUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }
  }

  refreshUsersList() {
    this.userService.getUserList().subscribe(res => {
      this.userService.users = res as Starter[];
    });
  }

  onEdit(user: Starter) {
    this.userService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete this record?') === true) {
      this.userService.deleteUser(_id)
        .subscribe(res => {
          this.refreshUsersList();
          this.resetForm();
        });
    }
  }
}
