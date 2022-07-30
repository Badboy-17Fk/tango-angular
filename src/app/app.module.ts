import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Angular Fire authentication service



import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthenticationServiceService } from './services/authentication-service.service';

//Angular Fire authentication auth determine

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ShellComponent } from './blog/shell/shell.component';
import { SidebarComponent } from './blog/sidebar/sidebar.component';
import { DailyProductComponent } from './layouts/daily-product/daily-product.component';
import { CustomersComponent } from './layouts/customers/customers.component';
import { StockCategoryComponent } from './layouts/stock-category/stock-category.component';
import { LoginComponent } from './authentication/login/login.component';
import { AllUsersComponent } from './layouts/all-users/all-users.component';
import {HighchartsChartModule} from "highcharts-angular";
import { ToastrModule } from 'ngx-toastr';
//PRIME LAYOUTS
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StockCategoryListComponent } from './layouts/stock-category-list/stock-category-list.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { WeatherAdminComponent } from './layouts/weather-admin/weather-admin.component';
import { LoandAddComponent } from './layouts/loand-add/loand-add.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { UserFormAddComponent } from './layouts/user-form-add/user-form-add.component';
import { CustomersFormComponent } from './layouts/customers-form/customers-form.component';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {AccordionModule} from 'primeng/accordion';
import {FieldsetModule} from 'primeng/fieldset';
import {DropdownModule} from 'primeng/dropdown';
//PRIME LAYOUTS
import { TagModule } from 'primeng/tag';

import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { NotificationServiceService } from './services/notification-service.service';
//Firebase environment setup here
import { environment } from 'src/environments/environment';

import { ReactiveFormsModule } from '@angular/forms';
//Angular fireModule decleration 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './layouts/product-form/product-form.component';

import { initializeApp } from 'firebase/app';
import { ReportDetailsComponent } from './layouts/report-details/report-details.component';
import { OneLoansComponent } from './layouts/one-loans/one-loans.component';
import { LoansDetailsComponent } from './layouts/loans-details/loans-details.component';
initializeApp(environment.firebaseConfiguration);


const ANGULARFIRE = [
  FormsModule,
  HttpClientModule
]
const PRIMENG_MODULE = [
FieldsetModule,
TagModule,
DropdownModule,
CardModule,
MessageModule,
MessagesModule,
ToolbarModule,
ToastModule,
AccordionModule, 
ButtonModule,
TableModule,
ConfirmDialogModule,
InputTextModule,
InputNumberModule,
HighchartsChartModule,
CheckboxModule,
ProgressSpinnerModule,
ToastrModule.forRoot()



]
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    SidebarComponent,
    DailyProductComponent,
    CustomersComponent,
    StockCategoryComponent,
    LoginComponent,
    AllUsersComponent,
    StockCategoryListComponent,
    WeatherAdminComponent,
    LoandAddComponent,
    LoanListComponent,
    UserFormAddComponent,
    CustomersFormComponent,
    SpinnerComponent,
    ProductFormComponent,
    ReportDetailsComponent,
    OneLoansComponent,
    LoansDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    PRIMENG_MODULE,
    BrowserAnimationsModule,
    ANGULARFIRE,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,

    
  
    AngularFireModule.initializeApp(environment.firebaseConfiguration)
    
    
  ],
  providers: [ConfirmationService,MessageService,AuthenticationServiceService,NotificationServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
