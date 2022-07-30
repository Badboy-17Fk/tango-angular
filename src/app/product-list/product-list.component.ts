import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  productArray!: Array<any>
  showSpinner: boolean = true;

  constructor(private productServiceDate: ProductServiceService, private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.productServiceDate.loadAllProduct().subscribe((val)=>{
      this.showSpinner = false
     this.productArray = val;
    
     console.log(val);

    })


  

    
  }

  onDeleteProduct(deletId: any){

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.productServiceDate.deleteProduct(deletId)
      
      },
      reject: (type:any) => {
         
      }
  });

    

   

  }

  

}
