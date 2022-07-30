import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { StockServiceService } from 'src/app/services/stock-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categoryStock!:Array<any>
  showSpinner: boolean = false;
  docId!: string;
  prod: any;
  head: string = 'Add Products details';
  sub_head: string ='You can add or edit products here';
  button: string = 'Create';

  products!: FormGroup

  constructor(private fb: FormBuilder,private categoryStockService:StockServiceService,
    private productServiceData: ProductServiceService, private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(val => {
        this.docId = val.id

        if(this.docId){
          this.productServiceData.loandOneProduct(val.id).subscribe((data)=> {

            this.prod = data
            this.products = this.fb.group({
              productName: [this.prod.productName, Validators.required],
              productBrand: [this.prod.productBrand, Validators.required],
              productDateEntry: [this.prod.productDateEntry, Validators.required],
              productOwner: [this.prod.productOwner, Validators.required],
              productDescription: [this.prod.productDescription, Validators.required],
              productPrice:[this.prod.productPrice, Validators.required],
              //
              productStockname: [`${this.prod.productStockname.stockCategoryId}-${this.prod.productStockname.stockCategoryname}`, Validators.required],
              productStockCatNumber: [`${this.prod.productStockCatNumber.stockCateId}-${this.prod.productStockCatNumber.stockCarNumber}`, Validators.required],
              
        
            })
            this.head = 'Update product details';
            this.sub_head ='you can update and edit product details';
            this.button = 'Update';
          })
        }else{

          this.products = this.fb.group({
            productName: ['', Validators.required],
            productBrand: ['', Validators.required],
            productDateEntry: ['', Validators.required],
            productOwner: ['', Validators.required],
            productDescription: ['', Validators.required],
            productPrice:['', Validators.required],
            //
            productStockname: ['', Validators.required],
            productStockCatNumber: ['', Validators.required],
            
      
          })
        }
      })


    }

  ngOnInit(): void {

    

    this.categoryStockService.loadAllStockCategory().subscribe(val => {
      this.categoryStock = val;
      console.log(val);
    })

    


  }

  onSubmitProductDetails(){

    const splited = this.products.value.productStockname.split('-')
    const nextSplited = this.products.value.productStockCatNumber.split('-')
    console.log(splited);

    const productAdd: ProductModel = {
      productName: this.products.value.productName,
      productBrand: this.products.value.productBrand,
      productDateEntry: this.products.value.productDateEntry,
      productOwner: this.products.value.productOwner,
      productDescription: this.products.value.productDescription,
      productPrice: this.products.value.productPrice,

      productStockname: {
        stockCategoryId: splited[0],
        stockCategoryname: splited[1]
      },

      productStockCatNumber: {
        stockCateId: nextSplited[0],
        stockCarNumber: nextSplited[1]
      },

      createdAt: new Date()




    }
    this.productServiceData.lookForValidation(productAdd,this.head, this.docId);
    this.products.reset();

    console.log(productAdd)
    if(productAdd){
      this.showSpinner = true
    }

  }

}
