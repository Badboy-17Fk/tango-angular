import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private afs: AngularFirestore,
    private messageService: MessageService,
    private route:Router) { }


   

    lookForValidation(prodauct: any, head: any, id:any){
      if(head == "Update product details"){
        this.updateProduct(id,prodauct)
      }else{
        this.createProduct(prodauct)
      }
    }


    createProduct(prodauct: any){

     

        this.afs.collection('productDetails_db').add(prodauct).then(proRef => {

          this.messageService.add({
            severity:'success', 
            summary:'Service Message', 
            detail:'Data Inserted successfully'});
            setTimeout(() => {this.route.navigateByUrl('/products') }, 2000)
           
          
        }, (error)=>{
  
          this.messageService.add({
            severity:'error',
            summary: 'Error',
            detail: 'Sorry we there was an error :-('
            });
        })

      
      
    }
    loadAllProduct(){
      return this.afs.collection('productDetails_db').snapshotChanges().pipe(
        map(actions => {
          return actions.map( a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
  
            return {id, data}
          })
        })
      )
    }

    loandOneProduct(prodId: string){
      return this.afs.collection('productDetails_db').doc(prodId).valueChanges()
    }

    deleteProduct(id: any){
      this.afs.collection('productDetails_db').doc(id).delete().then((delRef)=> {

        this.messageService.add({
          severity:'success', 
          summary:'Service Message', 
          detail:'Data Deleted successfully'});

      }, (error)=> {


        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Sorry we there was an error :-('
          });
      })
    }

    async updateProduct( id: any, productData: any){
      try {
        await this.afs.collection('productDetails_db').doc(id).update(productData);
        this.messageService.add({
          severity: 'success',
          summary: 'Service Message',
          detail: 'Product Updated successfully'
        });
        setTimeout(() => { this.route.navigateByUrl('/products'); }, 1000);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Message Content'
        });
        console.log(error);
      }
     }

    
     
    

}
