import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private afs: AngularFirestore, private messageService: MessageService, private route: Router) { }



  //create new category form all products form

  createCategoryStock(categoryStock: any, id: any, header: any){
    if( header == 'Edit Stock Category'){

      this.updateStockCategory(id,categoryStock)
    }else{

      this.afs.collection('categoryStock_db').add(categoryStock).then((catStock)=> {
        //stockMessage service here
        
        this.messageService.add({
          severity:'success', 
          summary:'Success :-)', 
          detail:'Data Inserted successfully'});
          setTimeout(() => {this.route.navigateByUrl('/stock-category') }, 2000)
          console.log("Data Deleted");
  
      }).catch((error)=>{
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Sorry we there was an error :-('
          });
          console.log(error);
      })

    }


  }


  loadAllStockCategory(){
    return this.afs.collection('categoryStock_db').snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    )
  }

  deleteStockCategory(id:any){
    this.afs.collection('categoryStock_db').doc(id).delete().then(docRef => {


      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Data Deleted successfully'});
        console.log("Data Deleted");
    }, (error)=> {

      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Message Content'
        });
    })
  }


  loadStockOne(id:any){
    return this.afs.collection('categoryStock_db').doc(id).valueChanges()
  }

  updateStockCategory(stockData: any, id: any){

    return this.afs.collection('categoryStock_db').doc(id)
    .update(stockData).then((docRef)=> {

      this.messageService.add({
        severity:'success', 
        summary:'Service Message', 
        detail:'Data Updated successfully'});
    }).catch((error)=> {

      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Message Content'
        });
        console.log(error);
    })
  }
}
