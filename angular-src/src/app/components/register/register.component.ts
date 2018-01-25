import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { validateConfig } from '@angular/router/src/config';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:     String;
  username:  String;
  password:  String;
  password2: String;

  constructor(private validateService: ValidateService, 
              private flashMessage:    FlashMessagesService,
              private authService:     AuthService,
              private router:          Router){ 
  }

  ngOnInit(){
  }

  onRegisterSubmit(){
    const user = {
      email:    this.email,
      username: this.username,
      password: this.password
    }

    // Check if all fields are filled in form.
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Check for valid username. Must be letters/numbers/underscore with length between 1 and 15.
    if (!this.validateService.validateUsername(user.username)) {
      this.flashMessage.show('Username may only contain letters, numbers, and _ characters and must be less than 16 characters in length.',{cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

    // Check if username already exists.
    if(this.authService.getUser(user).subscribe(found => { return found; })){
        this.flashMessage.show('Username already exists',{cssClass: 'alert-danger', timeout: 3000});
        return false;
    }

    // Check if provided passwords match.
    if(!(this.password === this.password2)){
      this.flashMessage.show('Passwords do not match',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Check email validity
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Invalid email address entered',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register new user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('New user successfully registered',{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/']);
      }
      else{
        this.flashMessage.show('Unable to register new user',{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}