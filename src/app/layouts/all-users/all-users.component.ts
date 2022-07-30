import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

import { NotificationServiceService } from 'src/app/services/notification-service.service';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  userArray!: Array<any>
  notify: any
  testUsers!: Array<any>

  spinner: boolean = true;
  
  constructor(private confirmationService: ConfirmationService, 
    private messageService: MessageService, private notification:NotificationServiceService,private autheUsers: AuthenticationServiceService) {

      
     }

  ngOnInit(): void {

   
    this.autheUsers.loadUsers().subscribe(myUsers => {
      console.log(myUsers)
      this.spinner = false;
      this.testUsers = myUsers;
    })
    


  }

  onHandleTag(){
    
  }

  deleteUsers(){
    //Users delete here
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
      },
      reject: (type:any) => {
         
      }
  });
  }

}
