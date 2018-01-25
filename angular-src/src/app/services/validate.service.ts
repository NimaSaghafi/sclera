import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.username == undefined || user.email == undefined || user.password == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  validateUsername(username){
    const re = /^\w+$/;
    if(username.length < 1 || username.length > 15){
      return false;
    }
    return re.test(username);
  }

  validateEmail(email){
    const  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}
