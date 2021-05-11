import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      accountName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      identity: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      avatar: new FormControl(''),
      checkbox: new FormControl(false, [Validators.requiredTrue])
    });
  }

  submit(){}

  con(){
    console.log(this.form);
  }

  changeImage(event){
    console.log(event);
  }
}
