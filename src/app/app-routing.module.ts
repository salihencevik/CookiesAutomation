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


const routes: Routes = [ 


  {path:"", component:NgTemplateComponent,
    children:[   
      {path:"", component:HomelayoutComponent,
      children:[
        {path:"",component:HomeComponent},
        {path:"Product",component:ProductComponent},
        {path:"Product/:productName",component:ProductComponent},
        {path:"About",component:AboutComponent},   
        {path:"Product/Detail/:id",component:ProductDetailComponent},    
      ]
    }],
  },   
  {path:"Admin",component:AdminlayoutComponent, 
  children:[  
    {path:"Product",component:AdminProductComponent},
    {path:"ProductUpdate/:id",component:ProductUpdateComponent},
    {path:"Customer",component:CustomerListAddComponent},
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
