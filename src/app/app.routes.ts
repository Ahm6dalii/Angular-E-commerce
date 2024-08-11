import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SettingComponent } from './components/setting/setting.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CardsComponent } from './components/cards/cards.component';
import { WishComponent } from './components/wish/wish.component';
import { authGuard } from './gaurd/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

export const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home' ,component: HomeComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'about', component:AboutComponent },
    { path: 'contact', component:ContactUsComponent }, 
    { path: 'product/:id',canActivate:[authGuard], component: ProductDetailsComponent },
    {path: 'setting',canActivate:[authGuard] ,component: SettingComponent, children:[
        { path: '', redirectTo: 'user-info', pathMatch: 'full' },
        {path: 'user-info', component:UserInfoComponent},
        {path: 'user-data', component:UserDataComponent},
        {path: 'password', component:ChangePasswordComponent},
    ]},
    {path: 'card-list',canActivate:[authGuard],component: CardsComponent },
    {path: 'wish-list',canActivate:[authGuard],component: WishComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },];
