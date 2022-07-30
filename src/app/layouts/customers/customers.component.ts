import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customerListData!: Array<any>;
  showSpinner: boolean = true;

  constructor(private confirmationService:ConfirmationService,
    private messageService:MessageService, private customerService: CustomersServiceService) { }

  ngOnInit(): void {

    this.customerService.loandCustomers().subscribe((customersVal)=>{
      console.log(customersVal);
      this.customerListData = customersVal;
      this.showSpinner = false;
    });

    

  }

 

  onDeleteCustomers(customerId: any){

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Customer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.customerService.deleteCustomers(customerId);
      
      },
      reject: (type:any) => {
         
      }
  });

}
}
