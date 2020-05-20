import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule, MatSidenav, MatSidenavModule} from '@angular/material'; 
import { AppComponent } from './app.component';
import { HomeComponent } from './Dashboard/Home/home.component';
import { NgTemplateComponent } from './Dashboard/ng-template/ng-template.component';
import { GridComponent } from './Dashboard/grid/grid.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomelayoutComponent } from './Layout/HomeLayout/homelayout.component';
import { AdminlayoutComponent } from './Layout/AdminLayout/adminlayout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LightBoxComponent } from './Dashboard/light-box/light-box.component';
import { ProductComponent } from './Dashboard/product/product.component';
import { CategoryComponent } from './Dashboard/category/category.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AboutComponent } from './Dashboard/about/about.component';
import { LoginComponent } from './Dashboard/login/login.component'; 
import { SidebarModule } from 'ng-sidebar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';  
import {MatTableModule,MatPaginatorModule, MatAutocomplete, MatAutocompleteModule} from '@angular/material'
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,LinkedinLoginProvider} from 'ng4-social-login';
import { NewCustomerComponent } from './Dashboard/new-customer/new-customer.component';
import { ProductDetailComponent } from './Dashboard/product-detail/product-detail.component';
import { CartComponent } from './Dashboard/cart/cart.component';
import { LoggedComponent } from './Dashboard/logged/logged.component';
import { AdminProductComponent } from './Dashboard/admin-product/product-list-add/admin-product.component';
import { ProductUpdateComponent } from './Dashboard/admin-product/product-update/product-update.component'; 
import { CustomerListAddComponent } from './Dashboard/admin-customer/customer-list-add/customer-list-add.component';
import { CustomerUpdateComponent } from './Dashboard/admin-customer/customer-update/customer-update.component';
import { AdminPanelLoginComponent } from './Dashboard/admin-panel-login/admin-panel-login.component';  

const config = new AuthServiceConfig([ 
  {
    id:FacebookLoginProvider.PROVIDER_ID,
    provider:new FacebookLoginProvider('196279738306517')
  }],false);

  export function provideConfig(){
    return config;
  }


@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    NgTemplateComponent,
    GridComponent, 
    HomelayoutComponent,
    AdminlayoutComponent,
    LightBoxComponent,
    ProductComponent,
    LoggedComponent,
    CategoryComponent,
    LoginComponent,
    AboutComponent,
    LoginComponent,
    NewCustomerComponent,
    ProductDetailComponent,
    CartComponent,
    LoggedComponent, 
    AdminProductComponent, ProductUpdateComponent, CustomerListAddComponent, CustomerUpdateComponent, AdminPanelLoginComponent,  
  ],
  imports: [ 
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SocialLoginModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    SidebarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatSliderModule,
    NgxNumberSpinnerModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule, 
    NgxPaginationModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide:AuthServiceConfig,useFactory:provideConfig}],
  bootstrap: [AppComponent]
})  
export class AppModule { }
