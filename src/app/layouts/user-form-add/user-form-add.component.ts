import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-user-form-add',
  templateUrl: './user-form-add.component.html',
  styleUrls: ['./user-form-add.component.scss']
})
export class UserFormAddComponent implements OnInit {

  constructor(public authService: AuthenticationServiceService) { }

  ngOnInit(): void {
  }

}
