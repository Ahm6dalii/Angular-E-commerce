import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SettingComponent } from './components/setting/setting.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home' ,component: HomeComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    {
      path: 'setting'
      ,component: SettingComponent,
   
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },];
