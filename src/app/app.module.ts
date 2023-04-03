
// angular-module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule} from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
// serveDB
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// toastr
import { ToastrModule } from 'ngx-toastr';
// swiper
import { SwiperModule } from 'swiper/angular';
// bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// angular compoent
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/web/home/navbar/navbar.component';
import { LoginComponent } from '../app/web/home/login/login.component';
import { ListProductsComponent } from './admin/product/list-products/list-products.component';
import { ListSanphamComponent } from './admin/product/list-sanpham/list-sanpham.component';
import { ThemSanphamComponent } from './admin/product/them-sanpham/them-sanpham.component';
import { SuaSanphamComponent } from './admin/product/sua-sanpham/sua-sanpham.component';
import { SingupComponent} from './web/home/singup/singup.component'
import { ContainerComponent } from './web/home/container/container.component';
import { CountyService} from '../app/web/home/shared/county.service';
import { FooterComponent } from './web/home/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { WebComponent } from './web/web.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent} from './web/home/home.component';
import { ProductComponent} from './admin/product/product.component'
import { CollectionsComponent } from './web/collections/collections.component';
import { CollectionsContainerComponent } from './web/collections/collections-container/collections-container.component';
import { SelectListProductsComponent } from './admin/product/list-products/select-list-products/select-list-products.component';
import { LienheComponent } from './web/home/navbar/lienhe/lienhe.component';
import { DieuKhoanSuDungComponent } from './web/home/pages/dieu-khoan-su-dung/dieu-khoan-su-dung.component';
import { ChinhSachBaoMatThongTinComponent } from './web/home/pages/chinh-sach-bao-mat-thong-tin/chinh-sach-bao-mat-thong-tin.component';
import { QuanlylienheComponent } from './admin/quanlylienhe/quanlylienhe.component';
import { CardComponent } from './web/home/cart/card.component';
import { NewsComponent } from './web/home/navbar/news/news.component';
import { QuangLyTinTucComponent } from './admin/quan-ly-tin-tuc/quang-ly-tin-tuc.component';
import { ThemTinTucComponent } from './admin/quan-ly-tin-tuc/them-tin-tuc/them-tin-tuc.component';
import { StoreManagerComponent } from './admin/store-manager/store-manager.component';
import { AsNumberPipe } from './as-number.pipe';
// angular-material
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
// angular-select
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// angular-Routes
import { RouterModule,Routes } from '@angular/router';
import { ExportDirective } from './admin/directives/export.directive';
// apexcharts
import { NgApexchartsModule } from "ng-apexcharts";
// pagination
import { NgxPaginationModule } from 'ngx-pagination';
// CKEditor
import { CKEditorModule } from 'ng2-ckeditor';
import { SuaTinTucComponent } from './admin/quan-ly-tin-tuc/sua-tin-tuc/sua-tin-tuc.component';
import { NewsChiTietComponent } from './web/home/navbar/news/news-chi-tiet/news-chi-tiet.component';
// Zorro-antd
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
// currency-mask
import { CurrencyMaskModule } from "ng2-currency-mask";
import { HcmTheGrandViewComponent } from './web/home/pages/hcm-the-grand-view/hcm-the-grand-view.component';
import { SanPhamYeuThichComponent } from './web/home/navbar/san-pham-yeu-thich/san-pham-yeu-thich.component';
import { ChiTietSanPhamComponent } from './web/collections/collections-container/chi-tiet-san-pham/chi-tiet-san-pham.component';
// Cloudinary
import {CloudinaryModule} from '@cloudinary/ng';
// Dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
// -------------------------------------------------------

registerLocaleData(en);
const routes: Routes = [
  {path:'login',component:WebComponent},
  {path:'singup',component:SingupComponent},
  {path:'dashboard',component:AdminComponent},
];

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SingupComponent,
    ListSanphamComponent,
    ThemSanphamComponent,
    SuaSanphamComponent,
    ListProductsComponent,
    ContainerComponent,
    FooterComponent,
    WebComponent,
    AdminComponent,
    HomeComponent,
    ProductComponent,
    CollectionsComponent,
    CollectionsContainerComponent,
    SelectListProductsComponent,
    LienheComponent,
    QuanlylienheComponent,
    ExportDirective,
    DieuKhoanSuDungComponent,
    ChinhSachBaoMatThongTinComponent,
    StoreManagerComponent,
    CardComponent,
    NewsComponent,
    QuangLyTinTucComponent,
    ThemTinTucComponent,
    SuaTinTucComponent,
    NewsChiTietComponent,
    HcmTheGrandViewComponent,
    SanPhamYeuThichComponent,
    ChiTietSanPhamComponent, 
    AsNumberPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,
    MatDialogModule,
    MatCardModule,
    SwiperModule,
    RouterModule.forRoot(routes),
    NgbModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgSelectModule,
    TextFieldModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    NgApexchartsModule,
    NgxPaginationModule,
    CKEditorModule,
    NzButtonModule,
    NzPaginationModule,
    NzBackTopModule,
    NzTableModule,
    NzInputModule,
    NzDropDownModule,
    NzUploadModule,
    NzIconModule,
    NzNotificationModule,
    ScrollingModule,
    DragDropModule,
    CurrencyMaskModule,
    NzSelectModule,
    NzSpinModule,
    NzMessageModule,
    NzFormModule,
    NzSkeletonModule,
    NzModalModule,
    NzBadgeModule,
    NzAvatarModule,
    NzSpaceModule,
    NzPopconfirmModule,
    NzBreadCrumbModule,
    NzInputNumberModule,
    MatExpansionModule,
    NzAffixModule,
    NzDrawerModule,
    CloudinaryModule,
    NgxDropzoneModule
  ],
 
  exports: [RouterModule],
  // providers: [CountyService],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: CountyService,
      multi   : true,
    },
    { provide: NZ_I18N, 
      useValue: en_US 
    },  
    { provide: NZ_ICONS,
      useValue: icons 
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
