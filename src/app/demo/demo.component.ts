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
    let acceptable = () => {
      if (form.value._id === '' || form.value._id === null) {
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
        //restore reset after edit
        let reset = document.querySelector('#reset');
        reset.removeAttribute('disabled');
        reset.classList.remove('transparent-border');
      }
    }

    if (form.value.age <= 0) console.log('Please supply only age greater than 0');
      else acceptable();
  }

  refreshUsersList() {
    this.demoService.getUserList().subscribe(res => {
      this.demoService.users = res['items'];
    });
  }

  onEdit(user: Demo) {
    this.demoService.selectedUser = user;
    //prevent reset from clearing data in table
    let reset = document.querySelector('#reset');
    reset.setAttribute('disabled', '');
    reset.classList.add('transparent-border');
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
