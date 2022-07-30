import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomersModel } from 'src/app/models/customers-model';
import { CustomersServiceService } from 'src/app/services/customers-service.service';
@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss']
})
export class CustomersFormComponent implements OnInit {

  mycustomer!: FormGroup;
  doicId!: string; 
  customer!: any;
  header: string = "Add customers";
  subHeader: string = "You can add or edit customers here";
  submitButton: string = "Create";




  constructor(private fb:FormBuilder, private customerService: CustomersServiceService, private route:ActivatedRoute) {

    this.route.queryParams.subscribe(val =>{
      console.log(val);
      this.doicId = val.id


      if(this.doicId){

        this.customerService.loadOneCustomer(val.id).subscribe(customerData => {
          console.log(customerData);
          this.customer = customerData;


          this.mycustomer = this.fb.group({
            customerName: [this.customer.customerName,Validators.required],
            customerEmail: [this.customer.customerEmail, Validators.required],
            customerNumber: [this.customer.customerNumber,Validators.required],
            customerAddress: [this.customer.customerAddress,Validators.required]
          })

          this.header = "Edit Customers";
          this.subHeader = "You can edit and update customers here"
          this.submitButton = "Update"



        })

      }else{

      this.mycustomer = this.fb.group({
      customerName: ['',Validators.required],
      customerEmail: ['', Validators.required],
      customerNumber: ['',Validators.required],
      customerAddress: ['',Validators.required]
    })

      }
    })
   }

  ngOnInit(): void {

  

  }

  onSubmitCustomer(){

    const customer: CustomersModel = {
      customerName: this.mycustomer.value.customerName,
      customerEmail: this.mycustomer.value.customerEmail,
      customerNumber: this.mycustomer.value.customerNumber,
      customerAddress: this.mycustomer.value.customerAddress,
      customerDate: new Date(),
    }

    // this.customerService.createCustomer(customer,this.header,this.doicId)
    this.customerService.validateAll(customer, this.header,this.doicId)
    console.log(customer);

    this.mycustomer.reset();
    //customer Service



    // const newCustomer = this.form.value;
    // console.log(newCustomer);
  }

}
