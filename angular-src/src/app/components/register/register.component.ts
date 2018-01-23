import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:    String;
  username: String;
  password: String;



  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      email:    this.email,
      username: this.username,
      password: this.password
    }

    // Check if fields are filled in form
    if(!this.validateService.validateRegister(user)){
      console.log('all fields not filled in');
      return false;
    }

    // Check email validity
    if(!this.validateService.validateEmail(user.email)){
      console.log('invalid email provided');
      return false;
    }
  }
}
