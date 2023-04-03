import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DuLieuService } from 'src/app/data/du-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthConfig } from '../../.././auth/data-access/auth.config';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Output() ChonSP = new EventEmitter();
  voucher: FormGroup | any;
  listgiohang: any;
  gioHang: any;
  maGiamGia: any = 0;
  tongGia: any = 0;
  tongTien: number = 0;
  thanhGia: any = 0;
  soLuongSP: number = 0;
  token = '';
  user: any;
  constructor(
    public toastr: ToastrService,
    private y: DuLieuService,
    private g: DuLieuService,
    private t: DuLieuService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}
  // number input
  congsp(sp: any) {
    // console.log(this.tongGia)
    this.ChonSP.emit(sp);
    var soLuongSP: number = 1;
    var sl = sp.SoLuong + soLuongSP;
    if (sl) {
      sp = { idGH: sp.idGH, SoLuong: sl };
      this.soLuong(sp);
    }
  }
  trusp(sp: any) {
    this.ChonSP.emit(sp);
    var soLuongSP: number = -1;
    var sl = sp.SoLuong + soLuongSP;
    if (sp.SoLuong != 0 && sp.SoLuong != null) {
      sp = { idGH: sp.idGH, SoLuong: sl };
      this.soLuong(sp);
    }
    // if(sl <= 0) {
    //   this.modal.confirm({
    //     nzTitle: 'Bạn có muốn thật sự xóa?',
    //     nzContent: '<b style="color: red;">Sản phẩm ra khỏi giỏ hàng ?</b>',
    //     nzOkText: 'Có',
    //     nzOkType: 'primary',
    //     nzOkDanger: true,
    //     nzOnOk: () => {
    //       if(sp) {
    //         this.g.getlistXoaGioHang(sp.idGH).subscribe(data =>{
    //           if (sp.idGH){
    //             this.notification.success('Thông Báo', 'Xóa thành công')
    //             this.g.getlistGioHang().subscribe((data) => {
    //               if (data) {
    //                 this.listgiohang = data;
    //                 this.gioHang = data;
    //               }
    //             });

    //           }
    //         })
    //         console.log(sp)
    //         this.tongGia -= (sp.idSanPham.gia -(sp.idSanPham.gia * sp.idSanPham.giamgia) / 100) *sp.SoLuong;
    //         if (this.maGiamGia){
    //           if(this.tongGia < this.maGiamGia){
    //             this.tongGia -= (sp.idSanPham.gia -(sp.idSanPham.gia * sp.idSanPham.giamgia) / 100) *sp.SoLuong;
    //             if (this.maGiamGia){
    //               if(this.tongGia < this.maGiamGia){
    //                 this.tongTien = 0 + this.maGiamGia
    //               }else {

    //                 this.tongTien = this.tongGia ;
    //               }
    //             }else{

    //               this.tongTien = this.tongGia - this.maGiamGia;
    //             }         this.tongTien = 0 + this.maGiamGia
    //           }else {

    //             this.tongTien = this.tongGia ;
    //           }
    //         }else{

    //           this.tongTien = this.tongGia - this.maGiamGia;
    //         }
    //       }
    //     }
    //     ,
    //     nzCancelText: 'Không',
    //     nzOnCancel: () => console.log('Cancel')
    //   });
    // }
  }
  ngOnInit(): void {
    this.voucher = new FormGroup({
      maVoucher: new FormControl(),
    });
    this.xemgiohang();
  }
  xemgiohang(): void {
    const token = JSON.parse(
      <string>localStorage.getItem(AuthConfig.JWT_TOKEN)
    );
    this.t.getUser(token).subscribe((data) => {
      if (data) {
        const tk: any = data;
        const user = tk[0];
        this.user = user;
        this.g.getlistGioHang(user.idtk).subscribe((data) => {
          if (data) {
            // console.log(data)
            this.listgiohang = data;
            this.tongGia = 0;
            this.tongTien = 0;
            this.listgiohang.forEach((res: any) => {
              if (res.idSanPham) {
                this.tongGia +=
                  (res.idSanPham.gia -
                    (res.idSanPham.gia * res.idSanPham.giamgia) / 100) *
                  res.SoLuong;
              }
            });
            this.tongTien += this.tongGia - this.maGiamGia;
          }
        });
        // console.log(this.tongGia);
      }
    });
  }
  xoaGH(sp: any) {
    this.g.getlistXoaGioHang(sp.idGH).subscribe(
      (data) => {
        if (sp.idSanPham) {
          this.notification.success('Thông Báo', 'Xóa thành công');
          this.tongGia -=
            (sp.idSanPham.gia -
              (sp.idSanPham.gia * sp.idSanPham.giamgia) / 100) *
            sp.SoLuong;
          if (this.maGiamGia) {
            if (this.tongGia < this.maGiamGia) {
              this.tongTien = 0 + this.maGiamGia;
            } else {
              this.tongTien = this.tongGia;
            }
          } else {
            this.tongTien = this.tongGia - this.maGiamGia;
          }
          this.g.getlistGioHang( this.user.idtk).subscribe((data) => {
            if (data) {
              this.listgiohang = data;
              this.gioHang = data;
            }
          });
        } else {
          this.notification.warning('Thông Báo', 'Xóa thất bại', {});
        }
      },
      (err) => {
        this.notification.error('Thông Báo', 'Lỗi dữ liệu');
      }
    );
    // console.log('tong gia', this.tongGia);
    // console.log('tong tien', this.tongTien);
  }
  suasp(item: any): void {
    console.log(item);
  }
  likeSP(item: any): void {
    var idSP = item.idSanPham.id;
    this.ChonSP.emit(item);
    this.y.getDachSachYeuThich().subscribe(
      (res: any) => {
        var listYeuThich = res.find((a: any) => {
          return a.idSanPham == idSP;
        });
        // console.log(listYeuThich);
        if (listYeuThich) {
          this.notification.success(
            'Thông Báo',
            'Sản phẩm yêu thích đã tồn tại'
          );
        } else {
          listYeuThich = [{ idSanPham: idSP,idtk:this.user.idtk }];
          this.y.themSanPhamYeuThich(listYeuThich).subscribe(
            (data) => {
              if (listYeuThich) {
                // console.log(listYeuThich);
                this.notification.success(
                  'Thông Báo',
                  'Đã thêm vào sản phẩm yêu thích'
                );
              } else {
                this.notification.warning('Thông Báo', 'Thêm thất bại');
              }
            },
            (err) => {
              this.notification.error('Thông Báo', 'Lỗi dữ liệu');
            }
          );
        }
      },
      (err) => {
        this.notification.error('Thông Báo', 'Lỗi dữ liệu');
      }
    );
  }
  soLuong(sp: any): void {
    var sl = sp.SoLuong;
    if (sl != null && sl != 0 && sl != -sl) {
      sp = { idGH: sp.idGH, SoLuong: sl };
      this.g.getlistSuaGioHang(sp).subscribe(
        (data) => {
          if (sp) {
            this.g.getlistGioHang(this.user.idtk).subscribe((data) => {
              if (data) {
                // console.log(data)
                this.listgiohang = data;
                this.tongGia = 0;
                this.tongTien = 0;
                this.listgiohang.forEach((res: any) => {
                  if (res.idSanPham) {
                    this.tongGia +=
                      (res.idSanPham.gia -
                        (res.idSanPham.gia * res.idSanPham.giamgia) / 100) *
                      res.SoLuong;
                  }
                });

                if (this.maGiamGia) {
                  if (this.tongGia > this.maGiamGia) {
                    this.tongTien = this.tongGia;
                  } else {
                    this.tongTien = 0 + this.maGiamGia;
                  }
                } else {
                  this.tongTien = this.tongGia - this.maGiamGia;
                }
                // console.log('tong gia', this.tongGia);
                // console.log('tong tien', this.tongTien);
              }
            });
            // console.log(sp);
            this.g.getlistGioHang(this.user.idtk).subscribe((data) => {
              if (data) {
                this.gioHang = data;
              }
            });
          } else {
            this.notification.warning(
              'Thông Báo',
              'Thêm số lượnng thất bại',
              {}
            );
          }
        },
        (err) => {
          this.notification.error('Thông Báo', 'Lỗi dữ liệu');
        }
      );
    }
  }
  voucherdata(voucher: any): void {
    // console.log(this.voucher.value)
    this.g.getVoucher().subscribe((res: any) => {
      const xuatVoucher = res.find((a: any) => {
        return a.maVoucher === this.voucher.value.maVoucher;
      });
      // console.log(xuatVoucher);
      if (xuatVoucher) {
        this.maGiamGia = xuatVoucher.giamGia;
        // console.log(xuatVoucher.giamGia)

        if (this.tongTien < this.maGiamGia) {
          this.tongTien = this.maGiamGia;
        }
        // this.tongTien +=  - (this.maGiamGia)
      } else {
        this.maGiamGia = 0;
      }
    });
  }
}
