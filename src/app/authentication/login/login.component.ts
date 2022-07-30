import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  logInspinner: boolean = false;

  constructor(public authService: AuthenticationServiceService) { }

  

  ngOnInit(): void {

   
  }




  

}
