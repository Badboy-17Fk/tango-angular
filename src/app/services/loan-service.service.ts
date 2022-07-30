import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { from, map, Observable } from 'rxjs';
import { LoansModel } from '../models/loans-model';

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {

  constructor( private afs:AngularFirestore, 
    private route: Router,
    private messageService: MessageService) { }

 
  createLoan(newLoan: any, theHead: any,id:any){


    if(theHead =='Edit Loans'){
      this.updateAllLoans(id,newLoan);
    }else{

      this.afs.collection('all-loans').add(newLoan).then( docRef =>{
        
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Data Inserted successfully'});
        setTimeout(() => {this.route.navigateByUrl('/add-loans') }, 1000)
     }).catch((error)=> {
      this.messageService.
      add({severity:'error', summary: 'Error'
      , detail: 'Message Content'})
      console.log(error);
     })

    }

   
     

   
   


  }

  loadAllLoands(){
    return this.afs.collection('all-loans').snapshotChanges().pipe(
      map(actions =>{
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
  }

  deleteLoans(id: any){
    this.afs.collection('all-loans').doc(id).delete().then(docRef=>{
      
      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Data Deleted successfully'});
        console.log("Data Deleted");
    }).catch(error=> {
      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Message Content'
        });
        console.log(error);
    })

  }

  loadOneLoans(id: any){
    return this.afs.collection('all-loans').doc(id).valueChanges();
  }

  updateAllLoans(id: any, loanData: any){
   return this.afs.collection('all-loans').doc(id).update(loanData).then(()=> {

      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Data Updated successfully'});
        setTimeout(() => {this.route.navigateByUrl('/add-loans') }, 1000)
      

    }).catch(error => {

      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Message Content'
        });
        console.log(error);
    })
  }

  
 

    updateOneStatus(statusId: string, $status: Partial<LoansModel>):Observable<any> {
     
     return from(this.afs.doc(`all-loans/${statusId}`).update({status: $status}).then(ref=>{
      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Status Updated successfully'});
     }).catch((error)=> {
      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Message Content'
        });
        console.log(error);
     }))
    }
  





 

 

}
