import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService:     AuthService,
              private validateService: ValidateService,
              private router:          Router,
              private flashMessage:    FlashMessagesService){
  }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    // Check if all fields are filled in form.
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.show('Please fill in both fields',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Login successful' , {cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['/']);
      }
      else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    })
  }

}
