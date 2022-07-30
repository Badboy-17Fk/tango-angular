import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanServiceService } from 'src/app/services/loan-service.service';

const  LOANS_STATUS  ={
  0:{
    label:'Pendding',
    color: 'primary'
    
  },
  1: {
    label:'Paid',
    color: 'success'
  },
  2: {
    label: 'Faild',
    color: 'danger'
  },
  3: {
    label: 'Shipped',
    color: 'warning'
  }
} as any


@Component({
  selector: 'app-one-loans',
  templateUrl: './one-loans.component.html',
  styleUrls: ['./one-loans.component.scss']
})
export class OneLoansComponent implements OnInit {



  loansStatus = [] as any
  docId!: string;
  loans!: any
  selectedCity: any
  

  constructor(private route: ActivatedRoute, private loanService: LoanServiceService) {


   }

  ngOnInit(): void {

    this._getLoans();
    this._mapAllLoans()
  }

  private _mapAllLoans(){

    this.loansStatus = Object.keys(LOANS_STATUS).map((key) => {
      return {
        id:key ,
        name: LOANS_STATUS[key].label
      }
    })
    console.log(this.loansStatus)
    // console.log(Object.keys(LOANS_STATUS));
    // console.log(LOANS_STATUS[1])

  }



  public _getLoans(){
    this.route.params.subscribe(params => {
      if(params.id){
        
        this.loanService.loadOneLoans(params.id).subscribe(oneLoans => {
         this.loans = oneLoans as any;
        //  console.log(params.id)
        })
      }
    })

   

  }

  onStatusChanged(event: any){

    this.route.params.subscribe(newParams => {
      if(newParams.id){
        this.loanService.updateOneStatus(newParams.id,event.value)
        // console.log(event.value)
      }
    })
   
    
  }

  

}
