import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { ActivatedRoute } from '@angular/router';
import { AuthConfig } from 'src/app/auth/data-access/auth.config';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-collections-container',
  templateUrl: './collections-container.component.html',
  styleUrls: ['./collections-container.component.scss'],
})
export class CollectionsContainerComponent implements OnChanges {
  @Output() ChonSP = new EventEmitter();
  @Output() arrChange = new EventEmitter();
  listSP: any;
  gioHang: any;
  sum: number = 0;
  token = '';
  user: any;
  cartNumber = 0;
  constructor(
    private service: DuLieuService,
    private m: DuLieuService,
    private g: DuLieuService,
    private y: DuLieuService,
    private t: DuLieuService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private _router: Router,

  ) {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  ngOnInit(): void {
    const token = JSON.parse(
      <string>localStorage.getItem(AuthConfig.JWT_TOKEN)
    );
    this.t.getUser(token).subscribe((data) => {
      if (data) {
        const tk: any = data;
        const user = tk[0];
        this.user = user;
      }
    });
    this.route.params.subscribe((red: any) => {
      // console.log(red);
      if (red.id) {
        // console.log(red);
      } else {
        this.m.getDanhSachSanPhamMenu().subscribe((data) => {
          if (data) {
            this.listSP = data;
            // console.log(data);
          }
        });
      }
    });
    this.getProductDetail();
    // this.cartNumberFunc();
  }
  getProductDetail(): void {
    this.route.params.subscribe((data: any) => {
      // console.log(data);
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          // console.log(`${data[key]}`)
          // Theo Mục
          this.service
            .getChiTiecMucLucSanPham(`${data[key]}`)
            .subscribe((data) => {
              if (data && data != '') {
                const mucLuc: any = data;
                this.listSP = data;
                console.log(mucLuc);
                mucLuc.forEach((a: any) => {
                  // console.log(a.id)
                  this.listSP = a.id;
                });
              }
            });
          // Theo loại sản phẩm
          this.service
            .getchitiecloaisanpham(`${data[key]}`)
            .subscribe((data) => {
              if (data && data != '') {
                // console.log(data);
                this.listSP = data;
              }
            });
        }
      }
    });
  }
  themCart(item: any): void {
    // console.log(item);
    if (item && this.user) {
      var idSP = item.id;
      this.ChonSP.emit(item);
      this.g.getGioHang().subscribe(
        (res: any) => {
          var gioHang = res.find((a: any) => {
            return a.idSanPham === idSP;
          });
          console.log(gioHang);
          if (gioHang) {
            var soLuong = gioHang.SoLuong;
            soLuong += 1;
            var idGH = gioHang.idGH;
            var idTK = this.user.idtk;
            var idsanpham = gioHang.idSanPham;
            if (idGH && soLuong && idsanpham && idTK) {
              gioHang = {
                idGH: idGH,
                SoLuong: soLuong,
                idSanPham: idsanpham,
                idtk: idTK,
              };
              this.g.getlistSuaGioHang(gioHang).subscribe(
                (data) => {
                  if (gioHang) {
                    console.log(gioHang);
                    this.g.getlistGioHang(this.user.idtk).subscribe((data) => {
                      console.log(data);
                      if (data) {
                        this.gioHang = data;
                        this.arrChange.emit(this.gioHang);
                      }
                    });
                    this.notification.success(
                      'Thông Báo',
                      'Sản phẩm đã tồn tại, cộng thêm số lượng'
                    );
                  }
                },
                (err) => {
                  this.notification.error('Thông Báo', 'Lỗi dữ liệu');
                }
              );
            }
          } else {
            gioHang = [
              { idGH, SoLuong: 1, idSanPham: idSP, idtk: this.user.idtk },
            ];
            console.log(gioHang);
            this.g.themGioHang(gioHang).subscribe((data) => {
              if (gioHang) {
                this.g.getlistGioHang(this.user.idtk).subscribe((data) => {
                  console.log(data);
                  if (data) {
                    this.gioHang = data;
                    console.log(this.gioHang);
                    this.arrChange.emit(this.gioHang);
                  }
                });
                this.notification.success('Thông Báo', 'Đã thêm vào giỏ hàng');
              }
            });
          }
        },
        (err) => {
          this.notification.error('Thông Báo', 'Lỗi dữ liệu');
        }
      );
    } else {
      this._router.navigate(['dang-nhap']);
      this.thongBao();
    }
  }

  likeSP(item: any): void {
    if (item && this.user) {
      var idSP = item.id;
      this.ChonSP.emit(item);
      this.y.getDachSachYeuThich().subscribe((res: any) => {
        var listYeuThich = res.find((a: any) => {
          return a.idSanPham == idSP;
        });
        console.log(listYeuThich);
        if (listYeuThich) {
          this.notification.success(
            'Thông Báo',
            'Sản phẩm yêu thích đã tồn tại'
          );
        } else {
          listYeuThich = [{ idSanPham: idSP, idtk: this.user.idtk }];
          this.y.themSanPhamYeuThich(listYeuThich).subscribe((data) => {
            if (listYeuThich) {
              console.log(listYeuThich);
              this.notification.success(
                'Thông Báo',
                'Đã thêm vào sản phẩm yêu thích'
              );
            }
          });
        }
      });
    } else {
      this._router.navigate(['dang-nhap']);
      this.thongBao();
    }
  }
  //Thông báo
  thongBao(): void {
    this.notification.warning(
     
      'Thông Báo',
      'Bạn cần đăng nhập'
    );
  }
}
