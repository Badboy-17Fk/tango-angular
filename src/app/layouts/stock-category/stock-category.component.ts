import { Component, OnInit } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { StockServiceService } from 'src/app/services/stock-service.service';
@Component({
  selector: 'app-stock-category',
  templateUrl: './stock-category.component.html'
})
export class StockCategoryComponent implements OnInit {



  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    fb:FormBuilder, private stockCategoryService:StockServiceService ) { }

  stockCat!: Array<any>;
  showSpinner: boolean = true;

  

  ngOnInit(): void {

    this.stockCategoryService.loadAllStockCategory().subscribe(stockCategory =>{
      console.log(stockCategory);
      this.stockCat = stockCategory;
      this.showSpinner = false;
    })


   
  }



onDeleteStockCategory(stockCat: any){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to delete this category?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      
      this.stockCategoryService.deleteStockCategory(stockCat);
    
    },
    reject: (type:any) => {
       
    }
});



}
  }



  


