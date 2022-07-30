import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { LoanServiceService } from 'src/app/services/loan-service.service';
import { LoansModel } from 'src/app/models/loans-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {LOANS_STATUS} from 'src/app/models/status.constant'
@Component({
  selector: 'app-loand-add',
  templateUrl: './loand-add.component.html',
  styleUrls: ['./loand-add.component.scss']
})
export class LoandAddComponent implements OnInit {

  // selectedValue: string[] = ['Val1','Val2'];
  value!: false
  isChecked!: false
  spinnerLoad: boolean = true;

  changeStatus = LOANS_STATUS;
 

  loansCollector!: Array<any>
  constructor( private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private loansService:LoanServiceService,private route : ActivatedRoute, private afs:AngularFirestore, private router: Router) {

      
  


     }


  ngOnInit(): void {


    

    this.loansService.loadAllLoands().subscribe((val) =>{
      // console.log(val)
      this.spinnerLoad = false;
      this.loansCollector = val;
      // console.log(val);
      
    });
  
  }

  onEvent(e: any){
  console.log(e);
  }


onDeleteLonas(loansId: any){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete this loan?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      
      this.loansService.deleteLoans(loansId);
    
    },
    reject: (type:any) => {
       
    }
});



}


showOneDetail(id: any){
this.router.navigateByUrl(`one-loans/${id}`)
}

}
