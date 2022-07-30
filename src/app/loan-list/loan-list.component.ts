import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoanServiceService } from '../services/loan-service.service';
import { LoansModel } from '../models/loans-model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
loanForm!: FormGroup;
showSpinner: boolean = false;
docId!: string;
loan!:any;
theHead: string = 'Add Loans';
subHead: string = 'You can add or edit loans here';
onChangeButton: string = 'Create'; 



  constructor(private fb: FormBuilder, private loanService:LoanServiceService,
     private route:ActivatedRoute) {
      this.route.queryParams.subscribe(val =>{
        console.log(val);
        this.docId = val.id


        if(this.docId){
          this.loanService.loadOneLoans(val.id).subscribe(loanData => {
            console.log(loanData);
            this.loan = loanData;


            this.loanForm = this.fb.group({
              borrowerName: [this.loan.borrowerName, Validators.required],
              priceBorrow: [this.loan.priceBorrow, Validators.required],
              quantityBorrow: [this.loan.quantityBorrow,Validators.required],
              dateBorrow:[this.loan.dateBorrow],
              refundDate:[this.loan.refundDate],
              contact:[this.loan.contact, Validators.required],
         
           });

           this.theHead = 'Edit Loans'
           this.subHead = 'you can edit and update loans here';
           this.onChangeButton = "Update";

          })
        }else{

        this.loanForm = this.fb.group({
        borrowerName: ['', Validators.required],
        priceBorrow: ['', Validators.required],
        quantityBorrow: ['',Validators.required],
        dateBorrow:[null],
        refundDate:[null],
        contact:['', Validators.required],
   
     });


        }
      })

      }

  ngOnInit(): void {



  
  }
  get fc(){
    return this.loanForm.controls;
  }

  onSubmitForm(){

    const loanData: LoansModel = {
      borrowerName: this.loanForm.value.borrowerName,
      priceBorrow: this.loanForm.value.priceBorrow,
      quantityBorrow: this.loanForm.value.quantityBorrow,
      dateBorrow: this.loanForm.value.dateBorrow,
      refundDate: this.loanForm.value.refundDate,
      contact: this.loanForm.value.contact,
      status: '2',
      createdAt: new Date(),
      
    }

    // console.log(loanData);
    this.loanForm.reset();
    this.loanService.createLoan(loanData,this.theHead,this.docId);
    if(loanData){
      this.showSpinner = true
    }


    
  }

}
