import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomersServiceService {

  constructor(private afs: AngularFirestore,
     private messageService: MessageService,
     private route:Router) { }

//Create Customers details

validateAll(customer: any, header: any, id: any){

   

  if(header == 'Edit Customers'){
    this.updateCustomers(id, customer)
  }else{
    this.createCustomer(customer)
  }
 

}

createCustomer(customer: any){

  

    this.afs.collection('customers_db').add(customer).then(cusRef => {
  
      this.messageService.add({severity:'success', summary:'Service Message', detail:'Customer Inserted Successfuly'});
      setTimeout(() => {this.route.navigateByUrl('/customers') }, 2000)
    }, (error => {
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faild to Insert Customer'});
    }))
    

  



  
}

//LoadCustomer Details
loandCustomers(){
  return this.afs.collection('customers_db').snapshotChanges().pipe(
    map(actions =>{
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return {id, data}
      })
    })
  )
}

deleteCustomers(id: any){
  this.afs.collection('customers_db').doc(id).delete().then(docRef =>{

    this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail:'Data Deleted successfully'});
      console.log("Data Deleted");
  },
  (error)=>{

    this.messageService.add({
      severity:'error',
      summary: 'Error',
      detail: 'Message Content'
      });
      console.log(error);

  })

}

loadOneCustomer(id: any){
  return this.afs.collection('customers_db').doc(id).valueChanges()
}

updateCustomers( id: any, customerData: any){
 return this.afs.collection('customers_db').doc(id).update(customerData).then(()=> {

    
    this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail:'Data Updated successfully'});
      setTimeout(() => {this.route.navigateByUrl('/customers') }, 1000)
  }).catch((error)=>{

    this.messageService.add({
      severity:'error',
      summary: 'Error',
      detail: 'Message Content'
      });
      console.log(error);


  })
}
}
