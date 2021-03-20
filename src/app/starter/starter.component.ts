import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StarterService } from '../shared/starter.service';
import { Starter } from '../shared/starter.model';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {

  constructor(public starterService: StarterService) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUsersList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.starterService.selectedUser = {
        _id: "",
        name: "",
        age: null
      }
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.starterService.postUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }else {
      this.starterService.putUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }
  }

  refreshUsersList() {
    this.starterService.getUserList().subscribe(res => {
      this.starterService.users = res as Starter[];
    });
  }

  onEdit(user: Starter) {
    this.starterService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete this record?') === true) {
      this.starterService.deleteUser(_id)
        .subscribe(res => {
          this.refreshUsersList();
          this.resetForm();
        });
    }
  }
}
