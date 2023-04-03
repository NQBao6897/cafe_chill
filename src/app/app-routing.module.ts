import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent} from './web/web.component'
import { AdminComponent} from './admin/admin.component';
import { ProductComponent} from './admin/product/product.component';
import { CollectionsComponent} from './web/collections/collections.component';
import { LienheComponent } from './web/home/navbar/lienhe/lienhe.component';
import { QuanlylienheComponent } from './admin/quanlylienhe/quanlylienhe.component';
import { ChinhSachBaoMatThongTinComponent} from './web/home/pages/chinh-sach-bao-mat-thong-tin/chinh-sach-bao-mat-thong-tin.component';
import { DieuKhoanSuDungComponent} from './web/home/pages/dieu-khoan-su-dung/dieu-khoan-su-dung.component';
import {StoreManagerComponent} from './/admin/store-manager/store-manager.component';
import {CardComponent} from './web/home/cart/card.component';
import {NewsComponent} from './web/home/navbar/news/news.component';
import {QuangLyTinTucComponent} from './admin/quan-ly-tin-tuc/quang-ly-tin-tuc.component'
import {SanPhamYeuThichComponent} from './web/home/navbar/san-pham-yeu-thich/san-pham-yeu-thich.component'
import {ChiTietSanPhamComponent} from './web/collections/collections-container/chi-tiet-san-pham/chi-tiet-san-pham.component'
import {NewsChiTietComponent} from './web/home/navbar/news/news-chi-tiet/news-chi-tiet.component'
import {HcmTheGrandViewComponent} from './web/home/pages/hcm-the-grand-view/hcm-the-grand-view.component'
import { LoginComponent } from './web/home/login/login.component';
import {SingupComponent} from './web/home/singup/singup.component';
const routes: Routes = [
  { path: '', redirectTo: 'Web-home', pathMatch: 'full' },
  { path:'Web-home',component:WebComponent},
  { path: 'collections', component:CollectionsComponent,},
  { path: 'collections/:id', component:CollectionsComponent,},
  { path: 'chi-tiet-san-pham/:id', component:ChiTietSanPhamComponent},
  { path: 'lienhe', component:LienheComponent},
  { path: 'ChinhSachBaoMatThongTin', component:ChinhSachBaoMatThongTinComponent},
  { path: 'DieuKhoanSuDung', component:DieuKhoanSuDungComponent},
  { path: 'cart', component:CardComponent},
  { path: 'news', component:NewsComponent},
  { path: 'NewsChiTiet/:id', component:NewsChiTietComponent},
  { path: 'HcmTheGrand', component:HcmTheGrandViewComponent},
  { path: 'san-pham-yeu-thich', component:SanPhamYeuThichComponent},
  { path: 'dang-ky', component:SingupComponent},
  { path: 'dang-nhap', component:LoginComponent},
  { path: 'manager', component:AdminComponent,
  children: [
    { path: '', redirectTo: 'Storemanager', pathMatch: 'full' },
    {path: 'admin-product', component:ProductComponent,},
    {path: 'quanlylienhe', component:QuanlylienheComponent,},
    {path: 'Storemanager',component:StoreManagerComponent,},
    {path: 'quanly-news',component:QuangLyTinTucComponent,},
  ]
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

