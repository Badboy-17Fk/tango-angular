import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ShellComponent } from './blog/shell/shell.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllUsersComponent } from './layouts/all-users/all-users.component';
import { CustomersFormComponent } from './layouts/customers-form/customers-form.component';
import { CustomersComponent } from './layouts/customers/customers.component';
import { DailyProductComponent } from './layouts/daily-product/daily-product.component';
import { LoandAddComponent } from './layouts/loand-add/loand-add.component';
import { LoansDetailsComponent } from './layouts/loans-details/loans-details.component';
import { OneLoansComponent } from './layouts/one-loans/one-loans.component';
import { ProductFormComponent } from './layouts/product-form/product-form.component';
import { ReportDetailsComponent } from './layouts/report-details/report-details.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { StockCategoryListComponent } from './layouts/stock-category-list/stock-category-list.component';
import { StockCategoryComponent } from './layouts/stock-category/stock-category.component';
import { UserFormAddComponent } from './layouts/user-form-add/user-form-add.component';
import { LoanListComponent } from './loan-list/loan-list.component';

import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path:'', 
  component:ShellComponent, children : [
    {
      path:'dashboard', component: HomePageComponent
    },{
      path: 'products', component: ProductListComponent
    },
    {
      path: 'users', component: AllUsersComponent
    },
    {
      path: 'stock-category', component: StockCategoryComponent
    },
    {
      path:'daily-manage', component: DailyProductComponent
    },
    {
      path:'customers', component: CustomersComponent
    },
    {
      path:'stock-category-list', component:StockCategoryListComponent
    },{
      path:'add-loans', component: LoandAddComponent
    },
    {
      path:'loan-list-form',component:LoanListComponent
    },
    {
      path:'user-list-lable', component: UserFormAddComponent
    },{
      path:'customers-form-add', component: CustomersFormComponent
    },
    {
      path:'spinner-load', component: SpinnerComponent
    },
    {
      path:'product-form', component: ProductFormComponent
    },
    {
      path:'view-report-details', component: ReportDetailsComponent
    },
    {
      path:'one-loans/:id', component: OneLoansComponent
    },
    {
      path:'loans-details', component: LoansDetailsComponent
    }
  ]},
  {path:'login', component:LoginComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
