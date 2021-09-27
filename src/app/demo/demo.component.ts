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
    let table = document.querySelector('table');
    let emptyDiv = document.querySelector('.empty-div');
    let connected = () => {
      table.classList.add('display-none');
      emptyDiv.innerHTML = 'Not connected to database';
      emptyDiv.classList.remove('display-none');
    }
    let acceptable = () => {
      if (form.value._id === '' || form.value._id === null) {
        this.demoService.postUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.refreshUsersList();
        },
        err => {
          console.log(err.message);
          connected();
        });
      }else {
        this.demoService.putUser(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.refreshUsersList();
        },
        err => {
          console.log(err.message);
          connected();
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
    let table = document.querySelector('table');
    let emptyDiv = document.querySelector('.empty-div');
    let connected = (msg: string) => {
      table.classList.add('display-none');
      emptyDiv.innerHTML = msg;
      emptyDiv.classList.remove('display-none');
    }
    this.demoService.getUserList().subscribe(res => {
      if (res['count'] >= 1) {
        table.classList.remove('display-none');
        emptyDiv.classList.add('display-none');
      } else {
        connected('Database is empty - add data');
      }
      this.demoService.users = res['items'];
    },
    err => {
      console.log(err.message);
      connected('Not connected to database');
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
