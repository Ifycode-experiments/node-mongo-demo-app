import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DemoService } from '../shared/demo.service';
import { Demo } from '../shared/demo.model';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

  constructor(public demoService: DemoService) {

  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshUsersList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
      this.demoService.selectedUser = {
        _id: "",
        name: "",
        age: null
      }
  }

  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.demoService.postUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }else {
      this.demoService.putUser(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }
  }

  refreshUsersList() {
    this.demoService.getUserList().subscribe(res => {
      this.demoService.users = res['items'];
    });
  }

  onEdit(user: Demo) {
    this.demoService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete this record?') === true) {
      this.demoService.deleteUser(_id)
        .subscribe(res => {
          this.refreshUsersList();
          this.resetForm();
        });
    }
  }
}
