import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StockCategories } from 'src/app/models/stock-categories';
import { StockServiceService } from 'src/app/services/stock-service.service';

// import firebase from 'firebase/compat/app';
// import Timestamp = firebase.firestore.Timestamp;
@Component({
  selector: 'app-stock-category-list',
  templateUrl: './stock-category-list.component.html',
  styleUrls: ['./stock-category-list.component.scss']
})
export class StockCategoryListComponent implements OnInit {

  stock!:FormGroup;
  showSpinner: boolean = false;
  docId!: string;
  cat:any;
  header: string = 'Add Stock Categories';
  subHeader: string = 'Add Stock Categories';
  button: string ='Create';

 

  constructor(private fb: FormBuilder,
    private stockCategoryService:StockServiceService, private route: ActivatedRoute) { 

      this.route.queryParams.subscribe((val)=> {
        console.log(val);
        this.docId = val.id;



        if(this.docId){

          this.stockCategoryService.loadStockOne(val.id).subscribe((catData)=>{
            console.log(catData);
            this.cat = catData
            this.stock = this.fb.group({
              stockName: [this.cat.stockName, Validators.required],
              stockNumber:[this.cat.stockNumber, Validators.required],
              stockDescription: [this.cat.stockDescription, Validators.required],
              stockDate:[this.cat.stockDate]
            })

            this.header = 'Edit Stock Category';
            this.subHeader = 'Edit Stock Categories';
            this.button = 'Update';
            
          })



        }else{

          this.stock = this.fb.group({
            stockName: ['', Validators.required],
            stockNumber:['', Validators.required],
            stockDescription: ['', Validators.required],
            stockDate:[null]
          })

        }

      })
    

      

  }

  ngOnInit(): void {




  }

  onCreateStock(){


    const stockData: StockCategories = {

      stockName: this.stock.value.stockName,
      stockNumber: this.stock.value.stockNumber,
      stockDescription: this.stock.value.stockDescription,
      stockDate: this.stock.value.stockDate,
      createdAt:new Date()
    }

    console.log(stockData);
    this.stock.reset();

    this.stockCategoryService.createCategoryStock(stockData,this.header,this.docId);
    if(stockData){
      this.showSpinner = true;
    }

    

    

    


  }

}
