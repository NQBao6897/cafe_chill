import {
  Component,
  OnChanges,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CountyService } from '../shared/county.service';
import { country } from '../shared/country';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { AuthConfig } from '../../.././auth/data-access/auth.config';
import { JwtUtil } from '../../.././auth/services/jwt';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  tap,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { DuLieuService } from 'src/app/data/du-lieu.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() gioHang: any;
  // Login
  token = '';
  setLogin: any;
  setUser: any;
  taikhoan: any;
  setPhanQuyen:boolean | undefined;
  //
  menu: any;
  sum: number = 0;
  //   gioHang: any;
  sanphamgiohang: any;
  modalsNumber = 0;
  loading: boolean = false;
  countries$!: Observable<country[]>;
  private searchTerms = new Subject<string>();
  // Menu mobie
  visible = false;
  placement: NzDrawerPlacement = 'left';
  constructor(
    private modalService: NgbModal,
    private countryService: CountyService,
    private t: DuLieuService,
    private g: DuLieuService,
    private y: DuLieuService,
    private service: DuLieuService,
    private route: ActivatedRoute,
    private _router: Router,
    private notification: NzNotificationService,
    public toastr: ToastrService
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }
  LogOut() {
    JwtUtil.setUserToken(null);
  }
  search(term: string) {
    this.searchTerms.next(term);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.sum = 0;
    const token = JSON.parse(
      <string>localStorage.getItem(AuthConfig.JWT_TOKEN)
    );
    if (token) {
      this.t.getUser(token).subscribe((data) => {
        if (data) {
          const tk: any = data;
          const user = tk[0];
          // console.log(user)
          this.g.getlistGioHang(user.idtk).subscribe((data) => {
            if (data) {
              // console.log(data);
              this.gioHang = data;
              this.gioHang.forEach((a: any) => {
                this.sum = this.sum + a.SoLuong;
              });
              // this.sum=this.gioHang.length;
            }
          });
        }
      });
    }
  }
  ngOnInit(): void {
    // this.getProductDetail()
    //   this.service.loadCart();
    const token = JSON.parse(
      <string>localStorage.getItem(AuthConfig.JWT_TOKEN)
    );
    this.token = token;
    if (token) {
      this.setUser = true;
      // console.log(token);
      this.t.getUser(token).subscribe((data) => {
        if (data) {
          this.taikhoan = data;
          // console.log(this.taikhoan);
          const phanquyen = this.taikhoan[0]
            this.setPhanQuyen = !!phanquyen.isQuanLy;
        }
      });
    } else {
      this.setLogin = true;
    }
    this.xemlistGioHang();
    this.searchLive();
    this.xemMucLucSanPham();
    this.xemDanhSachSanPhamMenu();
  }
  xemlistGioHang() {
    this.sum = 0;
    if (this.token) {
      this.t.getUser(this.token).subscribe((data) => {
        if (data) {
          this.taikhoan = data;
          const user = this.taikhoan[0];
          // console.log(user.idtk)
          this.g.getlistGioHang(user.idtk).subscribe((data) => {
            if (data) {
              this.gioHang = data;

              // this.gioHang.forEach((a: any) => {

              // this.sum = this.sum + a.SoLuong;
              // });
              // this.sum=this.gioHang.length;
            }
          });
        }
      });
    }
  }
  xemMucLucSanPham() {
    this.y.getMucLucSanPham().subscribe((data) => {
      if (data) {
        // console.log(data);
        this.menu = data;
      }
    });
  }
  xemDanhSachSanPhamMenu() {
    this.service.getDanhSachSanPhamMenu().subscribe((data) => {
      this.productItemFunc();
    });
  }
  searchLive() {
    this.countries$ = this.searchTerms.pipe(
      tap((_) => (this.loading = true)),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.countryService.searchCountry(term)),
      tap((_) => (this.loading = false))
    );
  }
  // getProductDetail(){
  // 	// this.loginComponent.logindata(this.taikhoan).pipe
  // 	this.route.params.subscribe((data:any)=>{
  // 		console.log(data);
  // 	  this.service.getliststk(data.id).subscribe(data =>{
  // 		this.taikhoan=data;
  // 		console.log(this.taikhoan);
  // 	  })
  // 	})
  //   }
  // lay(){
  // 	console.log(this.sanphamgiohang);
  // }
  resetForm(term: any) {
    var search = term.value;
    console.log(search);
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  //   Menu Mobie
  openMenu() {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }
  productItemFunc() {
    this.sanphamgiohang = this.getProductItemFromLocal();
  }
  getProductItemFromLocal(): any {
    const data = localStorage.getItem('cart-item');
    if (!data) return;
    return JSON.parse(data);
  }
  // Vao giỏ hàng
  checkInCart() {
    if (this.taikhoan) {
      this._router.navigate(['cart']);
    } else {
      this._router.navigate(['dang-nhap']);
      this.thongBao();
    }
  }
  thongBao(): void {
    this.notification.warning('Thông Báo', 'Bạn cần đăng nhập');
  }
}
