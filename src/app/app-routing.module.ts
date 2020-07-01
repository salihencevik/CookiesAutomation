import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgTemplateComponent } from './Dashboard/ng-template/ng-template.component';
import { HomeComponent } from './Dashboard/Home/home.component'; 
import { AdminlayoutComponent } from './Layout/AdminLayout/adminlayout.component';
import { HomelayoutComponent } from './Layout/HomeLayout/homelayout.component';
import { ProductComponent } from './Dashboard/product/product.component';
import { AboutComponent } from './Dashboard/about/about.component'; 
import { ProductDetailComponent } from './Dashboard/product-detail/product-detail.component'; 
import { AdminProductComponent } from './Dashboard/admin-product/product-list-add/admin-product.component';
import { ProductUpdateComponent } from './Dashboard/admin-product/product-update/product-update.component';
import { CustomerListAddComponent } from './Dashboard/admin-customer/customer-list-add/customer-list-add.component';
import { CustomerUpdateComponent } from './Dashboard/admin-customer/customer-update/customer-update.component';
import { AdminPanelLoginComponent } from './Dashboard/admin-panel-login/admin-panel-login.component';
import { AuthGuard } from './Service/auth/auth.guard';
import { LoginComponent } from './Dashboard/login/login.component';
import { UserProfileComponent } from './Dashboard/user-profile/user-profile.component';
import { PaymentComponent } from './Dashboard/payment/payment.component';
import { SaledProductComponent } from './Dashboard/saled-product/saled-product.component';
import { AdminCategoryComponent } from './Dashboard/admin-category/admin-category.component';
import { AdminCategoryUpdateComponent } from './Dashboard/admin-category-update/admin-category-update.component';


const routes: Routes = [ 


  {path:"", component:NgTemplateComponent,
    children:[   
      {path:"", component:HomelayoutComponent,
      children:[
        {path:"",component:HomeComponent},
        {path:"Product",component:ProductComponent},
        {path:"Product/:productName",component:ProductComponent},
        {path:"About",component:AboutComponent},   
        {path:"User/Saled/:id",component:SaledProductComponent},   
        {path:"Product/Detail/:id",component:ProductDetailComponent},  
        {path:"User/Profile/:id",component:UserProfileComponent},    
        {path:"Payment",component:PaymentComponent},      
      ]
    }],
  },   
  {path:"Admin",component:AdminlayoutComponent, 
  children:[  
    {path:"Product",component:AdminProductComponent},
    {path:"ProductUpdate/:id",component:ProductUpdateComponent},
    {path:"Customer",component:CustomerListAddComponent},
    {path:"Category",component:AdminCategoryComponent},
    {path:"CategoryUpdate/:id",component:AdminCategoryUpdateComponent},
    {path:"CustomerEmail/:id",component:CustomerUpdateComponent},
    
  ]}, 
  {path:"UserLogin",component:AdminPanelLoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  
}
